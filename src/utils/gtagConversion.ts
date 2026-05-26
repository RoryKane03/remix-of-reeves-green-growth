/**
 * Fire a Google Ads conversion event.
 * Replace the CONVERSION_LABEL placeholder once you have a label from Google Ads.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const GOOGLE_ADS_ID = 'AW-17942512211';
// TODO: Replace with your actual conversion label from Google Ads
const CONVERSION_LABEL = '';

export function trackQuoteConversion() {
  if (typeof window.gtag !== 'function') {
    console.warn('[gtag] gtag not available — conversion not tracked');
    return;
  }

  const sendTo = CONVERSION_LABEL
    ? `${GOOGLE_ADS_ID}/${CONVERSION_LABEL}`
    : GOOGLE_ADS_ID;

  window.gtag('event', 'conversion', {
    send_to: sendTo,
    value: 1.0,
    currency: 'GBP',
  });

  console.log('[gtag] Conversion event fired:', sendTo);
}
