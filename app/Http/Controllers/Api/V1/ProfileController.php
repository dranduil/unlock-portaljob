<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        $profile = Profile::firstOrCreate(['user_id' => $request->user()->id]);
        return response()->json(['data' => $profile]);
    }

    public function update(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'headline' => 'nullable|string|max:255',
            'summary' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:100',
            'city' => 'nullable|string|max:100',
            'skills' => 'nullable|array',
            'languages' => 'nullable|array',
            'work_preferences' => 'nullable|array',
            'visibility' => 'nullable|in:public,link-only,private',
            'linkedin_url' => 'nullable|url|max:255',
            'github_url' => 'nullable|url|max:255',
            'portfolio_url' => 'nullable|url|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        $profile = Profile::firstOrCreate(['user_id' => $request->user()->id]);
        $profile->update($validator->validated());

        return response()->json(['message' => 'Profile updated', 'data' => $profile]);
    }
}


