import { canTrackAds, readChoice, readEvidence, resolveRegion } from './trackingConsent';
export const ADS_ID = 'AW-17942512211';
export const ANALYTICS_ID = 'G-XDQDP2VTBG';
const ATTRIBUTION_KEY = 'rts_landing_attribution';
declare global {
  interface Window { dataLayer: unknown[]; __quoteConfirmed?: boolean; __quoteTrackingAllowed?: boolean; fbq?: (...args: unknown[]) => void; }
}
export function updateGoogleConsent(allowed: boolean) {
  window.dataLayer ||= [];
  window.gtag ||= function (...args: unknown[]) { window.dataLayer.push(args); };
  window.gtag('consent', 'update', { ad_storage: allowed ? 'granted' : 'denied', ad_user_data: 'denied', ad_personalization: allowed ? 'granted' : 'denied', analytics_storage: allowed ? 'granted' : 'denied' });
  if (!allowed) {
    window.gtag('set', 'user_data', null);
    sessionStorage.removeItem(ATTRIBUTION_KEY);
  }
}
export async function initializeTracking() {
  if (location.pathname.replace(/\/$/, '') === '/thank-you' && (!window.__quoteConfirmed || !window.__quoteTrackingAllowed)) return;
  const allowed = await canTrackAds();
  updateGoogleConsent(allowed);
  if (!allowed) return;
  captureAttribution();
  if (!document.querySelector('script[data-google-ads]')) {
    window.gtag?.('set', 'developer_id.dZjgwMW', true);
    window.gtag?.('js', new Date());
    window.gtag?.('config', ANALYTICS_ID, { allow_google_signals: false });
    window.gtag?.('config', ADS_ID, { allow_enhanced_conversions: false });
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`;
    script.async = true; script.dataset.googleAds = '';
    document.head.appendChild(script);
  }
  if (!document.querySelector('script[data-meta-pixel]')) {
    const queue: unknown[][] = [];
    const pixel = (...args: unknown[]) => {
      const fn = pixel as typeof pixel & { callMethod?: (...args: unknown[]) => void };
      if (fn.callMethod) fn.callMethod(...args); else queue.push(args);
    };
    Object.assign(pixel, { queue, push: pixel, loaded: true, version: '2.0' });
    window.fbq = pixel;
    Object.assign(window, { _fbq: pixel });
    pixel('init', '1305046474735858'); pixel('track', 'PageView');
    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    script.async = true; script.dataset.metaPixel = '';
    document.head.appendChild(script);
  }
}
function captureAttribution() {
  const url = new URL(location.href);
  const gclid = url.searchParams.get('gclid');
  const source = url.searchParams.get('utm_source');
  if (sessionStorage.getItem(ATTRIBUTION_KEY) && !gclid && !source) return;
  const safeCampaign = (key: string) => {
    const value = url.searchParams.get(key);
    return value && /^[a-zA-Z0-9 _.-]{1,100}$/.test(value) ? value : null;
  };
  let referrerHost: string | null = null;
  try { referrerHost = document.referrer ? new URL(document.referrer).hostname : null; } catch { /* omit invalid referrer */ }
  sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify({
    gclid: gclid && /^[a-zA-Z0-9_-]{1,256}$/.test(gclid) ? gclid : null,
    utm_source: safeCampaign('utm_source'), utm_medium: safeCampaign('utm_medium'),
    utm_campaign: safeCampaign('utm_campaign'), referrer_host: referrerHost,
    landing_path: location.pathname, captured_at: new Date().toISOString(),
  }));
}
export async function quoteTrackingMetadata() {
  const allowed = await canTrackAds();
  if (allowed) captureAttribution();
  let attribution = null;
  try { attribution = allowed ? JSON.parse(sessionStorage.getItem(ATTRIBUTION_KEY) || 'null') : null; } catch { /* optional */ }
  return { marketing_attribution: attribution, tracking_consent: {
    tracking_allowed: allowed, choice: readChoice(), region: await resolveRegion(),
    evidence: JSON.parse(JSON.stringify(readEvidence())), recorded_at: new Date().toISOString(),
  } };
}