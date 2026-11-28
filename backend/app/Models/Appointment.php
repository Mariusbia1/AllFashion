<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference',
        'client_name',
        'client_phone',
        'location_type',
        'address',
        'garment_type',
        'preferred_date',
        'time_slot',
        'notes',
        'measurements',
        'status',
    ];

    protected $casts = [
        'measurements' => 'array',
    ];
}
