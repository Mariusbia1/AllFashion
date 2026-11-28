<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Services\ReferenceService;
use App\Services\WhatsAppService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'client_name' => 'required|string|max:255',
            'client_phone' => 'required|string|max:50',
            'location_type' => 'required|in:atelier,domicile',
            'address' => 'nullable|string',
            'garment_type' => 'nullable|string|max:255',
            'preferred_date' => 'nullable|string|max:50',
            'time_slot' => 'nullable|string|max:50',
            'notes' => 'nullable|string',
        ]);

        $reference = ReferenceService::generate('RDV');

        $appointment = Appointment::create([
            'reference' => $reference,
            'client_name' => $validated['client_name'],
            'client_phone' => $validated['client_phone'],
            'location_type' => $validated['location_type'],
            'address' => $validated['address'] ?? null,
            'garment_type' => $validated['garment_type'] ?? null,
            'preferred_date' => $validated['preferred_date'] ?? null,
            'time_slot' => $validated['time_slot'] ?? null,
            'notes' => $validated['notes'] ?? null,
            'status' => 'en_attente',
        ]);

        $whatsappUrl = WhatsAppService::buildAppointmentUrl(
            $reference,
            $appointment->client_name,
            $appointment->client_phone,
            $appointment->location_type,
            $appointment->address,
            $appointment->garment_type,
            $appointment->preferred_date,
            $appointment->notes
        );

        return response()->json([
            'success' => true,
            'reference' => $reference,
            'whatsapp_url' => $whatsappUrl,
            'appointment' => $appointment,
        ], 201);
    }
}
