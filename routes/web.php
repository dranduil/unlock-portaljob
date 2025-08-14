<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Web\JobsController as WebJobsController;
use App\Http\Controllers\Web\CompaniesController as WebCompaniesController;
use App\Http\Controllers\Web\DashboardController;
use App\Http\Controllers\Web\MeController;
use App\Http\Controllers\Web\RecruiterController;

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
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/me/profile', [MeController::class, 'profile'])->name('profile');
    // Compatibility alias for components expecting Breeze's default route name
    Route::get('/profile', [MeController::class, 'profile'])->name('profile.edit');
    Route::get('/me/cv', [MeController::class, 'cv'])->name('cv');
    Route::get('/me/saved-jobs', [MeController::class, 'savedJobs'])->name('saved-jobs');
    Route::get('/me/matches', [MeController::class, 'matches'])->name('matches');
    Route::get('/me/applications', [MeController::class, 'applications'])->name('applications');
});

// Recruiter routes
Route::prefix('recruiter')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [RecruiterController::class, 'dashboard'])->name('recruiter.dashboard');
    Route::get('/jobs/create', [RecruiterController::class, 'createJob'])->name('recruiter.jobs.create');
    Route::get('/applications', [RecruiterController::class, 'applications'])->name('recruiter.applications.index');
});

// (removed placeholders; using controllers above)

// Auth routes (handled by Laravel Breeze)
require __DIR__.'/auth.php';
