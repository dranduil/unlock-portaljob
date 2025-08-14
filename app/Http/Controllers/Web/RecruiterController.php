<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class RecruiterController extends Controller
{
    public function dashboard(): Response
    {
        return Inertia::render('recruiter/dashboard');
    }

    public function createJob(): Response
    {
        return Inertia::render('recruiter/jobs/create');
    }

    public function applications(): Response
    {
        return Inertia::render('recruiter/applications/index');
    }
}


