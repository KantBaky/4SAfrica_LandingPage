import { useState, useEffect } from 'react';
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

async function getVisitorData(): Promise<VisitorData> {
  return {
    timestamp: new Date().toISOString(),
    url: typeof window !== 'undefined' ? window.location.href : '',
    referrer: typeof window !== 'undefined' ? document.referrer || 'direct' : '',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    language: typeof navigator !== 'undefined' ? navigator.language : 'en',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screenResolution: typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : '',
    platform: typeof navigator !== 'undefined' ? navigator.platform : '',
    contactName: 'Website Visitor',
    contactEmail: 'visitor@4ssolutions.com',
  };
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if user already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (consent) {
      setIsVisible(false);
    }
  }, []);

  const handleAccept = async () => {
    setIsSubmitting(true);
    try {
      // Automatically collect visitor data - no manual input needed
      const visitorData = await getVisitorData();
      const response = await fetch('/api/collect-visitor-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visitorData),
      });

      if (response.ok) {
        localStorage.setItem('cookieConsent', 'accepted');
        setIsVisible(false);
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
        <div className="p-5 space-y-4">
          <h3 className="font-semibold text-primary">We Value Your Privacy</h3>
          <p className="text-sm text-muted-foreground">
            We collect visitor information to stay connected about updates and opportunities with 4S. No manual input needed—we automatically gather your information.
          </p>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleAccept}
              disabled={isSubmitting}
              className="flex-1 px-3 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              data-testid="button-accept-cookies"
            >
              {isSubmitting ? 'Processing...' : 'Accept Cookies'}
            </button>
            <button
              onClick={handleDecline}
              disabled={isSubmitting}
              className="flex-1 px-3 py-2 border border-border hover:bg-muted rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              data-testid="button-decline-cookies"
            >
              Decline
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
