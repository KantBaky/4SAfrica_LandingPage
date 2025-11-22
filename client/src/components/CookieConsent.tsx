import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';

interface VisitorData {
  timestamp: string;
  url: string;
  referrer: string;
  userAgent: string;
  language: string;
  timezone: string;
  screenResolution: string;
  platform: string;
  email?: string;
  phone?: string;
  ipInfo?: {
    ip: string;
    country?: string;
    city?: string;
  };
}

async function getVisitorData(): Promise<VisitorData> {
  // Collect browser/device information
  const data: VisitorData = {
    timestamp: new Date().toISOString(),
    url: window.location.href,
    referrer: document.referrer || 'direct',
    userAgent: navigator.userAgent,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    platform: navigator.platform,
  };

  // Try to get IP information from a public API
  try {
    const ipResponse = await fetch('https://ipapi.co/json/');
    if (ipResponse.ok) {
      const ipData = await ipResponse.json();
      data.ipInfo = {
        ip: ipData.ip,
        country: ipData.country_name,
        city: ipData.city,
      };
    }
  } catch (error) {
    console.log('Could not fetch IP info:', error);
  }

  return data;
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
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
    setIsSubmitting(true);
    try {
      const visitorData = await getVisitorData();
      
      const response = await fetch('/api/collect-visitor-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visitorData),
      });

      if (response.ok) {
        localStorage.setItem('cookieConsent', 'true');
        setSubmitted(true);
        setTimeout(() => setIsVisible(false), 2000);
      }
    } catch (error) {
      console.error('Error collecting visitor data:', error);
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
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleAccept}
                  disabled={isSubmitting}
                  className="flex-1 bg-primary hover:bg-primary/90"
                  data-testid="button-accept-cookies"
                >
                  {isSubmitting ? 'Processing...' : t('cookies.accept')}
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
