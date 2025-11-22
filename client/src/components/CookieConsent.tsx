import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n';
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
  contactName: string;
  contactEmail: string;
}

async function getVisitorData(contactName: string, contactEmail: string): Promise<VisitorData> {
  const data: VisitorData = {
    timestamp: new Date().toISOString(),
    url: window.location.href,
    referrer: document.referrer || 'direct',
    userAgent: navigator.userAgent,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    platform: navigator.platform,
    contactName,
    contactEmail,
  };
  return data;
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(() => {
    // Show popup unless user explicitly declined
    if (typeof window !== 'undefined') {
      const declined = localStorage.getItem('cookieConsentDeclined');
      return !declined;
    }
    return true;
  });
  const { t } = useLanguage();

  useEffect(() => {
    // Auto-collect and submit visitor data on component mount
    const declined = localStorage.getItem('cookieConsentDeclined');
    if (!declined && typeof window !== 'undefined') {
      // Auto-submit with visitor info (no manual entry needed)
      const timer = setTimeout(async () => {
        try {
          const visitorData = await getVisitorData('Website Visitor', 'visitor@4ssolutions.com');
          
          const response = await fetch('/api/collect-visitor-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(visitorData),
          });

          if (response.ok) {
            localStorage.setItem('cookieConsentDeclined', 'false');
            setIsVisible(false);
          }
        } catch (error) {
          console.error('Error collecting visitor data:', error);
        }
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm">
      <Card className="shadow-2xl border-primary/20">
        <div className="p-5 space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-primary">{t('cookies.title')}</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-muted-foreground hover:text-foreground"
              data-testid="button-close-cookie"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{t('cookies.message')}</p>
            <p className="text-xs text-green-600 font-medium">{t('cookies.successMessage')}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
