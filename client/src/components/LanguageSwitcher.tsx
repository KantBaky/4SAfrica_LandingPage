import { useLanguage, type Language } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en' as Language, flag: '🇬🇧', label: 'EN', fullLabel: 'English' },
    { code: 'fr' as Language, flag: '🇫🇷', label: 'FR', fullLabel: 'Français' },
  ];

  const current = languages.find(l => l.code === language);

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        data-testid="button-language-switcher"
        className="flex items-center gap-1.5"
      >
        <span className="text-lg">{current?.flag}</span>
        <span className="text-xs font-bold">{current?.label}</span>
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 min-w-[160px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-sm text-left flex items-center gap-3 transition-colors ${
                language === lang.code
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'hover:bg-muted'
              }`}
              data-testid={`button-language-${lang.code}`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span>{lang.fullLabel}</span>
              {language === lang.code && <span className="ml-auto text-primary">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
