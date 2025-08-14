<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Supported Languages
    |--------------------------------------------------------------------------
    |
    | This array contains all supported languages for the application.
    | Each language should have a locale code, name, and flag.
    |
    */

    'supported' => [
        'en' => [
            'name' => 'English',
            'native_name' => 'English',
            'flag' => '🇺🇸',
            'locale' => 'en_US',
            'fallback' => true,
            'rtl' => false,
        ],
        'es' => [
            'name' => 'Spanish',
            'native_name' => 'Español',
            'flag' => '🇪🇸',
            'locale' => 'es_ES',
            'fallback' => false,
            'rtl' => false,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Default Language
    |--------------------------------------------------------------------------
    |
    | This is the default language that will be used when no language
    | is specified in the URL.
    |
    */

    'default' => 'en',

    /*
    |--------------------------------------------------------------------------
    | Language Detection
    |--------------------------------------------------------------------------
    |
    | How the application should detect the user's preferred language.
    | Options: 'url', 'session', 'browser', 'ip'
    |
    */

    'detection' => ['url', 'session', 'browser'],

    /*
    |--------------------------------------------------------------------------
    | URL Structure
    |--------------------------------------------------------------------------
    |
    | How language codes should appear in URLs.
    | Options: 'prefix' (e.g., /en/jobs), 'subdomain' (e.g., en.domain.com)
    |
    */

    'url_structure' => 'prefix',

    /*
    |--------------------------------------------------------------------------
    | SEO Settings
    |--------------------------------------------------------------------------
    |
    | SEO-related settings for multilingual content.
    |
    */

    'seo' => [
        'hreflang' => true,
        'alternate_links' => true,
        'canonical_urls' => true,
    ],

    /*
    |--------------------------------------------------------------------------
    | Date and Number Formatting
    |--------------------------------------------------------------------------
    |
    | Locale-specific formatting for dates, numbers, and currencies.
    |
    */

    'formatting' => [
        'en' => [
            'date_format' => 'M j, Y',
            'time_format' => 'g:i A',
            'currency' => 'USD',
            'number_format' => [
                'decimal_separator' => '.',
                'thousands_separator' => ',',
            ],
        ],
        'es' => [
            'date_format' => 'j \d\e M \d\e Y',
            'time_format' => 'H:i',
            'currency' => 'EUR',
            'number_format' => [
                'decimal_separator' => ',',
                'thousands_separator' => '.',
            ],
        ],
    ],
];
