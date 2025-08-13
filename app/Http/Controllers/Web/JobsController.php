<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\JobPosting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JobsController extends Controller
{
    public function index(): Response
    {
        // Frontend page fetches from API. We render the shell.
        return Inertia::render('jobs/index');
    }

    public function show(Request $request, string $slug): Response
    {
        $job = JobPosting::with(['company', 'categories'])
            ->active()
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('jobs/show', [
            'job' => $job,
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'role' => $request->user()->role,
                ] : null,
            ],
        ]);
    }
}


