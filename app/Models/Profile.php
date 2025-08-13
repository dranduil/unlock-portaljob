<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'headline',
        'summary',
        'location',
        'country',
        'city',
        'skills',
        'languages',
        'work_preferences',
        'visibility',
        'linkedin_url',
        'github_url',
        'portfolio_url',
    ];

    protected $casts = [
        'skills' => 'array',
        'languages' => 'array',
        'work_preferences' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function isPublic(): bool
    {
        return $this->visibility === 'public';
    }

    public function isLinkOnly(): bool
    {
        return $this->visibility === 'link-only';
    }

    public function isPrivate(): bool
    {
        return $this->visibility === 'private';
    }

    public function scopePublic($query)
    {
        return $query->where('visibility', 'public');
    }

    public function scopeByLocation($query, $location)
    {
        return $query->where(function ($q) use ($location) {
            $q->where('location', 'like', "%{$location}%")
                ->orWhere('city', 'like', "%{$location}%")
                ->orWhere('country', 'like', "%{$location}%");
        });
    }

    public function scopeBySkills($query, $skills)
    {
        if (is_string($skills)) {
            $skills = [$skills];
        }

        return $query->whereJsonContains('skills', $skills);
    }
}
