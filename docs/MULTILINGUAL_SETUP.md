# Multilingual Setup Guide

This guide explains how to set up and use the multilingual features in your job portal application.

## Overview

The application supports multiple languages with SEO-friendly URLs and proper internationalization (i18n). Currently supported languages:
- **English (en)** - Default language
- **Spanish (es)** - Secondary language

## Features

- 🌍 **Language Detection**: Automatic detection based on URL, session, and browser preferences
- 🔗 **SEO-Friendly URLs**: Proper hreflang tags and canonical URLs
- 📱 **Language Switcher**: Easy language switching in the header
- 🗺️ **Multilingual Sitemaps**: Separate sitemaps for each language
- 📊 **Google Search Console Ready**: Proper sitemap structure for multilingual SEO

## URL Structure

The application uses a **prefix-based** URL structure:

- **English (default)**: `/jobs`, `/companies`, `/auth/login`
- **Spanish**: `/es/jobs`, `/es/companies`, `/es/auth/login`

## Configuration

### 1. Language Configuration

Edit `config/languages.php` to modify supported languages:

```php
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
```

### 2. Middleware

The `SetLocale` middleware automatically detects and sets the appropriate language for each request.

## Usage

### Language Detection Priority

1. **URL Prefix** (e.g., `/es/jobs`)
2. **Session** (stored locale preference)
3. **Browser Headers** (Accept-Language)
4. **Default Language** (English)

### Language Switching

Users can switch languages using the language switcher in the header. The switcher:
- Shows current language with flag and native name
- Provides easy access to all supported languages
- Maintains the current page when switching languages

### Frontend Components

#### Language Switcher

```tsx
import { LanguageSwitcher } from '@/components/language-switcher';

<LanguageSwitcher 
    currentLocale="en"
    supportedLocales={[
        { code: 'en', name: 'English', native_name: 'English', flag: '🇺🇸' },
        { code: 'es', name: 'Spanish', native_name: 'Español', flag: '🇪🇸' }
    ]}
/>
```

#### Localization Service

The `LocalizationService` provides methods for working with localized content:

```php
use App\Services\LocalizationService;

$localization = app(LocalizationService::class);

// Get current locale
$locale = $localization->getCurrentLocale();

// Generate localized URL
$url = $localization->localizedUrl('/jobs', 'es');

// Generate hreflang tags
$tags = $localization->generateHreflangTags('/jobs');
```

## SEO Features

### 1. Hreflang Tags

Each page automatically includes proper hreflang tags:

```html
<link rel="alternate" hreflang="en" href="https://example.com/jobs" />
<link rel="alternate" hreflang="es" href="https://example.com/es/jobs" />
<link rel="alternate" hreflang="x-default" href="https://example.com/jobs" />
```

### 2. Multilingual Sitemaps

Generate comprehensive multilingual sitemaps:

```bash
# Generate all multilingual SEO files
php artisan seo:multilingual

# Generate only multilingual sitemaps
php artisan sitemap:multilingual

# Generate simple sitemap
php artisan sitemap:generate

# Generate robots.txt
php artisan robots:generate
```

### 3. Sitemap Structure

```
public/sitemaps/
├── sitemap-index-multilingual.xml      # Main index
├── sitemap-index-en.xml               # English index
├── sitemap-index-es.xml               # Spanish index
├── static-pages-en.xml                # English static pages
├── static-pages-es.xml                # Spanish static pages
├── jobs-en.xml                        # English jobs
├── jobs-es.xml                        # Spanish jobs
├── companies-en.xml                   # English companies
├── companies-es.xml                   # Spanish companies
├── categories-en.xml                  # English categories
└── categories-es.xml                  # Spanish categories
```

## Adding New Languages

### 1. Update Configuration

Add the new language to `config/languages.php`:

```php
'fr' => [
    'name' => 'French',
    'native_name' => 'Français',
    'flag' => '🇫🇷',
    'locale' => 'fr_FR',
    'fallback' => false,
    'rtl' => false,
],
```

### 2. Create Language Files

Create translation files in `lang/fr/`:

```php
// lang/fr/jobs.php
return [
    'title' => 'Emplois',
    'search' => 'Rechercher',
    'filter' => 'Filtrer',
];
```

### 3. Update Frontend

Add the new language to the language switcher component.

## Best Practices

### 1. SEO

- Always use proper hreflang tags
- Maintain consistent URL structure across languages
- Use canonical URLs to prevent duplicate content issues
- Submit sitemaps to Google Search Console for each language

### 2. Content

- Translate all user-facing content
- Consider cultural differences in date/number formatting
- Use appropriate currency symbols for each region
- Ensure proper character encoding for special characters

### 3. Performance

- Generate sitemaps during off-peak hours
- Use CDN for static assets
- Implement proper caching strategies
- Monitor page load times for each language

## Monitoring

### Google Search Console

1. **Submit Sitemaps**: Submit the multilingual sitemap index
2. **Monitor Indexing**: Check indexing status for each language
3. **Review Performance**: Analyze search performance by language
4. **Fix Issues**: Address any crawl errors or indexing problems

### Analytics

Track user behavior by language:
- Page views per language
- User engagement metrics
- Conversion rates by locale
- Popular content by language

## Troubleshooting

### Common Issues

1. **Language Not Switching**: Check middleware registration and session handling
2. **SEO Issues**: Verify hreflang tags and canonical URLs
3. **Performance**: Monitor sitemap generation times and file sizes
4. **Caching**: Ensure proper cache invalidation when switching languages

### Debug Commands

```bash
# Check current locale
php artisan tinker
>>> app()->getLocale()

# Test language detection
php artisan route:list --path=es

# Verify sitemap generation
php artisan sitemap:multilingual --verbose
```

## Future Enhancements

- **RTL Support**: Add support for right-to-left languages
- **Regional Variants**: Support for regional language variants (en-US, en-GB)
- **Auto-translation**: Integration with translation services
- **Language-specific Content**: Different content strategies per language
- **Advanced SEO**: Structured data and rich snippets per language

## Support

For questions or issues with the multilingual setup:

1. Check this documentation
2. Review the console commands output
3. Check the application logs
4. Verify configuration files
5. Test with different browsers and locales

---

**Note**: This multilingual setup is designed to be scalable and maintainable. Follow the established patterns when adding new features or languages.
