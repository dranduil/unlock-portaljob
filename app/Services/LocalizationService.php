<?php

namespace App\Services;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

class LocalizationService
{
    /**
     * Get the current locale
     */
    public function getCurrentLocale(): string
    {
        return App::getLocale();
    }

    /**
     * Get all supported locales
     */
    public function getSupportedLocales(): array
    {
        return config('languages.supported', []);
    }

    /**
     * Check if a locale is supported
     */
    public function isLocaleSupported(string $locale): bool
    {
        return array_key_exists($locale, $this->getSupportedLocales());
    }

    /**
     * Get the default locale
     */
    public function getDefaultLocale(): string
    {
        return config('languages.default', 'en');
    }

    /**
     * Check if current locale is the default
     */
    public function isDefaultLocale(): bool
    {
        return $this->getCurrentLocale() === $this->getDefaultLocale();
    }

    /**
     * Generate a localized URL
     */
    public function localizedUrl(string $path, string $locale = null, array $parameters = []): string
    {
        $locale = $locale ?: $this->getCurrentLocale();
        
        // If it's the default locale and we're using prefix structure, don't add locale
        if ($locale === $this->getDefaultLocale() && config('languages.url_structure') === 'prefix') {
            return url($path, $parameters);
        }

        // Add locale prefix
        if (config('languages.url_structure') === 'prefix') {
            $path = $locale . '/' . ltrim($path, '/');
        }

        return url($path, $parameters);
    }

    /**
     * Generate a localized route URL
     */
    public function localizedRoute(string $name, array $parameters = [], string $locale = null): string
    {
        $locale = $locale ?: $this->getCurrentLocale();
        
        // If it's the default locale and we're using prefix structure, don't add locale
        if ($locale === $this->getDefaultLocale() && config('languages.url_structure') === 'prefix') {
            return route($name, $parameters);
        }

        // Add locale prefix to route name
        $localizedRouteName = $locale . '.' . $name;
        
        // If the localized route doesn't exist, fall back to the original
        if (!Route::has($localizedRouteName)) {
            return route($name, $parameters);
        }

        return route($localizedRouteName, $parameters);
    }

    /**
     * Get the localized path without locale prefix
     */
    public function getLocalizedPath(string $path): string
    {
        $currentLocale = $this->getCurrentLocale();
        
        // Remove locale prefix if present
        if (Str::startsWith($path, $currentLocale . '/')) {
            return Str::substr($path, Str::length($currentLocale) + 1);
        }

        return $path;
    }

    /**
     * Generate hreflang tags for SEO
     */
    public function generateHreflangTags(string $currentPath, array $parameters = []): array
    {
        $tags = [];
        $supportedLocales = $this->getSupportedLocales();

        foreach ($supportedLocales as $locale => $config) {
            $url = $this->localizedUrl($currentPath, $locale, $parameters);
            $tags[] = [
                'hreflang' => $locale,
                'href' => $url,
            ];
        }

        // Add x-default hreflang
        $defaultUrl = $this->localizedUrl($currentPath, $this->getDefaultLocale(), $parameters);
        $tags[] = [
            'hreflang' => 'x-default',
            'href' => $defaultUrl,
        ];

        return $tags;
    }

    /**
     * Get locale-specific formatting
     */
    public function getLocaleFormatting(string $locale = null): array
    {
        $locale = $locale ?: $this->getCurrentLocale();
        return config("languages.formatting.{$locale}", []);
    }

    /**
     * Format a date according to current locale
     */
    public function formatDate($date, string $format = null): string
    {
        $locale = $this->getCurrentLocale();
        $format = $format ?: config("languages.formatting.{$locale}.date_format", 'M j, Y');
        
        if ($date instanceof \Carbon\Carbon) {
            return $date->format($format);
        }
        
        return date($format, strtotime($date));
    }

    /**
     * Format a number according to current locale
     */
    public function formatNumber(float $number, int $decimals = 2): string
    {
        $locale = $this->getCurrentLocale();
        $config = config("languages.formatting.{$locale}.number_format", []);
        
        $decimalSeparator = $config['decimal_separator'] ?? '.';
        $thousandsSeparator = $config['thousands_separator'] ?? ',';
        
        return number_format($number, $decimals, $decimalSeparator, $thousandsSeparator);
    }

    /**
     * Get locale-specific currency
     */
    public function getLocaleCurrency(string $locale = null): string
    {
        $locale = $locale ?: $this->getCurrentLocale();
        return config("languages.formatting.{$locale}.currency", 'USD');
    }

    /**
     * Switch locale and redirect
     */
    public function switchLocale(string $locale): string
    {
        if (!$this->isLocaleSupported($locale)) {
            $locale = $this->getDefaultLocale();
        }

        $currentPath = request()->path();
        
        // Remove current locale prefix if present
        $currentLocale = $this->getCurrentLocale();
        if (Str::startsWith($currentPath, $currentLocale . '/')) {
            $currentPath = Str::substr($currentPath, Str::length($currentLocale) + 1);
        }

        return $this->localizedUrl($currentPath, $locale);
    }
}
