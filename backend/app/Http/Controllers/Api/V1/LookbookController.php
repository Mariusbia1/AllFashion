<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\LookbookItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LookbookController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = LookbookItem::where('is_active', true)
            ->with('category')
            ->orderBy('sort_order', 'asc')
            ->orderBy('id', 'desc');

        if ($request->filled('category')) {
            $cat = $request->query('category');
            $query->whereHas('category', function ($q) use ($cat) {
                $q->where('slug', $cat);
            });
        }

        return response()->json([
            'success' => true,
            'data' => $query->get(),
        ]);
    }
}
