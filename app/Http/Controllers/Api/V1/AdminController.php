<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\JobPosting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function abuseReports(): JsonResponse
    {
        // Placeholder - implement reporting store later
        return response()->json([
            'data' => [],
            'meta' => [
                'page' => 1,
                'total' => 0,
                'per_page' => 0,
                'last_page' => 1,
            ],
            'filters' => (object)[],
        ]);
    }

    public function moderateJob(Request $request, string $id): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:draft,published,closed',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        $job = JobPosting::findOrFail($id);
        $job->update(['status' => $request->input('status')]);

        return response()->json(['message' => 'Job moderated', 'data' => $job]);
    }

    public function moderateCompany(Request $request, string $id): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:active,pending,suspended',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        $company = Company::findOrFail($id);
        $company->update(['status' => $request->input('status')]);

        return response()->json(['message' => 'Company moderated', 'data' => $company]);
    }
}


