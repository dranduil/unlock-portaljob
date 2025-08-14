<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Company;
use App\Models\CompanyMember;
use App\Models\JobPosting;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DemoSeeder extends Seeder
{
    public function run(): void
    {
        // Users
        $candidate = User::firstOrCreate(
            ['email' => 'candidate@example.com'],
            ['name' => 'Jane Candidate', 'password' => Hash::make('password'), 'role' => 'candidate']
        );
        $recruiter = User::firstOrCreate(
            ['email' => 'recruiter@example.com'],
            ['name' => 'Rick Recruiter', 'password' => Hash::make('password'), 'role' => 'recruiter']
        );

        // Profile for candidate
        Profile::updateOrCreate(
            ['user_id' => $candidate->id],
            [
                'headline' => 'Senior React Developer',
                'summary' => 'Experienced frontend engineer with strong TypeScript skills.',
                'location' => 'San Francisco, CA, USA',
                'country' => 'US',
                'city' => 'San Francisco',
                'skills' => ['React', 'TypeScript', 'Tailwind'],
                'languages' => ['English'],
                'work_preferences' => ['remote' => true],
                'visibility' => 'public',
            ]
        );

        // Company
        $company = Company::firstOrCreate(
            ['slug' => 'techcorp'],
            [
                'name' => 'TechCorp Inc.',
                'description' => 'Leading technology company',
                'website' => 'https://techcorp.test',
                'locations' => ['San Francisco, CA', 'Remote'],
                'industry' => 'Technology',
                'size' => 'Medium',
                'owner_user_id' => $recruiter->id,
                'status' => 'active',
            ]
        );

        CompanyMember::updateOrCreate(
            ['company_id' => $company->id, 'user_id' => $recruiter->id],
            ['role' => 'owner', 'joined_at' => now()]
        );

        // Categories
        $categories = [
            ['name' => 'Software Development', 'slug' => 'software-development'],
            ['name' => 'Data Science', 'slug' => 'data-science'],
            ['name' => 'Design', 'slug' => 'design'],
        ];
        foreach ($categories as $i => $cat) {
            Category::updateOrCreate(
                ['slug' => $cat['slug']],
                ['name' => $cat['name'], 'sort_order' => $i + 1, 'is_active' => true]
            );
        }

        // Jobs
        $jobData = [
            [
                'title' => 'Senior React Developer',
                'employment_type' => 'full-time',
                'seniority' => 'senior',
                'location_mode' => 'remote',
                'country' => 'US',
                'city' => 'San Francisco',
                'salary_min' => 120000,
                'salary_max' => 180000,
                'currency' => 'USD',
                'tags' => ['React', 'TypeScript', 'Frontend', 'Remote'],
            ],
            [
                'title' => 'Full Stack Developer',
                'employment_type' => 'full-time',
                'seniority' => 'mid',
                'location_mode' => 'hybrid',
                'country' => 'US',
                'city' => 'New York',
                'salary_min' => 80000,
                'salary_max' => 120000,
                'currency' => 'USD',
                'tags' => ['React', 'Node.js', 'MongoDB', 'AWS'],
            ],
        ];

        foreach ($jobData as $data) {
            $slug = Str::slug($data['title']);
            $job = JobPosting::updateOrCreate(
                ['slug' => $slug],
                array_merge($data, [
                    'company_id' => $company->id,
                    'slug' => $slug,
                    'status' => 'published',
                    'description' => 'Great role at a growing company.',
                    'published_at' => now()->subDays(rand(1, 10)),
                ])
            );
        }
    }
}


