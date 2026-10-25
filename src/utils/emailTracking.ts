/**
 * Email click tracking.
 * Fires GA4 and Meta Pixel events, and logs to the email_clicks table,
 * whenever a visitor clicks a mailto link.
 */

import { supabase } from '@/integrations/supabase/client';
import { readChoice } from './trackingConsent';

const EMAIL_ADDRESS = 'info@reevestreesurgeons.co.uk';

export function trackEmailClick(email: string = EMAIL_ADDRESS) {
  const isDev = import.meta.env.DEV;

  if (isDev) {
    console.log('[Email Tracking] Email click tracked:', email);
  }

  // GA4 custom event
  if (readChoice() === 'accepted' && typeof window.gtag === 'function') {
    window.gtag('event', 'email_click', {
      event_category: 'engagement',
      event_label: typeof window !== 'undefined' ? window.location.pathname : '',
      value: 1,
      email_address: email,
    });
  }

  // Meta Pixel "Contact" event
  if (readChoice() === 'accepted' && typeof window.fbq === 'function') {
    window.fbq('track', 'Contact');
  }

  // Fire-and-forget DB log for the admin dashboard.
  try {
    void supabase.from('email_clicks').insert({
      email_address: email,
      page_path: typeof window !== 'undefined' ? window.location.pathname : null,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    });
  } catch (err) {
    if (isDev) console.warn('[Email Tracking] DB log failed', err);
  }
}

export function handleEmailClick(email: string = EMAIL_ADDRESS) {
  trackEmailClick(email);

  // Short buffer so pixels can dispatch before the mail client opens
  setTimeout(() => {
    window.location.href = `mailto:${email}`;
  }, 150);
}

export { EMAIL_ADDRESS };
