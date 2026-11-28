<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\FlockingRequest;
use App\Models\Order;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminController extends Controller
{
    public function stats(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'stats' => [
                'total_revenue' => (int) Order::where('status', '!=', 'annulee')->sum('total_amount'),
                'orders_count' => Order::count(),
                'pending_orders' => Order::where('status', 'en_attente')->count(),
                'appointments_count' => Appointment::count(),
                'pending_appointments' => Appointment::where('status', 'en_attente')->count(),
                'products_count' => Product::count(),
                'flocking_count' => FlockingRequest::count(),
            ]
        ]);
    }

    public function orders(): JsonResponse
    {
        $orders = Order::with('items')->orderBy('id', 'desc')->get();
        return response()->json(['success' => true, 'data' => $orders]);
    }

    public function updateOrderStatus(Request $request, int $id): JsonResponse
    {
        $order = Order::findOrFail($id);
        $order->update(['status' => $request->input('status', 'confirmee')]);
        return response()->json(['success' => true, 'data' => $order]);
    }

    public function appointments(): JsonResponse
    {
        $appointments = Appointment::orderBy('id', 'desc')->get();
        return response()->json(['success' => true, 'data' => $appointments]);
    }

    public function updateAppointmentStatus(Request $request, int $id): JsonResponse
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->update(['status' => $request->input('status', 'confirme')]);
        return response()->json(['success' => true, 'data' => $appointment]);
    }

    public function products(): JsonResponse
    {
        $products = Product::with('category')->orderBy('id', 'desc')->get();
        return response()->json(['success' => true, 'data' => $products]);
    }

    public function storeProduct(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'category_id' => 'nullable|exists:categories,id',
            'badge' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'main_image' => 'required|string',
            'sizes' => 'nullable|array',
            'stock' => 'nullable|integer',
        ]);

        $slug = Str::slug($validated['name']) . '-' . time();

        $product = Product::create([
            'name' => $validated['name'],
            'slug' => $slug,
            'price' => (int) $validated['price'],
            'category_id' => $validated['category_id'] ?? null,
            'badge' => $validated['badge'] ?? null,
            'description' => $validated['description'] ?? null,
            'main_image' => $validated['main_image'],
            'sizes' => $validated['sizes'] ?? ['S', 'M', 'L', 'XL'],
            'stock' => (int) ($validated['stock'] ?? 10),
            'is_active' => true,
        ]);

        return response()->json(['success' => true, 'data' => $product], 201);
    }

    public function updateProduct(Request $request, int $id): JsonResponse
    {
        $product = Product::findOrFail($id);
        $product->update($request->only(['price', 'stock', 'is_active', 'badge', 'description', 'name']));
        return response()->json(['success' => true, 'data' => $product]);
    }

    public function deleteProduct(int $id): JsonResponse
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(['success' => true, 'message' => 'Produit supprimé']);
    }
}
