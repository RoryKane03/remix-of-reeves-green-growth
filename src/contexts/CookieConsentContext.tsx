
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
    const savedConsent = localStorage.getItem('rts_cookie_consent');
    if (savedConsent === 'accepted' || savedConsent === 'rejected') {
      setCookieConsent(savedConsent as 'accepted' | 'rejected');
      setShowBanner(false);
    } else {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('rts_cookie_consent', 'accepted');
    setCookieConsent('accepted');
    setShowBanner(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('rts_cookie_consent', 'rejected');
    setCookieConsent('rejected');
    setShowBanner(false);
  };

  const resetConsent = () => {
    localStorage.removeItem('rts_cookie_consent');
    setCookieConsent(null);
    setShowBanner(true);
  };

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
