<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Artisan;

class GenerateSEO extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'seo:generate {--simple : Generate simple single sitemap} {--output-dir=public/sitemaps}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate all SEO files (sitemap, robots.txt) for Google Search Console';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🚀 Generating SEO files for Google Search Console...');
        $this->newLine();
        
        // Generate robots.txt
        $this->info('📝 Generating robots.txt...');
        $this->call('robots:generate');
        $this->newLine();
        
        // Generate sitemap(s)
        if ($this->option('simple')) {
            $this->info('🗺️  Generating simple sitemap...');
            $this->call('sitemap:generate');
        } else {
            $this->info('🗺️  Generating sitemap index files...');
            $this->call('sitemap:index', [
                '--output-dir' => $this->option('output-dir')
            ]);
        }
        
        $this->newLine();
        $this->info('✅ SEO generation completed!');
        $this->newLine();
        
        $this->displayNextSteps();
        
        return Command::SUCCESS;
    }
    
    /**
     * Display next steps for the user
     */
    private function displayNextSteps(): void
    {
        $baseUrl = config('app.url');
        
        $this->info('📋 Next Steps:');
        $this->newLine();
        
        $this->line('1. Submit your sitemap to Google Search Console:');
        if ($this->option('simple')) {
            $this->line("   - {$baseUrl}/sitemap.xml");
        } else {
            $this->line("   - {$baseUrl}/sitemaps/sitemap-index.xml");
        }
        
        $this->newLine();
        $this->line('2. Verify your robots.txt is accessible:');
        $this->line("   - {$baseUrl}/robots.txt");
        
        $this->newLine();
        $this->line('3. Monitor your sitemap in Google Search Console:');
        $this->line('   - Check for crawl errors');
        $this->line('   - Monitor indexing status');
        $this->line('   - Review search performance');
        
        $this->newLine();
        $this->line('4. Consider setting up a cron job to regenerate sitemaps:');
        $this->line('   - Add to your server\'s crontab');
        $this->line('   - Or use Laravel\'s task scheduler');
        
        $this->newLine();
        $this->comment('💡 Tip: Regenerate sitemaps regularly to keep them up-to-date!');
    }
}
