<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'is_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
        ];
    }

    // Relationships
    public function profile(): HasOne
    {
        return $this->hasOne(Profile::class);
    }

    public function companies(): BelongsToMany
    {
        return $this->belongsToMany(Company::class, 'company_members')
            ->withPivot('role', 'permissions', 'joined_at')
            ->withTimestamps();
    }

    public function ownedCompanies(): HasMany
    {
        return $this->hasMany(Company::class, 'owner_user_id');
    }

    public function applications(): HasMany
    {
        return $this->hasMany(Application::class, 'candidate_user_id');
    }

    public function savedJobs(): BelongsToMany
    {
        return $this->belongsToMany(JobPosting::class, 'saved_jobs')
            ->withPivot('notes')
            ->withTimestamps();
    }

    public function cvDocuments(): HasMany
    {
        return $this->hasMany(CvDocument::class);
    }

    public function jobMatches(): HasMany
    {
        return $this->hasMany(JobMatch::class);
    }

    // Role methods
    public function isCandidate(): bool
    {
        return $this->role === 'candidate';
    }

    public function isRecruiter(): bool
    {
        return $this->role === 'recruiter';
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isActive(): bool
    {
        return $this->is_active;
    }

    public function hasRole(string $role): bool
    {
        return $this->role === $role;
    }

    public function hasAnyRole(array $roles): bool
    {
        return in_array($this->role, $roles);
    }

    // Company membership methods
    public function isCompanyMember(Company $company): bool
    {
        return $this->companies()->where('company_id', $company->id)->exists();
    }

    public function getCompanyRole(Company $company): ?string
    {
        $member = $this->companies()->where('company_id', $company->id)->first();
        return $member ? $member->pivot->role : null;
    }

    public function isCompanyOwner(Company $company): bool
    {
        return $this->ownedCompanies()->where('id', $company->id)->exists();
    }

    public function canManageCompany(Company $company): bool
    {
        return $this->isCompanyOwner($company) || 
               ($this->isCompanyMember($company) && $this->getCompanyRole($company) === 'recruiter');
    }
}
