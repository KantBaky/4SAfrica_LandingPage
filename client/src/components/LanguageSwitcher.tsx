import { useLanguage, type Language } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={language === 'en' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setLanguage('en')}
        className={language === 'en' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}
        data-testid="button-language-en"
      >
        EN
      </Button>
      <Button
        variant={language === 'fr' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setLanguage('fr')}
        className={language === 'fr' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}
        data-testid="button-language-fr"
      >
        FR
      </Button>
    </div>
  );
}
