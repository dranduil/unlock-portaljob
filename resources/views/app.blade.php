<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        {{-- Google Meta Tags --}}
        <meta name="description" content="Find your dream job on Unlock Portal Job - International job portal with transparent listings, ATS-friendly CVs, and global opportunities.">
        <meta name="keywords" content="jobs, careers, employment, international jobs, remote work, CV builder, ATS-friendly, job search">
        <meta name="author" content="Unlock Portal Job">
        <meta name="robots" content="index, follow">
        
        {{-- Open Graph Meta Tags --}}
        <meta property="og:title" content="Unlock Portal Job – International Job Portal">
        <meta property="og:description" content="Find your dream job with transparent listings, ATS-friendly CVs, and global opportunities.">
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:site_name" content="Unlock Portal Job">
        
        {{-- Twitter Card Meta Tags --}}
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="Unlock Portal Job – International Job Portal">
        <meta name="twitter:description" content="Find your dream job with transparent listings, ATS-friendly CVs, and global opportunities.">
        
        {{-- Google Analytics 4 (GA4) - Replace GA_MEASUREMENT_ID with your actual GA4 ID --}}
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
        </script>
        
        {{-- Google Tag Manager (GTM) - Alternative implementation - Replace GTM-XXXXXXX with your actual GTM ID --}}
        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
        <!-- End Google Tag Manager -->

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        {{-- Google Tag Manager (noscript) - Replace GTM-XXXXXXX with your actual GTM ID --}}
        <!-- Google Tag Manager (noscript) -->
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <!-- End Google Tag Manager (noscript) -->
        
        @inertia
    </body>
</html>
