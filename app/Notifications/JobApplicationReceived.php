<?php

namespace App\Notifications;

use App\Models\JobPosting;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class JobApplicationReceived extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public JobPosting $job,
        public User $candidate
    ) {}

    public function via($notifiable): array
    {
        return ['mail'];
    }

    public function toMail($notifiable): MailMessage
    {
        $companyName = $this->job->company->name;
        $jobTitle = $this->job->title;
        $candidateName = $this->candidate->name;

        return (new MailMessage)
            ->subject("New application received for {$jobTitle} at {$companyName}")
            ->greeting("Hello!")
            ->line("A new application has been received for the position of {$jobTitle}.")
            ->line("Candidate: {$candidateName}")
            ->line("Company: {$companyName}")
            ->action('View Application', url("/recruiter/applications"))
            ->line('You can review the full application and candidate details in your dashboard.')
            ->salutation("Best regards,\nUnlock Portal Job Team");
    }

    public function toArray($notifiable): array
    {
        return [
            'job_id' => $this->job->id,
            'job_title' => $this->job->title,
            'candidate_id' => $this->candidate->id,
            'candidate_name' => $this->candidate->name,
            'company_name' => $this->job->company->name,
        ];
    }
}
