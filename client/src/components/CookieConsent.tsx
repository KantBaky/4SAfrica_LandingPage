import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = async () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        localStorage.setItem('cookieConsent', 'true');
        setSubmitted(true);
        setTimeout(() => setIsVisible(false), 2000);
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('Error subscribing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm">
      <Card className="shadow-2xl border-primary/20">
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-primary">{t('cookies.title')}</h3>
            <button
              onClick={handleDecline}
              className="text-muted-foreground hover:text-foreground"
              data-testid="button-close-cookie"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {submitted ? (
            <p className="text-sm text-green-600 font-medium">{t('cookies.successMessage')}</p>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">{t('cookies.message')}</p>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                data-testid="input-cookie-email"
                className="text-sm"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleAccept}
                  disabled={isSubmitting}
                  className="flex-1 bg-primary hover:bg-primary/90"
                  data-testid="button-accept-cookies"
                >
                  {isSubmitting ? 'Subscribing...' : t('cookies.accept')}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDecline}
                  disabled={isSubmitting}
                  data-testid="button-decline-cookies"
                >
                  {t('cookies.decline')}
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
