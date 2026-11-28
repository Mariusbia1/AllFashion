<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Category::where('is_active', true)->orderBy('sort_order', 'asc');

        if ($request->has('type')) {
            $query->where('type', $request->query('type'));
        }

        $categories = $query->withCount('products')->get();

        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }
}
