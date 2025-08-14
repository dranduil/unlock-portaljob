<?php

return [
    /*
    |--------------------------------------------------------------------------
    | SEO Configuration
    |--------------------------------------------------------------------------
    |
    | This file contains configuration options for SEO, structured data,
    | and meta tags for your application.
    |
    */

    // Site Information
    'site' => [
        'name' => env('APP_NAME', 'Unlock Portal Job'),
        'description' => 'International job portal with transparent listings, ATS-friendly CVs, and global opportunities',
        'url' => env('APP_URL', 'https://unlockportaljob.com'),
        'logo' => '/logo.svg',
        'logo_width' => 512,
        'logo_height' => 512,
        'language' => 'en',
        'default_locale' => 'en_US',
    ],

    // Social Media
    'social' => [
        'facebook' => 'https://www.facebook.com/unlockportaljob',
        'twitter' => 'https://twitter.com/unlockportaljob',
        'linkedin' => 'https://www.linkedin.com/company/unlock-portal-job',
        'instagram' => 'https://www.instagram.com/unlockportaljob',
    ],

    // Organization Schema
    'organization' => [
        'name' => 'Unlock Portal Job',
        'description' => 'Leading international job portal connecting talented professionals with global opportunities',
        'founding_date' => '2024',
        'number_of_employees' => '50-100',
        'industry' => 'Employment Services',
        'service_type' => 'Job Portal',
        'contact_email' => 'support@unlockportaljob.com',
        'available_languages' => ['English', 'Spanish', 'French', 'German'],
    ],

    // Job Posting Schema
    'job_posting' => [
        'default_currency' => 'USD',
        'salary_unit' => 'YEAR',
        'job_validity_days' => 30,
        'location_types' => [
            'remote' => 'TELECOMMUTE',
            'hybrid' => 'HYBRID',
            'onsite' => 'ONSITE',
        ],
        'employment_types' => [
            'full-time' => 'FULL_TIME',
            'part-time' => 'PART_TIME',
            'contract' => 'CONTRACT',
            'internship' => 'INTERN',
            'freelance' => 'FREELANCE',
        ],
    ],

    // Breadcrumb Schema
    'breadcrumbs' => [
        'enabled' => true,
        'show_home' => true,
        'home_text' => 'Home',
        'separator' => '>',
    ],

    // FAQ Schema
    'faq' => [
        'enabled' => true,
        'questions' => [
            [
                'question' => 'How do I create an ATS-friendly CV?',
                'answer' => 'Our CV builder automatically formats your CV to pass through Applicant Tracking Systems with proper keywords and structure.',
            ],
            [
                'question' => 'Are the salary ranges accurate?',
                'answer' => 'Yes, all salary information is verified and provided directly by employers to ensure transparency.',
            ],
            [
                'question' => 'Can I apply to jobs internationally?',
                'answer' => 'Absolutely! We offer job opportunities from companies worldwide, including remote positions.',
            ],
        ],
    ],

    // Local Business Schema
    'local_business' => [
        'enabled' => false,
        'type' => 'EmploymentAgency',
        'address' => [
            'street' => '123 Job Street',
            'city' => 'Tech City',
            'state' => 'CA',
            'postal_code' => '90210',
            'country' => 'US',
        ],
        'phone' => '+1-555-123-4567',
        'opening_hours' => [
            'Monday' => '09:00-17:00',
            'Tuesday' => '09:00-17:00',
            'Wednesday' => '09:00-17:00',
            'Thursday' => '09:00-17:00',
            'Friday' => '09:00-17:00',
        ],
    ],

    // Review Schema
    'reviews' => [
        'enabled' => true,
        'average_rating' => 4.8,
        'total_reviews' => 1250,
        'review_source' => 'Customer Reviews',
    ],

    // Article Schema
    'articles' => [
        'enabled' => true,
        'author' => 'Unlock Portal Job Team',
        'publisher' => 'Unlock Portal Job',
        'publisher_logo' => '/logo.svg',
    ],

    // Event Schema
    'events' => [
        'enabled' => false,
        'organizer' => 'Unlock Portal Job',
        'organizer_url' => 'https://unlockportaljob.com',
    ],

    // Product Schema
    'products' => [
        'enabled' => false,
        'brand' => 'Unlock Portal Job',
        'category' => 'Job Portal Services',
    ],

    // Service Schema
    'services' => [
        'enabled' => true,
        'service_type' => 'Job Search Platform',
        'area_served' => 'Worldwide',
        'available_language' => ['English', 'Spanish', 'French', 'German'],
        'service_output' => 'Job Matches and Career Opportunities',
    ],

    // WebPage Schema
    'webpage' => [
        'enabled' => true,
        'in_language' => 'en',
        'is_part_of' => 'Unlock Portal Job Website',
        'about' => 'International job portal and career services',
    ],

    // Search Action Schema
    'search_action' => [
        'enabled' => true,
        'target_template' => '/jobs?search={search_term_string}',
        'query_input' => 'required name=search_term_string',
    ],

    // Site Navigation Schema
    'site_navigation' => [
        'enabled' => true,
        'main_entity' => [
            'Jobs' => '/jobs',
            'Companies' => '/companies',
            'CV Builder' => '/me/cv',
            'Career Advice' => '/career-advice',
        ],
    ],
];
