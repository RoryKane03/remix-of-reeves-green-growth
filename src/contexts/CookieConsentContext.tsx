
import { CONSENT_KEY, EVIDENCE_KEY, readChoice, recordChoice, resolveRegion, consentRequired } from '@/utils/trackingConsent';
import { initializeTracking, updateGoogleConsent } from '@/utils/marketingTracking';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CookieConsentContextType {
  showBanner: boolean;
  cookieConsent: 'accepted' | 'rejected' | null;
  acceptCookies: () => void;
  rejectCookies: () => void;
  resetConsent: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
};

interface CookieConsentProviderProps {
  children: ReactNode;
}

export const CookieConsentProvider: React.FC<CookieConsentProviderProps> = ({ children }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [cookieConsent, setCookieConsent] = useState<'accepted' | 'rejected' | null>(null);

  useEffect(() => {
    let active = true;
    const sync = async () => {
      const region = await resolveRegion();
      if (!active) return;
      const choice = readChoice();
      setCookieConsent(choice);
      setShowBanner(choice === null && consentRequired(region));
      await initializeTracking();
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === CONSENT_KEY || event.key === EVIDENCE_KEY) {
        updateGoogleConsent(false);
        if (readChoice() !== 'accepted' && document.querySelector('script[data-google-ads]')) {
          window.location.reload();
          return;
        }
        void sync();
      }
    };
    void sync();
    window.addEventListener('storage', onStorage);
    return () => { active = false; window.removeEventListener('storage', onStorage); };
  }, []);

  const choose = async (choice: 'accepted' | 'rejected') => {
    recordChoice(choice, await resolveRegion());
    setCookieConsent(choice);
    setShowBanner(false);
    updateGoogleConsent(choice === 'accepted');
    window.fbq?.('consent', choice === 'accepted' ? 'grant' : 'revoke');
    if (choice === 'rejected' && document.querySelector('script[data-google-ads]')) {
      window.location.reload();
      return;
    }
    if (choice === 'accepted') void initializeTracking();
  };
  const acceptCookies = () => { void choose('accepted'); };
  const rejectCookies = () => { void choose('rejected'); };
  // Opening settings does not withdraw or erase the current permission.
  const resetConsent = () => { setShowBanner(true); };

  return (
    <CookieConsentContext.Provider
      value={{
        showBanner,
        cookieConsent,
        acceptCookies,
        rejectCookies,
        resetConsent,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};
