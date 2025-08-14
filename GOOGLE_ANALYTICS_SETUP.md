# Google Analytics & Google Tag Manager Setup Guide

This guide explains how to configure Google Analytics 4 (GA4) and Google Tag Manager (GTM) for your Unlock Portal Job application.

## What's Been Added

The following Google tracking and SEO features have been integrated into your application:

### 1. Google Meta Tags & SEO
- **Description**: SEO-optimized meta description for job portal
- **Keywords**: Relevant keywords for job search and career services  
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Twitter sharing optimization
- **JSON-LD Structured Data**: Comprehensive schema markup for Google

### 2. Google Analytics 4 (GA4)
- Page view tracking
- User behavior analytics
- Custom event tracking capability
- Enhanced ecommerce tracking (configurable)

### 3. Google Tag Manager (GTM)
- Centralized tag management
- Easy addition of other tracking pixels
- Conversion tracking setup
- Remarketing capabilities

### 4. JSON-LD Structured Data
- **JobPosting Schema**: Individual job listings with salary, location, requirements
- **Organization Schema**: Company information and verification status
- **WebSite Schema**: Site navigation and search functionality
- **FAQ Schema**: Common questions for rich snippets
- **ItemList Schema**: Paginated job and company listings
- **Service Schema**: Platform services and capabilities

## Configuration

### Environment Variables

Add these variables to your `.env` file:

```env
# Google Analytics 4 (GA4) Measurement ID
GOOGLE_ANALYTICS_GA4_ID=G-XXXXXXXXXX

# Google Tag Manager (GTM) Container ID
GOOGLE_TAG_MANAGER_ID=GTM-XXXXXXX

# Enable/Disable tracking (true/false)
GOOGLE_ANALYTICS_ENABLED=true
GOOGLE_TAG_MANAGER_ENABLED=true

# Optional: Enable ecommerce tracking
GOOGLE_ANALYTICS_ECOMMERCE=false

# Optional: Enable user ID tracking
GOOGLE_ANALYTICS_USER_ID=false
```

### Configuration File

The tracking configuration is managed in `config/google-analytics.php`. You can modify this file to:

- Add custom dimensions and metrics
- Configure enhanced ecommerce tracking
- Set up user ID tracking
- Add conversion goals

## Getting Your Tracking IDs

### Google Analytics 4 (GA4)

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property or use existing one
3. Go to Admin → Data Streams → Web
4. Copy the Measurement ID (format: G-XXXXXXXXXX)

### Google Tag Manager (GTM)

1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Create a new account or use existing one
3. Create a new container for your website
4. Copy the Container ID (format: GTM-XXXXXXX)

## Implementation Details

### Files Modified

- `resources/views/app.blade.php` - Main layout with tracking code and meta tags
- `config/google-analytics.php` - Google Analytics configuration
- `config/seo.php` - SEO and structured data configuration
- `resources/js/pages/welcome.tsx` - Welcome page with comprehensive schema
- `resources/js/pages/jobs/index.tsx` - Jobs listing with JobPosting schema
- `resources/js/pages/jobs/show.tsx` - Individual job with detailed schema
- `resources/js/pages/companies/index.tsx` - Companies listing with Organization schema

### Tracking Code Location

The tracking code is automatically included in the `<head>` section of all pages and includes:

- GA4 tracking script
- GTM container script
- GTM noscript fallback (for users with JavaScript disabled)

### Conditional Loading

Tracking code only loads when:
- The respective service is enabled in configuration
- Valid tracking IDs are provided (not placeholder values)

## Testing

### Verify GA4 Installation

1. Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjdfjfloelgkbjbojkl) Chrome extension
2. Visit your website
3. Check browser console for GA4 events

### Verify GTM Installation

1. Install [Tag Assistant Legacy](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk) Chrome extension
2. Visit your website
3. Look for GTM container loading

## Custom Events

You can track custom events by adding this JavaScript to your pages:

```javascript
// Track job view
gtag('event', 'view_item', {
  'item_id': 'job_123',
  'item_name': 'Software Engineer',
  'item_category': 'Technology'
});

// Track application submission
gtag('event', 'begin_checkout', {
  'transaction_id': 'app_456',
  'value': 1.00,
  'currency': 'USD'
});
```

## Privacy & GDPR Compliance

### Cookie Consent

Consider implementing a cookie consent banner before loading tracking code:

```php
@if(session('cookie_consent'))
    {{-- Load tracking code here --}}
@endif
```

### Data Retention

Configure data retention settings in your GA4 property:
1. Admin → Property → Data Settings → Data Retention
2. Set retention period (2-14 months recommended)
3. Enable data deletion requests

## Troubleshooting

### Common Issues

1. **Tracking not working**: Check if IDs are correctly set in `.env`
2. **Duplicate tracking**: Ensure only one tracking method is enabled
3. **Ad blockers**: Test with ad blockers disabled
4. **Console errors**: Check browser console for JavaScript errors

### Debug Mode

Enable debug mode in GA4:
```javascript
gtag('config', 'GA_MEASUREMENT_ID', {
  'debug_mode': true
});
```

## Support

For additional help:
- [Google Analytics Help Center](https://support.google.com/analytics/)
- [Google Tag Manager Help Center](https://support.google.com/tagmanager/)
- [GA4 Implementation Guide](https://developers.google.com/analytics/devguides/collection/ga4)

## Next Steps

1. Set your actual tracking IDs in `.env`
2. Test tracking implementation
3. Set up conversion goals in GA4
4. Configure GTM triggers and tags
5. Set up remarketing audiences
6. Monitor data accuracy and performance
