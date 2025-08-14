<?php

namespace App\Services;

use App\Models\JobPosting;
use App\Models\User;
use App\Models\Application;
use App\Notifications\JobApplicationReceived;
use App\Notifications\NewJobPosted;
use App\Notifications\ApplicationStatusUpdated;
use App\Notifications\JobClosed;
use Illuminate\Support\Facades\Notification;

class NotificationService
{
    /**
     * Notify HR/Recruiters when a new application is received
     */
    public function notifyNewApplication(Application $application): void
    {
        // Get company members who should be notified (recruiters and owners)
        $companyMembers = $application->job->company->members()
            ->whereIn('role', ['owner', 'recruiter'])
            ->with('user')
            ->get();

        foreach ($companyMembers as $member) {
            $member->user->notify(new JobApplicationReceived(
                $application->job,
                $application->candidate
            ));
        }
    }

    /**
     * Notify candidates about new job postings that match their preferences
     */
    public function notifyNewJobPosted(JobPosting $job): void
    {
        // Get candidates who might be interested in this job
        // This could be based on skills, location preferences, etc.
        $interestedCandidates = User::where('role', 'candidate')
            ->whereHas('profile', function ($query) use ($job) {
                // Match based on skills, location preferences, etc.
                $query->whereJsonContains('skills', $job->tags)
                    ->orWhere('location', 'LIKE', "%{$job->country}%")
                    ->orWhere('location', 'LIKE', "%{$job->city}%");
            })
            ->get();

        foreach ($interestedCandidates as $candidate) {
            $candidate->notify(new NewJobPosted($job));
        }
    }

    /**
     * Notify candidate when their application status changes
     */
    public function notifyApplicationStatusUpdate(
        Application $application, 
        string $oldStatus, 
        string $newStatus
    ): void {
        $application->candidate->notify(new ApplicationStatusUpdated(
            $application,
            $oldStatus,
            $newStatus
        ));
    }

    /**
     * Notify all applicants when a job is closed
     */
    public function notifyJobClosed(JobPosting $job): void
    {
        $applicants = $job->applications()
            ->with('candidate')
            ->get();

        foreach ($applicants as $application) {
            $application->candidate->notify(new JobClosed($job));
        }
    }

    /**
     * Send bulk notifications to candidates about new jobs
     */
    public function sendBulkJobNotifications(JobPosting $job, array $candidateIds): void
    {
        $candidates = User::whereIn('id', $candidateIds)
            ->where('role', 'candidate')
            ->get();

        foreach ($candidates as $candidate) {
            $candidate->notify(new NewJobPosted($job));
        }
    }

    /**
     * Notify company members about application updates
     */
    public function notifyCompanyAboutApplicationUpdate(
        Application $application, 
        string $oldStatus, 
        string $newStatus
    ): void
    {
        $companyMembers = $application->job->company->members()
            ->whereIn('role', ['owner', 'recruiter'])
            ->with('user')
            ->get();

        foreach ($companyMembers as $member) {
            // You could create a separate notification for this
            // For now, we'll use the existing one
            $member->user->notify(new JobApplicationReceived(
                $application->job,
                $application->candidate
            ));
        }
    }
}
