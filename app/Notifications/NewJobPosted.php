<?php

namespace App\Notifications;

use App\Models\JobPosting;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewJobPosted extends Notification implements ShouldQueue
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
        $companyName = $this->job->company->name;
        $jobTitle = $this->job->title;
        $location = $this->job->location_mode === 'remote' 
            ? 'Remote' 
            : ($this->job->city . ', ' . $this->job->country);

        return (new MailMessage)
            ->subject("New job opportunity: {$jobTitle} at {$companyName}")
            ->greeting("Hello!")
            ->line("A new job opportunity that might interest you has been posted!")
            ->line("Position: {$jobTitle}")
            ->line("Company: {$companyName}")
            ->line("Location: {$location}")
            ->line("Employment Type: " . ucfirst($this->job->employment_type))
            ->line("Seniority: " . ucfirst($this->job->seniority))
            ->action('View Job Details', url("/jobs/{$this->job->slug}"))
            ->line('Apply now to be among the first candidates considered!')
            ->salutation("Best regards,\nUnlock Portal Job Team");
    }

    public function toArray($notifiable): array
    {
        return [
            'job_id' => $this->job->id,
            'job_title' => $this->job->title,
            'company_name' => $this->job->company->name,
            'location' => $this->job->location_mode === 'remote' 
                ? 'Remote' 
                : ($this->job->city . ', ' . $this->job->country),
            'employment_type' => $this->job->employment_type,
            'seniority' => $this->job->seniority,
        ];
    }
}
