<?php

namespace App\Console\Commands;

use App\Models\JobPosting;
use App\Models\Company;
use App\Models\Category;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Carbon\Carbon;

class GenerateSitemapIndex extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:index {--max-urls=50000} {--output-dir=public/sitemaps}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate sitemap index files for large sites (Google Search Console)';

    /**
     * Maximum URLs per sitemap file
     */
    protected $maxUrlsPerFile;

    /**
     * Output directory for sitemap files
     */
    protected $outputDir;

    /**
     * Base URL of the application
     */
    protected $baseUrl;

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->maxUrlsPerFile = (int) $this->option('max-urls');
        $this->outputDir = $this->option('output-dir');
        $this->baseUrl = config('app.url');

        $this->info('Generating sitemap index files...');
        $this->info("Max URLs per file: {$this->maxUrlsPerFile}");
        $this->info("Output directory: {$this->outputDir}");

        // Create output directory
        if (!File::exists($this->outputDir)) {
            File::makeDirectory($this->outputDir, 0755, true);
        }

        $sitemapFiles = [];

        // Generate static pages sitemap
        $sitemapFiles[] = $this->generateStaticSitemap();

        // Generate job pages sitemap(s)
        $sitemapFiles = array_merge($sitemapFiles, $this->generateJobSitemaps());

        // Generate company pages sitemap(s)
        $sitemapFiles = array_merge($sitemapFiles, $this->generateCompanySitemaps());

        // Generate category pages sitemap
        $sitemapFiles[] = $this->generateCategorySitemap();

        // Generate sitemap index
        $this->generateSitemapIndex($sitemapFiles);

        $this->info('Sitemap generation completed successfully!');
        $this->info('Submit the sitemap index to Google Search Console: ' . $this->baseUrl . '/sitemaps/sitemap-index.xml');

        return Command::SUCCESS;
    }

    /**
     * Generate sitemap for static pages
     */
    private function generateStaticSitemap(): string
    {
        $filename = 'static-pages.xml';
        $filepath = $this->outputDir . '/' . $filename;

        $staticPages = [
            '' => ['priority' => '1.0', 'changefreq' => 'daily'],
            '/jobs' => ['priority' => '0.9', 'changefreq' => 'daily'],
            '/companies' => ['priority' => '0.8', 'changefreq' => 'weekly'],
            '/auth/login' => ['priority' => '0.3', 'changefreq' => 'monthly'],
            '/auth/register' => ['priority' => '0.3', 'changefreq' => 'monthly'],
        ];

        $xml = $this->generateSitemapXml($staticPages, null);
        File::put($filepath, $xml);

        $this->info("Generated static pages sitemap: {$filename}");
        return $filename;
    }

    /**
     * Generate sitemap(s) for job pages
     */
    private function generateJobSitemaps(): array
    {
        $jobs = JobPosting::where('status', 'published')
            ->where('expires_at', '>', now())
            ->select('slug', 'updated_at')
            ->orderBy('updated_at', 'desc')
            ->get();

        $this->info("Found {$jobs->count()} published jobs");

        if ($jobs->count() <= $this->maxUrlsPerFile) {
            $filename = 'jobs.xml';
            $filepath = $this->outputDir . '/' . $filename;

            $jobPages = [];
            foreach ($jobs as $job) {
                $jobPages['/jobs/' . $job->slug] = [
                    'priority' => '0.8',
                    'changefreq' => 'weekly',
                    'lastmod' => $job->updated_at
                ];
            }

            $xml = $this->generateSitemapXml($jobPages, null);
            File::put($filepath, $xml);

            $this->info("Generated jobs sitemap: {$filename}");
            return [$filename];
        }

        // Split into multiple files
        $chunks = $jobs->chunk($this->maxUrlsPerFile);
        $filenames = [];

        foreach ($chunks as $index => $chunk) {
            $filename = "jobs-{$index}.xml";
            $filepath = $this->outputDir . '/' . $filename;

            $jobPages = [];
            foreach ($chunk as $job) {
                $jobPages['/jobs/' . $job->slug] = [
                    'priority' => '0.8',
                    'changefreq' => 'weekly',
                    'lastmod' => $job->updated_at
                ];
            }

            $xml = $this->generateSitemapXml($jobPages, null);
            File::put($filepath, $xml);

            $filenames[] = $filename;
            $this->info("Generated jobs sitemap: {$filename}");
        }

        return $filenames;
    }

    /**
     * Generate sitemap(s) for company pages
     */
    private function generateCompanySitemaps(): array
    {
        $companies = Company::where('verified_at', '!=', null)
            ->select('slug', 'updated_at')
            ->orderBy('updated_at', 'desc')
            ->get();

        $this->info("Found {$companies->count()} verified companies");

        if ($companies->count() <= $this->maxUrlsPerFile) {
            $filename = 'companies.xml';
            $filepath = $this->outputDir . '/' . $filename;

            $companyPages = [];
            foreach ($companies as $company) {
                $companyPages['/companies/' . $company->slug] = [
                    'priority' => '0.7',
                    'changefreq' => 'weekly',
                    'lastmod' => $company->updated_at
                ];
            }

            $xml = $this->generateSitemapXml($companyPages, null);
            File::put($filepath, $xml);

            $this->info("Generated companies sitemap: {$filename}");
            return [$filename];
        }

        // Split into multiple files
        $chunks = $companies->chunk($this->maxUrlsPerFile);
        $filenames = [];

        foreach ($chunks as $index => $chunk) {
            $filename = "companies-{$index}.xml";
            $filepath = $this->outputDir . '/' . $filename;

            $companyPages = [];
            foreach ($chunk as $company) {
                $companyPages['/companies/' . $company->slug] = [
                    'priority' => '0.7',
                    'changefreq' => 'weekly',
                    'lastmod' => $company->updated_at
                ];
            }

            $xml = $this->generateSitemapXml($companyPages, null);
            File::put($filepath, $xml);

            $filenames[] = $filename;
            $this->info("Generated companies sitemap: {$filename}");
        }

        return $filenames;
    }

    /**
     * Generate sitemap for category pages
     */
    private function generateCategorySitemap(): string
    {
        $filename = 'categories.xml';
        $filepath = $this->outputDir . '/' . $filename;

        $categories = Category::select('slug', 'updated_at')->get();

        $categoryPages = [];
        foreach ($categories as $category) {
            $categoryPages['/jobs?category=' . $category->slug] = [
                'priority' => '0.6',
                'changefreq' => 'monthly',
                'lastmod' => $category->updated_at
            ];
        }

        $xml = $this->generateSitemapXml($categoryPages, null);
        File::put($filepath, $xml);

        $this->info("Generated categories sitemap: {$filename}");
        return $filename;
    }

    /**
     * Generate sitemap index file
     */
    private function generateSitemapIndex(array $sitemapFiles): void
    {
        $filepath = $this->outputDir . '/sitemap-index.xml';

        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

        foreach ($sitemapFiles as $filename) {
            $xml .= "  <sitemap>\n";
            $xml .= "    <loc>{$this->baseUrl}/sitemaps/{$filename}</loc>\n";
            $xml .= "    <lastmod>" . now()->toISOString() . "</lastmod>\n";
            $xml .= "  </sitemap>\n";
        }

        $xml .= '</sitemapindex>';

        File::put($filepath, $xml);
        $this->info("Generated sitemap index: sitemap-index.xml");
    }

    /**
     * Generate XML content for a sitemap
     */
    private function generateSitemapXml(array $pages, $defaultLastmod = null): string
    {
        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

        foreach ($pages as $path => $attributes) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>{$this->baseUrl}{$path}</loc>\n";
            $xml .= "    <lastmod>" . ($attributes['lastmod'] ?? $defaultLastmod ?? now())->toISOString() . "</lastmod>\n";
            $xml .= "    <changefreq>{$attributes['changefreq']}</changefreq>\n";
            $xml .= "    <priority>{$attributes['priority']}</priority>\n";
            $xml .= "  </url>\n";
        }

        $xml .= '</urlset>';
        return $xml;
    }
}
