<?php

namespace App\Notifications;

use App\Models\JobPosting;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class JobClosed extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public JobPosting $job
    ) {}

    public function via($notifiable): array
    {
        return ['mail'];
    }

    public function toMail($notifiable): MailMessage
    {
        $jobTitle = $this->job->title;
        $companyName = $this->job->company->name;

        return (new MailMessage)
            ->subject("Job posting closed: {$jobTitle} at {$companyName}")
            ->greeting("Hello!")
            ->line("The job posting for {$jobTitle} at {$companyName} has been closed.")
            ->line("This means the company is no longer accepting new applications for this position.")
            ->line("If you haven't applied yet, don't worry - there are many other great opportunities available!")
            ->action('Browse More Jobs', url("/jobs"))
            ->line('Keep checking our platform for new job postings that match your skills and interests.')
            ->salutation("Best regards,\nUnlock Portal Job Team");
    }

    public function toArray($notifiable): array
    {
        return [
            'job_id' => $this->job->id,
            'job_title' => $this->job->title,
            'company_name' => $this->job->company->name,
        ];
    }
}
