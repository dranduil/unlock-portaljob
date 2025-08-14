<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\JobPosting;
use App\Models\SavedJob;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $payload = [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ] : null,
        ];

        if ($user) {
            if ($user->isCandidate()) {
                $applicationsCount = Application::where('candidate_user_id', $user->id)->count();
                $savedJobsCount = $user->savedJobs()->count();
                $recentApplications = Application::with('jobPosting.company')
                    ->where('candidate_user_id', $user->id)
                    ->latest()->take(5)->get();

                $payload['stats'] = [
                    'applications' => $applicationsCount,
                    'savedJobs' => $savedJobsCount,
                ];
                $payload['recentApplications'] = $recentApplications;
            }

            if ($user->isRecruiter()) {
                $activeJobs = JobPosting::whereHas('company.members', function ($q) use ($user) {
                        $q->where('user_id', $user->id);
                    })
                    ->active()->count();
                $applicationsForCompanies = Application::whereHas('jobPosting', function ($q) use ($user) {
                        $q->whereHas('company.members', function ($qq) use ($user) {
                            $qq->where('user_id', $user->id);
                        });
                    })->count();

                $payload['stats'] = [
                    'activeJobs' => $activeJobs,
                    'applications' => $applicationsForCompanies,
                ];
            }
        }

        return Inertia::render('dashboard', $payload);
    }
}


