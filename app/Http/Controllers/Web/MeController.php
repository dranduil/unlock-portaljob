<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class MeController extends Controller
{
    public function profile(): Response
    {
        return Inertia::render('me/profile');
    }

    public function cv(): Response
    {
        return Inertia::render('me/cv');
    }

    public function savedJobs(): Response
    {
        return Inertia::render('me/saved-jobs');
    }

    public function matches(): Response
    {
        return Inertia::render('me/matches');
    }

    public function applications(): Response
    {
        return Inertia::render('me/applications');
    }
}


