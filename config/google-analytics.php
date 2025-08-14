<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Google Analytics Configuration
    |--------------------------------------------------------------------------
    |
    | This file contains configuration options for Google Analytics 4 (GA4)
    | and Google Tag Manager (GTM) integration.
    |
    */

    // Google Analytics 4 (GA4) Measurement ID
    'ga4_measurement_id' => env('GOOGLE_ANALYTICS_GA4_ID', 'GA_MEASUREMENT_ID'),

    // Google Tag Manager (GTM) Container ID
    'gtm_container_id' => env('GOOGLE_TAG_MANAGER_ID', 'GTM-XXXXXXX'),

    // Enable Google Analytics 4
    'enable_ga4' => env('GOOGLE_ANALYTICS_ENABLED', true),

    // Enable Google Tag Manager
    'enable_gtm' => env('GOOGLE_TAG_MANAGER_ENABLED', true),

    // Enable enhanced ecommerce tracking (if applicable)
    'enable_ecommerce' => env('GOOGLE_ANALYTICS_ECOMMERCE', false),

    // Enable user ID tracking (requires user authentication)
    'enable_user_id_tracking' => env('GOOGLE_ANALYTICS_USER_ID', false),

    // Custom dimensions and metrics (if any)
    'custom_dimensions' => [
        // 'dimension1' => 'user_type',
        // 'dimension2' => 'job_category',
    ],

    'custom_metrics' => [
        // 'metric1' => 'job_views',
        // 'metric2' => 'application_submissions',
    ],
];
