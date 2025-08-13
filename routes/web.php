<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

// Job browsing (public)
Route::get('/jobs', function () {
    return Inertia::render('jobs/index');
})->name('jobs.index');

Route::get('/companies', function () {
    return Inertia::render('companies/index');
})->name('companies.index');

Route::get('/jobs/{slug}', function ($slug) {
    // TODO: Fetch job data from API
    $job = [
        'id' => 1,
        'title' => 'Senior React Developer',
        'slug' => $slug,
        'description' => '<p>We are looking for a Senior React Developer to join our team...</p>',
        'requirements' => '<ul><li>5+ years of experience with React</li><li>Strong TypeScript skills</li></ul>',
        'benefits' => '<ul><li>Competitive salary</li><li>Remote work options</li></ul>',
        'company' => [
            'id' => 1,
            'name' => 'TechCorp Inc.',
            'slug' => 'techcorp',
            'logo_url' => null,
            'verified_at' => '2024-01-15',
            'website' => 'https://techcorp.com',
            'description' => 'Leading technology company',
            'industry' => 'Technology',
            'size' => 'Medium'
        ],
        'location_mode' => 'remote',
        'city' => 'San Francisco',
        'state' => 'California',
        'country' => 'United States',
        'employment_type' => 'full-time',
        'seniority' => 'senior',
        'salary_min' => 120000,
        'salary_max' => 180000,
        'currency' => 'USD',
        'tags' => ['React', 'TypeScript', 'Frontend', 'Remote'],
        'published_at' => '2024-01-15T10:00:00Z',
        'expires_at' => '2024-04-15T10:00:00Z',
        'categories' => [
            ['id' => 1, 'name' => 'Software Development', 'slug' => 'software-development', 'icon' => '💻']
        ]
    ];
    
    return Inertia::render('jobs/show', [
        'job' => $job,
        'auth' => [
            'user' => null // TODO: Get user from session/auth
        ]
    ]);
})->name('jobs.show');

// Dashboard routes
Route::get('/dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/me/profile', function () {
    return Inertia::render('me/profile');
})->middleware(['auth', 'verified'])->name('profile');

Route::get('/me/cv', function () {
    return Inertia::render('me/cv');
})->middleware(['auth', 'verified'])->name('cv');

Route::get('/me/saved-jobs', function () {
    return Inertia::render('me/saved-jobs');
})->middleware(['auth', 'verified'])->name('saved-jobs');

Route::get('/me/matches', function () {
    return Inertia::render('me/matches');
})->middleware(['auth', 'verified'])->name('matches');

Route::get('/me/applications', function () {
    return Inertia::render('me/applications');
})->middleware(['auth', 'verified'])->name('applications');

// Recruiter routes
Route::prefix('recruiter')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('recruiter/dashboard');
    })->name('recruiter.dashboard');
    
    Route::get('/jobs/create', function () {
        return Inertia::render('recruiter/jobs/create');
    })->name('recruiter.jobs.create');
    
    Route::get('/applications', function () {
        return Inertia::render('recruiter/applications/index');
    })->name('recruiter.applications.index');
});

// Company routes
Route::get('/companies/{slug}', function ($slug) {
    // TODO: Fetch company data from API
    return Inertia::render('companies/show', [
        'company' => [
            'name' => 'TechCorp Inc.',
            'slug' => $slug,
            'description' => 'Leading technology company',
            'website' => 'https://techcorp.com',
            'logo_url' => null,
            'verified_at' => '2024-01-15',
            'industry' => 'Technology',
            'size' => 'Medium'
        ]
    ]);
})->name('companies.show');

Route::get('/companies/{slug}/jobs', function ($slug) {
    // TODO: Fetch company jobs from API
    return Inertia::render('companies/jobs', [
        'company' => [
            'name' => 'TechCorp Inc.',
            'slug' => $slug
        ],
        'jobs' => []
    ]);
})->name('companies.jobs');

// Auth routes (handled by Laravel Breeze)
require __DIR__.'/auth.php';
