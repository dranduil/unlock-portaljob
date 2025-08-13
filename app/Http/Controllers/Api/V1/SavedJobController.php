<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\JobPosting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SavedJobController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $jobs = $request->user()->savedJobs()->with('company')->latest()->paginate(20);

        return response()->json([
            'data' => $jobs->items(),
            'meta' => [
                'page' => $jobs->currentPage(),
                'total' => $jobs->total(),
                'per_page' => $jobs->perPage(),
                'last_page' => $jobs->lastPage(),
            ],
            'filters' => (object)[],
        ]);
    }

    public function store(Request $request, string $id): JsonResponse
    {
        $job = JobPosting::active()->findOrFail($id);
        $request->user()->savedJobs()->syncWithoutDetaching([$job->id]);

        return response()->json(['message' => 'Job saved']);
    }

    public function destroy(Request $request, string $id): JsonResponse
    {
        $request->user()->savedJobs()->detach($id);
        return response()->json(['message' => 'Job removed']);
    }
}


