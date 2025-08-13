<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\JobPosting;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class JobController extends Controller
{
    /**
     * Display a listing of jobs with filters
     */
    public function index(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'search' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'remote' => 'nullable|in:onsite,hybrid,remote',
            'category' => 'nullable|string|max:255',
            'type' => 'nullable|in:full-time,part-time,contract,internship,freelance',
            'seniority' => 'nullable|in:entry,junior,mid,senior,lead,executive',
            'minSalary' => 'nullable|numeric|min:0',
            'maxSalary' => 'nullable|numeric|min:0',
            'page' => 'nullable|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $query = JobPosting::with(['company', 'categories'])
            ->active()
            ->orderBy('published_at', 'desc');

        // Apply filters
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('tags', 'like', "%{$search}%");
            });
        }

        if ($request->filled('location')) {
            $query->byLocation($request->location);
        }

        if ($request->filled('remote')) {
            $query->byRemote($request->remote);
        }

        if ($request->filled('category')) {
            $query->whereHas('categories', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        if ($request->filled('type')) {
            $query->where('employment_type', $request->type);
        }

        if ($request->filled('seniority')) {
            $query->where('seniority', $request->seniority);
        }

        if ($request->filled('minSalary')) {
            $query->where('salary_max', '>=', $request->minSalary);
        }

        if ($request->filled('maxSalary')) {
            $query->where('salary_min', '<=', $request->maxSalary);
        }

        $perPage = 20;
        $jobs = $query->paginate($perPage);

        return response()->json([
            'data' => $jobs->items(),
            'meta' => [
                'page' => $jobs->currentPage(),
                'total' => $jobs->total(),
                'per_page' => $jobs->perPage(),
                'last_page' => $jobs->lastPage(),
            ],
            'filters' => $request->only([
                'search', 'location', 'remote', 'category', 
                'type', 'seniority', 'minSalary', 'maxSalary'
            ])
        ]);
    }

    /**
     * Display the specified job
     */
    public function show(string $slug): JsonResponse
    {
        $job = JobPosting::with(['company', 'categories'])
            ->where('slug', $slug)
            ->active()
            ->first();

        if (!$job) {
            return response()->json([
                'message' => 'Job not found'
            ], 404);
        }

        // Track view
        $this->trackJobView($job);

        return response()->json([
            'data' => $job
        ]);
    }

    /**
     * Store a newly created job
     */
    public function store(Request $request, string $companyId): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'requirements' => 'nullable|string',
            'benefits' => 'nullable|string',
            'employment_type' => 'required|in:full-time,part-time,contract,internship,freelance',
            'seniority' => 'required|in:entry,junior,mid,senior,lead,executive',
            'location_mode' => 'required|in:onsite,hybrid,remote',
            'country' => 'nullable|string|max:100',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'salary_min' => 'nullable|numeric|min:0',
            'salary_max' => 'nullable|numeric|min:0',
            'currency' => 'required|string|size:3',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
            'category_ids' => 'nullable|array',
            'category_ids.*' => 'exists:categories,id',
            'expires_at' => 'nullable|date|after:now',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // TODO: Check if user can create jobs for this company
        // This will be implemented with policies

        $data = $validator->validated();
        $data['company_id'] = $companyId;
        $data['slug'] = Str::slug($data['title']);
        $data['status'] = 'draft';

        $job = JobPosting::create($data);

        // Attach categories
        if (!empty($data['category_ids'])) {
            $job->categories()->attach($data['category_ids']);
        }

        return response()->json([
            'message' => 'Job created successfully',
            'data' => $job->load(['company', 'categories'])
        ], 201);
    }

    /**
     * Update the specified job
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'requirements' => 'nullable|string',
            'benefits' => 'nullable|string',
            'employment_type' => 'sometimes|in:full-time,part-time,contract,internship,freelance',
            'seniority' => 'sometimes|in:entry,junior,mid,senior,lead,executive',
            'location_mode' => 'sometimes|in:onsite,hybrid,remote',
            'country' => 'nullable|string|max:100',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'salary_min' => 'nullable|numeric|min:0',
            'salary_max' => 'nullable|numeric|min:0',
            'currency' => 'sometimes|string|size:3',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
            'category_ids' => 'nullable|array',
            'category_ids.*' => 'exists:categories,id',
            'expires_at' => 'nullable|date|after:now',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $job = JobPosting::findOrFail($id);

        // TODO: Check if user can edit this job
        // This will be implemented with policies

        $data = $validator->validated();
        
        if (isset($data['title'])) {
            $data['slug'] = Str::slug($data['title']);
        }

        $job->update($data);

        // Update categories
        if (isset($data['category_ids'])) {
            $job->categories()->sync($data['category_ids']);
        }

        return response()->json([
            'message' => 'Job updated successfully',
            'data' => $job->load(['company', 'categories'])
        ]);
    }

    /**
     * Close a job posting
     */
    public function close(string $id): JsonResponse
    {
        $job = JobPosting::findOrFail($id);

        // TODO: Check if user can close this job
        // This will be implemented with policies

        $job->update(['status' => 'closed']);

        return response()->json([
            'message' => 'Job closed successfully',
            'data' => $job
        ]);
    }

    /**
     * Track job view for analytics
     */
    private function trackJobView(JobPosting $job): void
    {
        // TODO: Implement job view tracking
        // This will create a JobView record
    }
}
