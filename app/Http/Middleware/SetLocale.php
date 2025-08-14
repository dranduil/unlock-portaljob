<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $locale = $this->detectLocale($request);
        
        // Set the application locale
        App::setLocale($locale);
        
        // Store the locale in session for future requests
        Session::put('locale', $locale);
        
        // Add locale to the request for easy access
        $request->attributes->set('locale', $locale);
        
        return $next($request);
    }

    /**
     * Detect the appropriate locale for the request
     */
    private function detectLocale(Request $request): string
    {
        $supportedLocales = array_keys(config('languages.supported', []));
        $defaultLocale = config('languages.default', 'en');

        // 1. Check URL prefix (e.g., /en/jobs)
        if (config('languages.url_structure') === 'prefix') {
            $pathSegments = explode('/', trim($request->path(), '/'));
            $firstSegment = $pathSegments[0] ?? null;
            
            if (in_array($firstSegment, $supportedLocales)) {
                return $firstSegment;
            }
        }

        // 2. Check session
        if (Session::has('locale')) {
            $sessionLocale = Session::get('locale');
            if (in_array($sessionLocale, $supportedLocales)) {
                return $sessionLocale;
            }
        }

        // 3. Check browser preferences
        $browserLocale = $this->getBrowserLocale();
        if (in_array($browserLocale, $supportedLocales)) {
            return $browserLocale;
        }

        // 4. Check if browser locale has a fallback (e.g., es-ES -> es)
        $browserLocaleBase = substr($browserLocale, 0, 2);
        if (in_array($browserLocaleBase, $supportedLocales)) {
            return $browserLocaleBase;
        }

        // 5. Return default locale
        return $defaultLocale;
    }

    /**
     * Get the user's preferred locale from browser headers
     */
    private function getBrowserLocale(): string
    {
        $acceptLanguage = request()->header('Accept-Language');
        
        if (!$acceptLanguage) {
            return config('languages.default', 'en');
        }

        // Parse Accept-Language header
        $languages = [];
        foreach (explode(',', $acceptLanguage) as $lang) {
            $parts = explode(';', $lang);
            $locale = trim($parts[0]);
            $quality = 1.0;
            
            if (isset($parts[1])) {
                $q = explode('=', $parts[1]);
                if (count($q) === 2 && $q[0] === 'q') {
                    $quality = (float) $q[1];
                }
            }
            
            $languages[$locale] = $quality;
        }

        // Sort by quality (highest first)
        arsort($languages);
        
        // Return the highest quality supported locale
        foreach (array_keys($languages) as $locale) {
            $baseLocale = substr($locale, 0, 2);
            if (in_array($baseLocale, array_keys(config('languages.supported', [])))) {
                return $baseLocale;
            }
        }

        return config('languages.default', 'en');
    }
}
