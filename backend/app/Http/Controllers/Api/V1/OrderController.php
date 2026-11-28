<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Services\ReferenceService;
use App\Services\WhatsAppService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_phone' => 'required|string|max:50',
            'customer_address' => 'required|string',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'nullable|exists:products,id',
            'items.*.name' => 'nullable|string',
            'items.*.size' => 'required|string|max:50',
            'items.*.unit_price' => 'nullable|numeric',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        return DB::transaction(function () use ($validated) {
            $reference = ReferenceService::generate('CMD');
            $totalAmount = 0;
            $itemsData = [];

            foreach ($validated['items'] as $item) {
                $product = !empty($item['product_id']) ? Product::find($item['product_id']) : null;
                $price = $product ? $product->price : (int) ($item['unit_price'] ?? 0);
                $name = $product ? $product->name : ($item['name'] ?? 'Article');
                $qty = (int) $item['quantity'];

                $lineTotal = $price * $qty;
                $totalAmount += $lineTotal;

                $itemsData[] = [
                    'product_id' => $product?->id,
                    'product_name' => $name,
                    'size' => $item['size'],
                    'unit_price' => $price,
                    'quantity' => $qty,
                ];
            }

            $order = Order::create([
                'reference' => $reference,
                'customer_name' => $validated['customer_name'],
                'customer_phone' => $validated['customer_phone'],
                'customer_address' => $validated['customer_address'],
                'notes' => $validated['notes'] ?? null,
                'total_amount' => $totalAmount,
                'status' => 'en_attente',
            ]);

            foreach ($itemsData as $item) {
                $order->items()->create($item);
            }

            $whatsappUrl = WhatsAppService::buildOrderUrl(
                $reference,
                $order->customer_name,
                $order->customer_phone,
                $order->customer_address,
                $totalAmount,
                $itemsData,
                $order->notes
            );

            return response()->json([
                'success' => true,
                'reference' => $reference,
                'total_amount' => $totalAmount,
                'whatsapp_url' => $whatsappUrl,
                'order' => $order->load('items'),
            ], 201);
        });
    }
}
