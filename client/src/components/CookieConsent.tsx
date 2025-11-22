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
  const [collected, setCollected] = useState(false);

  useEffect(() => {
    // Check if already declined
    const declined = localStorage.getItem('cookieConsentDeclined');
    if (declined) {
      setIsVisible(false);
      return;
    }

    // Auto-collect visitor data
    const collectData = async () => {
      try {
        const visitorData = await getVisitorData();
        const response = await fetch('/api/collect-visitor-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(visitorData),
        });

        if (response.ok) {
          localStorage.setItem('cookieConsentDeclined', 'false');
          setCollected(true);
          setTimeout(() => setIsVisible(false), 2000);
        }
      } catch (error) {
        console.error('Error collecting visitor data:', error);
      }
    };

    collectData();
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm">
      <Card className="shadow-2xl border-primary/20">
        <div className="p-5 space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-primary">We Value Your Privacy</h3>
            <button
              onClick={() => {
                localStorage.setItem('cookieConsentDeclined', 'true');
                setIsVisible(false);
              }}
              className="text-muted-foreground hover:text-foreground"
              data-testid="button-close-cookie"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {collected ? (
              <>
                <p className="text-sm text-muted-foreground">
                  We collect visitor information to stay connected with you.
                </p>
                <p className="text-xs text-green-600 font-medium">
                  ✓ Thank you! Your information has been saved.
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                We're collecting your information to help us better serve you and stay connected about updates and opportunities.
              </p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
