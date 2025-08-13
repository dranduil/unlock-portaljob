<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\JobPosting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ApplicationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $apps = Application::with(['jobPosting.company'])
            ->where('candidate_user_id', $request->user()->id)
            ->latest()
            ->paginate(20);

        return response()->json([
            'data' => $apps->items(),
            'meta' => [
                'page' => $apps->currentPage(),
                'total' => $apps->total(),
                'per_page' => $apps->perPage(),
                'last_page' => $apps->lastPage(),
            ],
            'filters' => (object)[],
        ]);
    }

    public function store(Request $request, string $id): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'cv_id' => 'nullable|exists:cv_documents,id',
            'cover_letter' => 'nullable|string',
            'answers' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        $job = JobPosting::active()->findOrFail($id);

        $application = Application::create([
            'job_posting_id' => $job->id,
            'candidate_user_id' => $request->user()->id,
            'status' => 'new',
            'cover_letter' => $request->input('cover_letter'),
            'answers' => $request->input('answers', []),
            'source' => 'portal',
        ]);

        return response()->json([
            'message' => 'Application submitted',
            'data' => $application->load(['jobPosting.company']),
        ], 201);
    }

    public function show(Request $request, string $id): JsonResponse
    {
        $app = Application::with(['jobPosting.company', 'candidate'])->findOrFail($id);
        // TODO: policy check
        return response()->json(['data' => $app]);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:new,reviewing,shortlisted,interviewing,offer,rejected',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        $app = Application::findOrFail($id);
        // TODO: policy check
        $app->update($validator->validated());

        return response()->json([
            'message' => 'Application updated',
            'data' => $app,
        ]);
    }

    public function companyApplications(Request $request, string $id): JsonResponse
    {
        // TODO: ensure user is a company member with permission
        $apps = Application::with(['jobPosting'])
            ->whereHas('jobPosting', function ($q) use ($id) {
                $q->where('company_id', $id);
            })
            ->latest()
            ->paginate(20);

        return response()->json([
            'data' => $apps->items(),
            'meta' => [
                'page' => $apps->currentPage(),
                'total' => $apps->total(),
                'per_page' => $apps->perPage(),
                'last_page' => $apps->lastPage(),
            ],
            'filters' => (object)[],
        ]);
    }
}


