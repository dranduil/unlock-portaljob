<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\JobController;
use App\Http\Controllers\Api\V1\ApplicationController;
use App\Http\Controllers\Api\V1\CompanyController;
use App\Http\Controllers\Api\V1\ProfileController;
use App\Http\Controllers\Api\V1\CvController;
use App\Http\Controllers\Api\V1\MatchController;
use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\SavedJobController;
use App\Http\Controllers\Api\V1\AdminController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// API v1 routes
Route::prefix('v1')->group(function () {
    
    // Public routes
    Route::get('/jobs', [JobController::class, 'index']);
    Route::get('/jobs/{slug}', [JobController::class, 'show']);
    Route::get('/companies/{slug}', [CompanyController::class, 'show']);
    Route::get('/companies/{id}/jobs', [CompanyController::class, 'jobs']);
    Route::get('/categories', [CategoryController::class, 'index']);
    
    // Auth routes
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::get('/auth/me', [AuthController::class, 'me'])->middleware('auth:sanctum');
    
    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        
        // Profile & CV management
        Route::get('/me/profile', [ProfileController::class, 'show']);
        Route::patch('/me/profile', [ProfileController::class, 'update']);
        Route::post('/me/cv', [CvController::class, 'store']);
        Route::get('/me/cv/{id}', [CvController::class, 'show']);
        Route::patch('/me/cv/{id}', [CvController::class, 'update']);
        Route::delete('/me/cv/{id}', [CvController::class, 'destroy']);
        
        // Job applications
        Route::post('/jobs/{id}/apply', [ApplicationController::class, 'store']);
        Route::get('/me/applications', [ApplicationController::class, 'index']);
        Route::get('/me/applications/{id}', [ApplicationController::class, 'show']);
        
        // Saved jobs
        Route::get('/me/saved-jobs', [SavedJobController::class, 'index']);
        Route::post('/me/saved-jobs/{id}', [SavedJobController::class, 'store']);
        Route::delete('/me/saved-jobs/{id}', [SavedJobController::class, 'destroy']);
        
        // Job matches
        Route::get('/me/matches', [MatchController::class, 'index']);
        Route::post('/me/matches/{id}/feedback', [MatchController::class, 'feedback']);
        
        // Recruiter routes
        Route::middleware('role:recruiter')->group(function () {
            Route::post('/companies', [CompanyController::class, 'store']);
            Route::post('/companies/{id}/members', [CompanyController::class, 'addMember']);
            Route::get('/companies/{id}/applications', [ApplicationController::class, 'companyApplications']);
        });
        
        // Company job management
        Route::middleware('company.member')->group(function () {
            Route::post('/companies/{companyId}/jobs', [JobController::class, 'store']);
            Route::patch('/jobs/{id}', [JobController::class, 'update']);
            Route::post('/jobs/{id}/publish', [JobController::class, 'publish']);
            Route::post('/jobs/{id}/close', [JobController::class, 'close']);
        });
        
        // Application management
        Route::middleware('application.manager')->group(function () {
            Route::patch('/applications/{id}', [ApplicationController::class, 'update']);
            Route::get('/applications/{id}', [ApplicationController::class, 'show']);
        });
        
        // Admin routes
        Route::middleware('role:admin')->group(function () {
            Route::get('/admin/abuse/reports', [AdminController::class, 'abuseReports']);
            Route::post('/admin/jobs/{id}/moderate', [AdminController::class, 'moderateJob']);
            Route::post('/admin/companies/{id}/moderate', [AdminController::class, 'moderateCompany']);
        });
    });
    
    // Public CV view
    Route::get('/cv/share/{token}', [CvController::class, 'publicView']);
});
