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

  useEffect(() => {
    // Check if user already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (consent) {
      setIsVisible(false);
    }
  }, []);

  const handleAccept = async () => {
    try {
      // Automatically collect visitor data - no manual input needed
      const visitorData = await getVisitorData();
      await fetch('/api/collect-visitor-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visitorData),
      });

      localStorage.setItem('cookieConsent', 'accepted');
      setIsVisible(false);
    } catch (error) {
      console.error('Error collecting visitor data:', error);
      localStorage.setItem('cookieConsent', 'accepted');
      setIsVisible(false);
    }
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 w-80 bg-white dark:bg-slate-900 border border-border rounded-lg shadow-lg p-4">
      <h3 className="font-semibold text-primary mb-2">Cookie Consent</h3>
      <p className="text-sm text-muted-foreground mb-4">
        We collect visitor information to stay connected about updates and opportunities with 4S.
      </p>

      <div className="flex gap-2">
        <button
          onClick={handleAccept}
          className="flex-1 px-3 py-2 bg-green-700 hover:bg-green-800 text-white rounded text-sm font-medium"
          data-testid="button-accept-cookies"
        >
          Accept Cookies
        </button>
        <button
          onClick={handleDecline}
          className="flex-1 px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded text-sm font-medium"
          data-testid="button-decline-cookies"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
