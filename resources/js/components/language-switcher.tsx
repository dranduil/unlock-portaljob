import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { usePage } from '@inertiajs/react';

interface Language {
    code: string;
    name: string;
    native_name: string;
    flag: string;
}

interface LanguageSwitcherProps {
    currentLocale?: string;
    supportedLocales?: Language[];
}

export function LanguageSwitcher({ currentLocale = 'en', supportedLocales = [] }: LanguageSwitcherProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { url } = usePage();

    // Default supported languages if none provided
    const languages = supportedLocales.length > 0 ? supportedLocales : [
        { code: 'en', name: 'English', native_name: 'English', flag: '🇺🇸' },
        { code: 'es', name: 'Spanish', native_name: 'Español', flag: '🇪🇸' },
    ];

    const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

    const switchLanguage = (localeCode: string) => {
        if (localeCode === currentLocale) return;

        // Get current path without locale prefix
        let path = url;
        
        // Remove locale prefix if present
        const pathSegments = path.split('/');
        if (pathSegments.length > 1 && ['en', 'es'].includes(pathSegments[1])) {
            pathSegments.splice(1, 1);
            path = pathSegments.join('/');
        }

        // Add new locale prefix (except for default language 'en')
        if (localeCode !== 'en') {
            path = `/${localeCode}${path}`;
        }

        // Navigate to new URL
        window.location.href = path;
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 px-3 py-2 h-auto"
                >
                    <span className="text-lg">{currentLanguage.flag}</span>
                    <span className="hidden sm:inline text-sm font-medium">
                        {currentLanguage.native_name}
                    </span>
                    <Globe className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                {languages.map((language) => (
                    <DropdownMenuItem
                        key={language.code}
                        onClick={() => switchLanguage(language.code)}
                        className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${
                            language.code === currentLocale
                                ? 'bg-accent text-accent-foreground'
                                : 'hover:bg-accent hover:text-accent-foreground'
                        }`}
                    >
                        <span className="text-lg">{language.flag}</span>
                        <div className="flex flex-col">
                            <span className="font-medium">{language.native_name}</span>
                            {language.code !== 'en' && (
                                <span className="text-xs text-muted-foreground">
                                    {language.name}
                                </span>
                            )}
                        </div>
                        {language.code === currentLocale && (
                            <span className="ml-auto text-xs text-muted-foreground">
                                Current
                            </span>
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
