<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    public function index(): JsonResponse
    {
        $categories = Category::active()->ordered()->get();

        return response()->json([
            'data' => $categories,
            'meta' => [
                'page' => 1,
                'total' => $categories->count(),
                'per_page' => $categories->count(),
                'last_page' => 1,
            ],
            'filters' => (object)[],
        ]);
    }
}


