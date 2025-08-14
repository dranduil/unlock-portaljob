<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class GenerateRobotsTxt extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'robots:generate {--output=public/robots.txt}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate a robots.txt file for search engine crawlers';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $outputPath = $this->option('output');
        $baseUrl = config('app.url');
        
        $this->info('Generating robots.txt...');
        
        $content = "# robots.txt for " . config('app.name') . "\n";
        $content .= "# Generated on " . now()->toISOString() . "\n\n";
        
        $content .= "User-agent: *\n";
        $content .= "Allow: /\n\n";
        
        $content .= "# Disallow private/admin areas\n";
        $content .= "Disallow: /admin/\n";
        $content .= "Disallow: /recruiter/\n";
        $content .= "Disallow: /me/\n";
        $content .= "Disallow: /dashboard\n";
        $content .= "Disallow: /api/\n";
        $content .= "Disallow: /_debugbar/\n";
        $content .= "Disallow: /storage/\n";
        $content .= "Disallow: /vendor/\n\n";
        
        $content .= "# Allow important public pages\n";
        $content .= "Allow: /jobs\n";
        $content .= "Allow: /companies\n";
        $content .= "Allow: /auth/login\n";
        $content .= "Allow: /auth/register\n\n";
        
        $content .= "# Sitemap location\n";
        $content .= "Sitemap: {$baseUrl}/sitemap.xml\n";
        $content .= "Sitemap: {$baseUrl}/sitemaps/sitemap-index.xml\n\n";
        
        $content .= "# Crawl delay (optional)\n";
        $content .= "Crawl-delay: 1\n";
        
        // Write to file
        $directory = dirname($outputPath);
        if (!File::exists($directory)) {
            File::makeDirectory($directory, 0755, true);
        }
        
        File::put($outputPath, $content);
        
        $this->info("robots.txt generated successfully at: {$outputPath}");
        $this->info('This file helps search engines understand which pages to crawl');
        
        return Command::SUCCESS;
    }
}
