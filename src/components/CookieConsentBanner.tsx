
import { CONSENT_NOTICE } from '@/utils/trackingConsent';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCookieConsent } from '@/contexts/CookieConsentContext';

const CookieConsentBanner = () => {
  const { showBanner, acceptCookies, rejectCookies } = useCookieConsent();
  const bannerRef = useRef<HTMLDivElement>(null);
  const acceptButtonRef = useRef<HTMLButtonElement>(null);
  const rejectButtonRef = useRef<HTMLButtonElement>(null);
  const privacyLinkRef = useRef<HTMLAnchorElement>(null);

  // Focus management and keyboard trap
  useEffect(() => {
    if (showBanner && acceptButtonRef.current) {
      acceptButtonRef.current.focus();
    }
  }, [showBanner]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      const focusableElements = [
        acceptButtonRef.current,
        rejectButtonRef.current,
        privacyLinkRef.current,
      ].filter(Boolean);

      const currentIndex = focusableElements.findIndex(
        el => el === document.activeElement
      );

      if (e.shiftKey) {
        // Shift+Tab (backwards)
        e.preventDefault();
        const prevIndex = currentIndex <= 0 ? focusableElements.length - 1 : currentIndex - 1;
        focusableElements[prevIndex]?.focus();
      } else {
        // Tab (forwards)
        e.preventDefault();
        const nextIndex = currentIndex >= focusableElements.length - 1 ? 0 : currentIndex + 1;
        focusableElements[nextIndex]?.focus();
      }
    }
  };

  if (!showBanner) return null;

  return (
    <div
      ref={bannerRef}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-[1200px]"
      onKeyDown={handleKeyDown}
    >
      <div className="bg-background rounded-lg shadow-lg border border-neutral-200 p-6">
        <div className="flex flex-col gap-4">
          {/* Cookie message */}
          <div className="text-center sm:text-left">
            <p className="text-foreground text-base sm:text-lg leading-relaxed">
              {CONSENT_NOTICE} 
              For more details, see our{' '}
              <Link 
                ref={privacyLinkRef}
                to="/privacy-policy" 
                className="text-primary hover:text-primary/80 underline font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                aria-label="Read our Privacy Policy"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          {/* Action buttons - Accept first, Reject second */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto sm:mx-0">
            <Button
              ref={acceptButtonRef}
              onClick={acceptCookies}
              className="w-full sm:flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Accept all cookies"
            >
              Accept Cookies
            </Button>
            <Button
              ref={rejectButtonRef}
              onClick={rejectCookies}
              variant="outline"
              className="w-full sm:flex-1 h-12 border border-border text-foreground hover:bg-[#EFF5F0] hover:text-foreground font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Reject non-essential cookies"
            >
              Reject Cookies
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
