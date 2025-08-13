<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CvSection extends Model
{
    use HasFactory;

    protected $fillable = [
        'cv_document_id',
        'type',
        'content',
        'order',
        'is_visible',
    ];

    protected $casts = [
        'content' => 'array',
        'is_visible' => 'boolean',
        'order' => 'integer',
    ];

    public function cvDocument(): BelongsTo
    {
        return $this->belongsTo(CvDocument::class);
    }

    public function isVisible(): bool
    {
        return $this->is_visible;
    }

    public function scopeVisible($query)
    {
        return $query->where('is_visible', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }
}
