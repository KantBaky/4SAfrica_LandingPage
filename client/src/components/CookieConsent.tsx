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
  contactName: string;
  contactEmail: string;
}

async function getVisitorData(contactName: string, contactEmail: string): Promise<VisitorData> {
  // Collect browser/device information (NO IP)
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    // Check if user has explicitly declined
    const declined = localStorage.getItem('cookieConsentDeclined');
    if (declined) {
      setIsVisible(false);
    }
  }, []);

  const handleAccept = async () => {
    // Validate email
    if (!contactEmail || !contactEmail.includes('@')) {
      alert(t('cookies.emailPlaceholder'));
      return;
    }

    setIsSubmitting(true);
    try {
      const visitorData = await getVisitorData(contactName, contactEmail);
      
      const response = await fetch('/api/collect-visitor-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visitorData),
      });

      if (response.ok) {
        localStorage.setItem('cookieConsentDeclined', 'false');
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
    localStorage.setItem('cookieConsentDeclined', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm">
      <Card className="shadow-2xl border-primary/20">
        <div className="p-5 space-y-4">
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
            <div className="space-y-2">
              <p className="text-sm text-green-600 font-medium">{t('cookies.successMessage')}</p>
              <p className="text-xs text-muted-foreground">
                Thanks for connecting with us! We'll reach out to {contactEmail} soon.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">{t('cookies.message')}</p>
              
              {/* Contact Form */}
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder={t('cookies.namePlaceholder')}
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  disabled={isSubmitting}
                />
                <input
                  type="email"
                  placeholder={t('cookies.emailPlaceholder')}
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleAccept}
                  disabled={isSubmitting || !contactEmail}
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
