import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const LANGUAGES = [
  {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    nativeName: 'English'
  },
  {
    code: 'ar',
    name: 'Arabic',
    flag: '🇸🇦',
    nativeName: 'العربية'
  },
  {
    code: 'de',
    name: 'German',
    flag: '🇩🇪',
    nativeName: 'Deutsch'
  },
  {
    code: 'es',
    name: 'Spanish',
    flag: '🇪🇸',
    nativeName: 'Español'
  }
];

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const currentLanguage = LANGUAGES.find(lang => lang.code === i18n.language) || LANGUAGES[0];

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative text-slate-600 hover:bg-slate-100 transition-all"
          aria-label="Select Language"
          title="Select Language"
        >
          <Languages className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-white shadow-lg border border-gray-200"
      >
        {LANGUAGES.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={cn(
              "flex items-center justify-between cursor-pointer px-3 py-2.5 hover:bg-slate-50 transition-colors",
              currentLanguage.code === language.code && "bg-slate-100"
            )}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{language.flag}</span>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-900">
                  {language.name}
                </span>
                <span className="text-xs text-slate-500">
                  {language.nativeName}
                </span>
              </div>
            </div>
            {currentLanguage.code === language.code && (
              <Check className="h-4 w-4 text-blue-600" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;

