<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobMatch extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'job_posting_id',
        'score',
        'explanation',
        'is_relevant',
        'viewed_at',
    ];

    protected $casts = [
        'score' => 'decimal:2',
        'explanation' => 'array',
        'is_relevant' => 'boolean',
        'viewed_at' => 'datetime',
    ];

    protected $dates = [
        'viewed_at',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function jobPosting(): BelongsTo
    {
        return $this->belongsTo(JobPosting::class);
    }

    public function isRelevant(): bool
    {
        return $this->is_relevant;
    }

    public function isViewed(): bool
    {
        return !is_null($this->viewed_at);
    }

    public function scopeRelevant($query)
    {
        return $query->where('is_relevant', true);
    }

    public function scopeByScore($query, $minScore = 0)
    {
        return $query->where('score', '>=', $minScore);
    }

    public function scopeOrderedByScore($query)
    {
        return $query->orderBy('score', 'desc');
    }
}
