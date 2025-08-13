<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobPosting extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'title',
        'slug',
        'description',
        'requirements',
        'benefits',
        'employment_type',
        'seniority',
        'location_mode',
        'country',
        'city',
        'state',
        'salary_min',
        'salary_max',
        'currency',
        'tags',
        'status',
        'expires_at',
        'published_at',
    ];

    protected $casts = [
        'tags' => 'array',
        'expires_at' => 'datetime',
        'published_at' => 'datetime',
        'salary_min' => 'decimal:2',
        'salary_max' => 'decimal:2',
    ];

    protected $dates = [
        'expires_at',
        'published_at',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'job_category');
    }

    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }

    public function savedJobs(): HasMany
    {
        return $this->hasMany(SavedJob::class);
    }

    public function views(): HasMany
    {
        return $this->hasMany(JobView::class);
    }

    public function matches(): HasMany
    {
        return $this->hasMany(JobMatch::class);
    }

    public function isPublished(): bool
    {
        return $this->status === 'published';
    }

    public function isExpired(): bool
    {
        return $this->expires_at && $this->expires_at->isPast();
    }

    public function isActive(): bool
    {
        return $this->isPublished() && !$this->isExpired();
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'published')
            ->where(function ($q) {
                $q->whereNull('expires_at')
                    ->orWhere('expires_at', '>', now());
            });
    }

    public function scopeByLocation($query, $location)
    {
        return $query->where(function ($q) use ($location) {
            $q->where('city', 'like', "%{$location}%")
                ->orWhere('state', 'like', "%{$location}%")
                ->orWhere('country', 'like', "%{$location}%");
        });
    }

    public function scopeByRemote($query, $mode)
    {
        return $query->where('location_mode', $mode);
    }
}
