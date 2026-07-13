/**
 * Phone call click tracking.
 * Fires GA4, Google Ads and Meta Pixel events when a visitor clicks a call button.
 *
 * TODO: Replace the placeholder constants below with your real values:
 *  - GOOGLE_ADS_CALL_CONVERSION_LABEL: from Google Ads > Conversions > call conversion action
 *  - META_PIXEL_ID: from Meta Events Manager (https://business.facebook.com/events_manager)
 */

import { supabase } from '@/integrations/supabase/client';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}


const GOOGLE_ADS_ID = 'AW-17942512211';
const GOOGLE_ADS_CALL_CONVERSION_LABEL = 'YOUR_CONVERSION_LABEL_HERE';
const META_PIXEL_ID = '1305046474735858';

const PHONE_NUMBER = '01527874143';

export function trackPhoneCall(phoneNumber: string = PHONE_NUMBER) {
  const isDev = import.meta.env.DEV;

  if (isDev) {
    console.log('[Phone Tracking] Call click tracked:', phoneNumber);
  }

  // Google Analytics 4 custom event
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'phone_call_click', {
      event_category: 'engagement',
      event_label: window.location.pathname,
      value: 1,
      phone_number: phoneNumber,
    });
  }

  // Google Ads conversion event
  if (
    typeof window.gtag === 'function' &&
    GOOGLE_ADS_CALL_CONVERSION_LABEL &&
    GOOGLE_ADS_CALL_CONVERSION_LABEL !== 'YOUR_CONVERSION_LABEL_HERE'
  ) {
    window.gtag('event', 'conversion', {
      send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CALL_CONVERSION_LABEL}`,
      value: 1.0,
      currency: 'GBP',
    });
  }

  // Meta Pixel "Contact" event
  if (typeof window.fbq === 'function' && META_PIXEL_ID) {
    window.fbq('track', 'Contact');
  }
}

export function handlePhoneClick(phoneNumber: string = PHONE_NUMBER) {
  trackPhoneCall(phoneNumber);

  // Short buffer so pixels can dispatch before the dialer opens
  setTimeout(() => {
    window.location.href = `tel:${phoneNumber}`;
  }, 150);
}

export { PHONE_NUMBER };
