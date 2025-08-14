<?php

namespace App\Console\Commands;

use App\Models\JobPosting;
use App\Models\Company;
use App\Models\Category;
use App\Services\LocalizationService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class GenerateMultilingualSitemap extends Command
{
    protected $signature = 'sitemap:multilingual {--output-dir=public/sitemaps} {--max-urls=50000}';
    protected $description = 'Generate multilingual sitemaps with hreflang support for SEO';

    protected LocalizationService $localizationService;
    protected $outputDir;
    protected $maxUrlsPerFile;
    protected $baseUrl;

    public function __construct(LocalizationService $localizationService)
    {
        parent::__construct();
        $this->localizationService = $localizationService;
    }

    public function handle()
    {
        $this->outputDir = $this->option('output-dir');
        $this->maxUrlsPerFile = (int) $this->option('max-urls');
        $this->baseUrl = config('app.url');

        $this->info('🌍 Generating multilingual sitemaps...');
        $this->info("Output directory: {$this->outputDir}");
        $this->info("Max URLs per file: {$this->maxUrlsPerFile}");

        // Create output directory
        if (!File::exists($this->outputDir)) {
            File::makeDirectory($this->outputDir, 0755, true);
        }

        $supportedLocales = $this->localizationService->getSupportedLocales();
        $defaultLocale = $this->localizationService->getDefaultLocale();

        $this->info("Supported locales: " . implode(', ', array_keys($supportedLocales)));

        // Generate sitemaps for each locale
        foreach ($supportedLocales as $locale => $config) {
            $this->info("\n📝 Generating sitemap for {$locale}...");
            $this->generateLocaleSitemap($locale, $config);
        }

        // Generate sitemap index
        $this->generateMultilingualSitemapIndex($supportedLocales);

        $this->info("\n✅ Multilingual sitemap generation completed!");
        $this->displayNextSteps($supportedLocales);

        return Command::SUCCESS;
    }

    private function generateLocaleSitemap(string $locale, array $config): void
    {
        $sitemapFiles = [];

        // Generate static pages sitemap
        $sitemapFiles[] = $this->generateStaticPagesSitemap($locale);

        // Generate job pages sitemap(s)
        $sitemapFiles = array_merge($sitemapFiles, $this->generateJobSitemaps($locale));

        // Generate company pages sitemap(s)
        $sitemapFiles = array_merge($sitemapFiles, $this->generateCompanySitemaps($locale));

        // Generate category pages sitemap
        $sitemapFiles[] = $this->generateCategorySitemap($locale);

        // Generate locale sitemap index
        $this->generateLocaleSitemapIndex($locale, $sitemapFiles);
    }

    private function generateStaticPagesSitemap(string $locale): string
    {
        $filename = "static-pages-{$locale}.xml";
        $filepath = $this->outputDir . '/' . $filename;

        $staticPages = [
            '' => ['priority' => '1.0', 'changefreq' => 'daily'],
            '/jobs' => ['priority' => '0.9', 'changefreq' => 'daily'],
            '/companies' => ['priority' => '0.8', 'changefreq' => 'weekly'],
            '/auth/login' => ['priority' => '0.3', 'changefreq' => 'monthly'],
            '/auth/register' => ['priority' => '0.3', 'changefreq' => 'monthly'],
        ];

        $xml = $this->generateSitemapXml($staticPages, $locale);
        File::put($filepath, $xml);

        $this->info("  Generated static pages sitemap: {$filename}");
        return $filename;
    }

    private function generateJobSitemaps(string $locale): array
    {
        $jobs = JobPosting::where('status', 'published')
            ->where('expires_at', '>', now())
            ->select('slug', 'updated_at')
            ->orderBy('updated_at', 'desc')
            ->get();

        $this->info("  Found {$jobs->count()} published jobs");

        if ($jobs->count() <= $this->maxUrlsPerFile) {
            $filename = "jobs-{$locale}.xml";
            $filepath = $this->outputDir . '/' . $filename;

            $jobPages = [];
            foreach ($jobs as $job) {
                $jobPages['/jobs/' . $job->slug] = [
                    'priority' => '0.8',
                    'changefreq' => 'weekly',
                    'lastmod' => $job->updated_at
                ];
            }

            $xml = $this->generateSitemapXml($jobPages, $locale);
            File::put($filepath, $xml);

            $this->info("  Generated jobs sitemap: {$filename}");
            return [$filename];
        }

        // Split into multiple files
        $chunks = $jobs->chunk($this->maxUrlsPerFile);
        $filenames = [];

        foreach ($chunks as $index => $chunk) {
            $filename = "jobs-{$locale}-{$index}.xml";
            $filepath = $this->outputDir . '/' . $filename;

            $jobPages = [];
            foreach ($chunk as $job) {
                $jobPages['/jobs/' . $job->slug] = [
                    'priority' => '0.8',
                    'changefreq' => 'weekly',
                    'lastmod' => $job->updated_at
                ];
            }

            $xml = $this->generateSitemapXml($jobPages, $locale);
            File::put($filepath, $xml);

            $filenames[] = $filename;
            $this->info("  Generated jobs sitemap: {$filename}");
        }

        return $filenames;
    }

    private function generateCompanySitemaps(string $locale): array
    {
        $companies = Company::where('verified_at', '!=', null)
            ->select('slug', 'updated_at')
            ->orderBy('updated_at', 'desc')
            ->get();

        $this->info("  Found {$companies->count()} verified companies");

        if ($companies->count() <= $this->maxUrlsPerFile) {
            $filename = "companies-{$locale}.xml";
            $filepath = $this->outputDir . '/' . $filename;

            $companyPages = [];
            foreach ($companies as $company) {
                $companyPages['/companies/' . $company->slug] = [
                    'priority' => '0.7',
                    'changefreq' => 'weekly',
                    'lastmod' => $company->updated_at
                ];
            }

            $xml = $this->generateSitemapXml($companyPages, $locale);
            File::put($filepath, $xml);

            $this->info("  Generated companies sitemap: {$filename}");
            return [$filename];
        }

        // Split into multiple files
        $chunks = $companies->chunk($this->maxUrlsPerFile);
        $filenames = [];

        foreach ($chunks as $index => $chunk) {
            $filename = "companies-{$locale}-{$index}.xml";
            $filepath = $this->outputDir . '/' . $filename;

            $companyPages = [];
            foreach ($chunk as $company) {
                $companyPages['/companies/' . $company->slug] = [
                    'priority' => '0.7',
                    'changefreq' => 'weekly',
                    'lastmod' => $company->updated_at
                ];
            }

            $xml = $this->generateSitemapXml($companyPages, $locale);
            File::put($filepath, $xml);

            $filenames[] = $filename;
            $this->info("  Generated companies sitemap: {$filename}");
        }

        return $filenames;
    }

    private function generateCategorySitemap(string $locale): string
    {
        $filename = "categories-{$locale}.xml";
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

        $xml = $this->generateSitemapXml($categoryPages, $locale);
        File::put($filepath, $xml);

        $this->info("  Generated categories sitemap: {$filename}");
        return $filename;
    }

    private function generateLocaleSitemapIndex(string $locale, array $sitemapFiles): void
    {
        $filepath = $this->outputDir . "/sitemap-index-{$locale}.xml";

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
        $this->info("  Generated locale sitemap index: sitemap-index-{$locale}.xml");
    }

    private function generateMultilingualSitemapIndex(array $supportedLocales): void
    {
        $filepath = $this->outputDir . '/sitemap-index-multilingual.xml';

        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

        foreach ($supportedLocales as $locale => $config) {
            $xml .= "  <sitemap>\n";
            $xml .= "    <loc>{$this->baseUrl}/sitemaps/sitemap-index-{$locale}.xml</loc>\n";
            $xml .= "    <lastmod>" . now()->toISOString() . "</lastmod>\n";
            $xml .= "  </sitemap>\n";
        }

        $xml .= '</sitemapindex>';

        File::put($filepath, $xml);
        $this->info("\n📋 Generated multilingual sitemap index: sitemap-index-multilingual.xml");
    }

    private function generateSitemapXml(array $pages, string $locale): string
    {
        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

        foreach ($pages as $path => $attributes) {
            $xml .= "  <url>\n";
            
            // Generate URL with locale prefix
            $url = $this->generateLocalizedUrl($path, $locale);
            $xml .= "    <loc>{$url}</loc>\n";
            
            $xml .= "    <lastmod>" . ($attributes['lastmod'] ?? now())->toISOString() . "</lastmod>\n";
            $xml .= "    <changefreq>{$attributes['changefreq']}</changefreq>\n";
            $xml .= "    <priority>{$attributes['priority']}</priority>\n";
            
            // Add hreflang tags for multilingual SEO
            $xml .= $this->generateHreflangTags($path, $attributes);
            
            $xml .= "  </url>\n";
        }

        $xml .= '</urlset>';
        return $xml;
    }

    private function generateLocalizedUrl(string $path, string $locale): string
    {
        $defaultLocale = $this->localizationService->getDefaultLocale();
        
        // If it's the default locale, don't add prefix
        if ($locale === $defaultLocale) {
            return $this->baseUrl . $path;
        }

        // Add locale prefix
        return $this->baseUrl . '/' . $locale . $path;
    }

    private function generateHreflangTags(string $path, array $attributes): string
    {
        $supportedLocales = $this->localizationService->getSupportedLocales();
        $defaultLocale = $this->localizationService->getDefaultLocale();
        $tags = '';

        foreach ($supportedLocales as $locale => $config) {
            $url = $this->generateLocalizedUrl($path, $locale);
            $tags .= "    <xhtml:link rel=\"alternate\" hreflang=\"{$locale}\" href=\"{$url}\" />\n";
        }

        // Add x-default hreflang
        $defaultUrl = $this->generateLocalizedUrl($path, $defaultLocale);
        $tags .= "    <xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"{$defaultUrl}\" />\n";

        return $tags;
    }

    private function displayNextSteps(array $supportedLocales): void
    {
        $this->info("\n📋 Next Steps:");
        $this->info("1. Submit the multilingual sitemap index to Google Search Console:");
        $this->info("   - {$this->baseUrl}/sitemaps/sitemap-index-multilingual.xml");
        
        $this->info("\n2. Individual locale sitemaps:");
        foreach ($supportedLocales as $locale => $config) {
            $this->info("   - {$locale}: {$this->baseUrl}/sitemaps/sitemap-index-{$locale}.xml");
        }
        
        $this->info("\n3. Update your robots.txt to include all sitemaps");
        $this->info("4. Monitor indexing in Google Search Console for each locale");
        $this->info("5. Consider setting up automatic sitemap regeneration");
    }
}
