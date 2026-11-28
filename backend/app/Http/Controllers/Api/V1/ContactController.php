<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Services\WhatsAppService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:50',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $contact = ContactMessage::create([
            'name' => $validated['name'],
            'phone' => $validated['phone'] ?? '',
            'subject' => $validated['subject'],
            'message' => $validated['message'],
        ]);

        $number = WhatsAppService::getStylistNumber();
        $msg = "*MESSAGE DE CONTACT — ALLFASHION*\n";
        $msg .= "De : {$contact->name}\n";
        if ($contact->phone) $msg .= "Téléphone : {$contact->phone}\n";
        $msg .= "Objet : {$contact->subject}\n";
        $msg .= "-----------------------------------\n";
        $msg .= "Message : {$contact->message}";

        $whatsappUrl = "https://wa.me/{$number}?text=" . rawurlencode($msg);

        return response()->json([
            'success' => true,
            'whatsapp_url' => $whatsappUrl,
            'message' => $contact,
        ], 201);
    }
}
