<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\FlockingRequest;
use App\Services\ReferenceService;
use App\Services\WhatsAppService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FlockingController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'client_name' => 'required|string|max:255',
            'client_phone' => 'required|string|max:50',
            'garment_type' => 'nullable|string|max:150',
            'position' => 'nullable|string|max:150',
            'quantity' => 'nullable|integer|min:1',
            'instructions' => 'nullable|string',
        ]);

        $reference = ReferenceService::generate('FLOC');

        $artworkPath = null;
        if ($request->hasFile('artwork')) {
            $artworkPath = $request->file('artwork')->store('flocking', 'public');
        }

        $flocking = FlockingRequest::create([
            'reference' => $reference,
            'client_name' => $validated['client_name'],
            'client_phone' => $validated['client_phone'],
            'garment_type' => $validated['garment_type'] ?? 'T-shirt / Vêtement',
            'position' => $validated['position'] ?? 'Poitrine / Dos',
            'quantity' => (int) ($validated['quantity'] ?? 1),
            'artwork_path' => $artworkPath,
            'instructions' => $validated['instructions'] ?? null,
            'status' => 'nouvelle',
        ]);

        $whatsappUrl = WhatsAppService::buildFlockingUrl(
            $reference,
            $flocking->client_name,
            $flocking->client_phone,
            $flocking->garment_type,
            $flocking->quantity,
            $flocking->instructions
        );

        return response()->json([
            'success' => true,
            'reference' => $reference,
            'artwork_url' => $artworkPath ? asset('storage/' . $artworkPath) : null,
            'whatsapp_url' => $whatsappUrl,
            'request' => $flocking,
        ], 201);
    }
}
