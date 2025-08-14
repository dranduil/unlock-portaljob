<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Artisan;

class GenerateMultilingualSEO extends Command
{
    protected $signature = 'seo:multilingual {--output-dir=public/sitemaps} {--max-urls=50000}';
    protected $description = 'Generate all multilingual SEO files (sitemaps, robots.txt) with hreflang support';

    public function handle()
    {
        $this->info('🌍 Generating multilingual SEO files...');
        $this->newLine();

        // Generate robots.txt with multilingual sitemap references
        $this->info('📝 Generating multilingual robots.txt...');
        $this->generateMultilingualRobotsTxt();
        $this->newLine();

        // Generate multilingual sitemaps
        $this->info('🗺️  Generating multilingual sitemaps...');
        $this->call('sitemap:multilingual', [
            '--output-dir' => $this->option('output-dir'),
            '--max-urls' => $this->option('max-urls')
        ]);

        $this->newLine();
        $this->info('✅ Multilingual SEO generation completed!');
        $this->displayNextSteps();

        return Command::SUCCESS;
    }

    private function generateMultilingualRobotsTxt(): void
    {
        $filepath = 'public/robots.txt';
        $baseUrl = config('app.url');
        $supportedLocales = array_keys(config('languages.supported', []));
        $defaultLocale = config('languages.default', 'en');

        $content = "# robots.txt for " . config('app.name') . " (Multilingual)\n";
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
        
        $content .= "# Multilingual Sitemaps\n";
        $content .= "Sitemap: {$baseUrl}/sitemaps/sitemap-index-multilingual.xml\n";
        $content .= "Sitemap: {$baseUrl}/sitemap.xml\n\n";
        
        // Add locale-specific sitemaps
        foreach ($supportedLocales as $locale) {
            if ($locale !== $defaultLocale) {
                $content .= "Sitemap: {$baseUrl}/sitemaps/sitemap-index-{$locale}.xml\n";
            }
        }
        $content .= "\n";
        
        $content .= "# Crawl delay (optional)\n";
        $content .= "Crawl-delay: 1\n";
        
        // Write to file
        $directory = dirname($filepath);
        if (!File::exists($directory)) {
            File::makeDirectory($directory, 0755, true);
        }
        
        File::put($filepath, $content);
        
        $this->info("  Generated multilingual robots.txt at: {$filepath}");
    }

    private function displayNextSteps(): void
    {
        $baseUrl = config('app.url');
        $supportedLocales = array_keys(config('languages.supported', []));
        
        $this->info('📋 Next Steps:');
        $this->newLine();
        
        $this->line('1. Submit the multilingual sitemap index to Google Search Console:');
        $this->line("   - {$baseUrl}/sitemaps/sitemap-index-multilingual.xml");
        
        $this->newLine();
        $this->line('2. Individual locale sitemaps:');
        foreach ($supportedLocales as $locale) {
            $this->line("   - {$locale}: {$baseUrl}/sitemaps/sitemap-index-{$locale}.xml");
        }
        
        $this->newLine();
        $this->line('3. Verify your multilingual robots.txt:');
        $this->line("   - {$baseUrl}/robots.txt");
        
        $this->newLine();
        $this->line('4. SEO Best Practices for Multilingual Sites:');
        $this->line('   - Each page should have proper hreflang tags');
        $this->line('   - Use canonical URLs for each language version');
        $this->line('   - Ensure proper language detection in URLs');
        $this->line('   - Monitor indexing in Google Search Console for each locale');
        
        $this->newLine();
        $this->line('5. Consider setting up automatic sitemap regeneration');
        $this->newLine();
        $this->comment('💡 Tip: Use hreflang tags to help search engines understand language relationships!');
    }
}
