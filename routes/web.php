<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Web\JobsController as WebJobsController;
use App\Http\Controllers\Web\CompaniesController as WebCompaniesController;

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
Route::get('/jobs', [WebJobsController::class, 'index'])->name('jobs.index');
Route::get('/jobs/{slug}', [WebJobsController::class, 'show'])->name('jobs.show');

// Companies (public)
Route::get('/companies', [WebCompaniesController::class, 'index'])->name('companies.index');
Route::get('/companies/{slug}', [WebCompaniesController::class, 'show'])->name('companies.show');
Route::get('/companies/{slug}/jobs', [WebCompaniesController::class, 'jobs'])->name('companies.jobs');

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

// (removed placeholders; using controllers above)

// Auth routes (handled by Laravel Breeze)
require __DIR__.'/auth.php';
