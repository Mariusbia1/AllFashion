<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Appointment;
use App\Models\FlockingRequest;

class ReferenceService
{
    /**
     * Génère une référence séquentielle formatée PRÉFIXE-ANNÉE-XXXX
     * Exemple : CMD-2026-0001, RDV-2026-0001, FLOC-2026-0001
     */
    public static function generate(string $prefix): string
    {
        $year = date('Y');
        $pattern = "{$prefix}-{$year}-%";

        $lastRef = null;
        if ($prefix === 'CMD') {
            $lastRef = Order::where('reference', 'like', $pattern)->orderByDesc('id')->value('reference');
        } elseif ($prefix === 'RDV') {
            $lastRef = Appointment::where('reference', 'like', $pattern)->orderByDesc('id')->value('reference');
        } elseif ($prefix === 'FLOC') {
            $lastRef = FlockingRequest::where('reference', 'like', $pattern)->orderByDesc('id')->value('reference');
        }

        $nextNumber = 1;
        if ($lastRef) {
            $parts = explode('-', $lastRef);
            if (isset($parts[2])) {
                $nextNumber = ((int) $parts[2]) + 1;
            }
        }

        return sprintf('%s-%s-%04d', $prefix, $year, $nextNumber);
    }
}
