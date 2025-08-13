<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\JobPosting;
use Inertia\Inertia;
use Inertia\Response;

class CompaniesController extends Controller
{
    public function index(): Response
    {
        // Frontend page fetches from API. We render the shell.
        return Inertia::render('companies/index');
    }

    public function show(string $slug): Response
    {
        $company = Company::where('slug', $slug)->firstOrFail();

        return Inertia::render('companies/show', [
            'company' => $company,
        ]);
    }

    public function jobs(string $slug): Response
    {
        $company = Company::where('slug', $slug)->firstOrFail();
        $jobs = JobPosting::with('company')
            ->where('company_id', $company->id)
            ->active()
            ->latest('published_at')
            ->get();

        return Inertia::render('companies/jobs', [
            'company' => $company,
            'jobs' => $jobs,
        ]);
    }
}


