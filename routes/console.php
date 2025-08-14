<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// SEO Commands
Artisan::command('seo:generate', function () {
    $this->call('seo:generate');
})->purpose('Generate all SEO files (sitemap, robots.txt) for Google Search Console');

Artisan::command('sitemap:generate', function () {
    $this->call('sitemap:generate');
})->purpose('Generate a simple sitemap XML file');

Artisan::command('sitemap:index', function () {
    $this->call('sitemap:index');
})->purpose('Generate sitemap index files for large sites');

Artisan::command('robots:generate', function () {
    $this->call('robots:generate');
})->purpose('Generate a robots.txt file for search engines');
