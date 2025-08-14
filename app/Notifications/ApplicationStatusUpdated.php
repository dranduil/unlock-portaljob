<?php

namespace App\Notifications;

use App\Models\JobPosting;
use App\Models\Application;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ApplicationStatusUpdated extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Application $application,
        public string $oldStatus,
        public string $newStatus
    ) {}

    public function via($notifiable): array
    {
        return ['mail'];
    }

    public function toMail($notifiable): MailMessage
    {
        $jobTitle = $this->application->job->title;
        $companyName = $this->application->job->company->name;
        $statusText = ucfirst($this->newStatus);

        $message = (new MailMessage)
            ->subject("Your application status has been updated - {$jobTitle}")
            ->greeting("Hello!");

        switch ($this->newStatus) {
            case 'shortlisted':
                $message->line("Great news! Your application for {$jobTitle} at {$companyName} has been shortlisted!")
                    ->line("The hiring team is interested in your profile and may contact you soon for next steps.")
                    ->action('View Application', url("/me/applications"));
                break;
            
            case 'interviewing':
                $message->line("Excellent! You've been selected for an interview for {$jobTitle} at {$companyName}!")
                    ->line("The hiring team will contact you to schedule the interview.")
                    ->action('View Application', url("/me/applications"));
                break;
            
            case 'offer':
                $message->line("Congratulations! You've received a job offer for {$jobTitle} at {$companyName}!")
                    ->line("Please check your application dashboard for the offer details.")
                    ->action('View Application', url("/me/applications"));
                break;
            
            case 'rejected':
                $message->line("Your application for {$jobTitle} at {$companyName} was not selected for this position.")
                    ->line("Don't be discouraged - keep applying to other opportunities that match your skills!")
                    ->action('Browse More Jobs', url("/jobs"));
                break;
            
            default:
                $message->line("Your application status for {$jobTitle} at {$companyName} has been updated to: {$statusText}")
                    ->action('View Application', url("/me/applications"));
        }

        return $message->salutation("Best regards,\nUnlock Portal Job Team");
    }

    public function toArray($notifiable): array
    {
        return [
            'application_id' => $this->application->id,
            'job_title' => $this->application->job->title,
            'company_name' => $this->application->job->company->name,
            'old_status' => $this->oldStatus,
            'new_status' => $this->newStatus,
        ];
    }
}
