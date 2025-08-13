<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\CompanyMember;
use App\Models\JobPosting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CompanyController extends Controller
{
    public function show(string $slug): JsonResponse
    {
        $company = Company::withCount(['jobPostings' => function ($q) {
            $q->active();
        }])->where('slug', $slug)->first();

        if (!$company) {
            return response()->json(['message' => 'Company not found'], 404);
        }

        return response()->json(['data' => $company]);
    }

    public function jobs(string $id): JsonResponse
    {
        $jobs = JobPosting::with('company')->where('company_id', $id)->active()->latest('published_at')->paginate(20);

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

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:companies,slug',
            'description' => 'nullable|string',
            'website' => 'nullable|url|max:255',
            'logo_url' => 'nullable|url|max:255',
            'industry' => 'nullable|string|max:100',
            'size' => 'nullable|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();
        if (empty($data['slug'])) {
            $data['slug'] = \Str::slug($data['name']);
        }
        $data['owner_user_id'] = $request->user()->id;
        $data['status'] = 'pending';

        $company = Company::create($data);

        // Add owner as member
        CompanyMember::create([
            'company_id' => $company->id,
            'user_id' => $request->user()->id,
            'role' => 'owner',
            'joined_at' => now(),
        ]);

        return response()->json(['message' => 'Company created', 'data' => $company], 201);
    }

    public function addMember(Request $request, string $id): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'role' => 'required|in:owner,recruiter',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        $company = Company::findOrFail($id);
        // TODO: Policy check for owner

        $data = $validator->validated();
        $member = CompanyMember::updateOrCreate(
            ['company_id' => $company->id, 'user_id' => $data['user_id']],
            ['role' => $data['role'], 'joined_at' => now()]
        );

        return response()->json(['message' => 'Member added', 'data' => $member]);
    }
}


