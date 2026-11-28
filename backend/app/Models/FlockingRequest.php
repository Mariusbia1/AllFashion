<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FlockingRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference',
        'client_name',
        'client_phone',
        'garment_type',
        'position',
        'quantity',
        'artwork_path',
        'instructions',
        'quoted_price',
        'status',
    ];

    protected $casts = [
        'quantity' => 'integer',
        'quoted_price' => 'integer',
    ];
}
