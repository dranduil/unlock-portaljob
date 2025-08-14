<?php

namespace App\Console\Commands;

use App\Models\JobPosting;
use App\Models\Company;
use App\Models\Category;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Carbon\Carbon;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:generate {--output=public/sitemap.xml}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate a sitemap XML file for Google Search Console';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $outputPath = $this->option('output');
        $baseUrl = config('app.url');
        
        $this->info('Generating sitemap...');
        
        // Start building XML
        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
        
        // Add static pages
        $this->addStaticPages($xml, $baseUrl);
        
        // Add job listings
        $this->addJobPages($xml, $baseUrl);
        
        // Add company pages
        $this->addCompanyPages($xml, $baseUrl);
        
        // Add category pages
        $this->addCategoryPages($xml, $baseUrl);
        
        $xml .= '</urlset>';
        
        // Write to file
        $directory = dirname($outputPath);
        if (!File::exists($directory)) {
            File::makeDirectory($directory, 0755, true);
        }
        
        File::put($outputPath, $xml);
        
        $this->info("Sitemap generated successfully at: {$outputPath}");
        $this->info('You can now submit this to Google Search Console');
        
        return Command::SUCCESS;
    }
    
    /**
     * Add static pages to sitemap
     */
    private function addStaticPages(&$xml, $baseUrl): void
    {
        $staticPages = [
            '' => '1.0', // Home page
            '/jobs' => '0.9',
            '/companies' => '0.8',
            '/auth/login' => '0.3',
            '/auth/register' => '0.3',
        ];
        
        foreach ($staticPages as $path => $priority) {
            $xml .= $this->formatUrl($baseUrl . $path, $priority, 'daily');
        }
    }
    
    /**
     * Add job posting pages to sitemap
     */
    private function addJobPages(&$xml, $baseUrl): void
    {
        $jobs = JobPosting::where('status', 'published')
            ->where('expires_at', '>', now())
            ->select('slug', 'updated_at')
            ->get();
            
        $this->info("Adding {$jobs->count()} job pages to sitemap");
        
        foreach ($jobs as $job) {
            $xml .= $this->formatUrl(
                $baseUrl . '/jobs/' . $job->slug,
                '0.8',
                'weekly',
                $job->updated_at
            );
        }
    }
    
    /**
     * Add company pages to sitemap
     */
    private function addCompanyPages(&$xml, $baseUrl): void
    {
        $companies = Company::where('verified_at', '!=', null)
            ->select('slug', 'updated_at')
            ->get();
            
        $this->info("Adding {$companies->count()} company pages to sitemap");
        
        foreach ($companies as $company) {
            $xml .= $this->formatUrl(
                $baseUrl . '/companies/' . $company->slug,
                '0.7',
                'weekly',
                $company->updated_at
            );
        }
    }
    
    /**
     * Add category pages to sitemap
     */
    private function addCategoryPages(&$xml, $baseUrl): void
    {
        $categories = Category::select('slug', 'updated_at')->get();
        
        $this->info("Adding {$categories->count()} category pages to sitemap");
        
        foreach ($categories as $category) {
            $xml .= $this->formatUrl(
                $baseUrl . '/jobs?category=' . $category->slug,
                '0.6',
                'monthly',
                $category->updated_at
            );
        }
    }
    
    /**
     * Format a URL entry for the sitemap
     */
    private function formatUrl($url, $priority, $changefreq, $lastmod = null): string
    {
        $xml = "  <url>\n";
        $xml .= "    <loc>{$url}</loc>\n";
        $xml .= "    <lastmod>" . ($lastmod ? $lastmod->toISOString() : now()->toISOString()) . "</lastmod>\n";
        $xml .= "    <changefreq>{$changefreq}</changefreq>\n";
        $xml .= "    <priority>{$priority}</priority>\n";
        $xml .= "  </url>\n";
        
        return $xml;
    }
}
