<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\JobMatch;
use App\Models\JobPosting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MatchController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $matches = JobMatch::with('jobPosting.company')
            ->where('user_id', $request->user()->id)
            ->orderByDesc('score')
            ->paginate(50);

        return response()->json([
            'data' => $matches->items(),
            'meta' => [
                'page' => $matches->currentPage(),
                'total' => $matches->total(),
                'per_page' => $matches->perPage(),
                'last_page' => $matches->lastPage(),
            ],
            'filters' => (object)[],
        ]);
    }

    public function feedback(Request $request, string $id): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'is_relevant' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        $match = JobMatch::where('user_id', $request->user()->id)->findOrFail($id);
        $match->update(['is_relevant' => $request->boolean('is_relevant')]);

        return response()->json(['message' => 'Feedback recorded', 'data' => $match]);
    }
}


