<?php

namespace App\Services;

use App\Models\Setting;

class WhatsAppService
{
    /**
     * Récupère le numéro WhatsApp du styliste
     */
    public static function getStylistNumber(): string
    {
        $clean = Setting::get('whatsapp_number', '22997000000');
        return preg_replace('/[^0-9]/', '', $clean);
    }

    /**
     * Génère l'URL WhatsApp avec message encodé pour une commande
     */
    public static function buildOrderUrl(string $reference, string $customerName, string $customerPhone, string $customerAddress, int $totalAmount, array $items, ?string $notes = null): string
    {
        $number = static::getStylistNumber();

        $msg = "*NOUVELLE COMMANDE — ALLFASHION*\n";
        $msg .= "Référence : {$reference}\n";
        $msg .= "-----------------------------------\n";
        $msg .= "Client : {$customerName}\n";
        $msg .= "Téléphone : {$customerPhone}\n";
        $msg .= "Livraison / Retrait : {$customerAddress}\n";
        if (!empty($notes)) {
            $msg .= "Remarques : " . trim($notes) . "\n";
        }
        $msg .= "-----------------------------------\n";
        $msg .= "ARTICLES COMMANDÉS :\n";
        foreach ($items as $item) {
            $qty = $item['quantity'] ?? 1;
            $name = $item['name'] ?? ($item['product_name'] ?? 'Article');
            $size = $item['size'] ?? 'M';
            $unit = $item['unit_price'] ?? ($item['price'] ?? 0);
            $lineTotal = number_format($unit * $qty, 0, ',', ' ');
            $msg .= "• {$qty}x {$name} (Taille : {$size}) — {$lineTotal} FCFA\n";
        }
        $msg .= "-----------------------------------\n";
        $msg .= "*TOTAL ESTIMÉ : " . number_format($totalAmount, 0, ',', ' ') . " FCFA*\n\n";
        $msg .= "Bonjour, je souhaite finaliser ma commande et convenir avec vous des modalités de livraison.";

        return "https://wa.me/{$number}?text=" . rawurlencode($msg);
    }

    /**
     * Génère l'URL WhatsApp pour un rendez-vous sur-mesure
     */
    public static function buildAppointmentUrl(string $reference, string $clientName, string $clientPhone, string $locationType, ?string $address, ?string $garmentType, ?string $preferredDate, ?string $notes = null): string
    {
        $number = static::getStylistNumber();

        $msg = "*DEMANDE DE RENDEZ-VOUS SUR-MESURE*\n";
        $msg .= "Référence : {$reference}\n";
        $msg .= "-----------------------------------\n";
        $msg .= "Client : {$clientName}\n";
        $msg .= "Téléphone : {$clientPhone}\n";
        $msg .= "Lieu : " . ($locationType === 'domicile' ? 'Déplacement à Domicile / Bureau' : "À l'Atelier du Styliste à Cotonou") . "\n";
        if ($locationType === 'domicile' && !empty($address)) {
            $msg .= "Adresse : " . trim($address) . "\n";
        }
        if (!empty($preferredDate)) {
            $msg .= "Date souhaitée : " . trim($preferredDate) . "\n";
        }
        if (!empty($garmentType)) {
            $msg .= "Idée de tenue : " . trim($garmentType) . "\n";
        }
        if (!empty($notes)) {
            $msg .= "Précisions : " . trim($notes) . "\n";
        }
        $msg .= "-----------------------------------\n";
        $msg .= "Bonjour AllFashion, je souhaite fixer un rendez-vous avec le styliste pour une prise de mesure. Pouvez-vous me confirmer vos disponibilités ?";

        return "https://wa.me/{$number}?text=" . rawurlencode($msg);
    }

    /**
     * Génère l'URL WhatsApp pour une demande de flocage
     */
    public static function buildFlockingUrl(string $reference, string $clientName, string $clientPhone, ?string $garmentType, int $quantity, ?string $instructions = null): string
    {
        $number = static::getStylistNumber();

        $msg = "*DEMANDE DE FLOCAGE & PERSONNALISATION*\n";
        $msg .= "Référence : {$reference}\n";
        $msg .= "-----------------------------------\n";
        $msg .= "Client : {$clientName}\n";
        $msg .= "Téléphone : {$clientPhone}\n";
        if (!empty($garmentType)) {
            $msg .= "Vêtement : {$garmentType}\n";
        }
        $msg .= "Quantité de pièces : {$quantity}\n";
        if (!empty($instructions)) {
            $msg .= "Détails / Logo : " . trim($instructions) . "\n";
        }
        $msg .= "-----------------------------------\n";
        $msg .= "Bonjour AllFashion, je souhaite personnaliser ces pièces avec un flocage. Pouvez-vous me confirmer le tarif et les délais ?";

        return "https://wa.me/{$number}?text=" . rawurlencode($msg);
    }
}
