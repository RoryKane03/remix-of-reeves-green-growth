export const CONSENT_KEY = 'rts_cookie_consent';
export const EVIDENCE_KEY = 'rts_consent_evidence';
export const NOTICE_VERSION = '2026-10-25-v1';
export const CONSENT_NOTICE = 'Optional cookies share page visits, device information and quote completions with Google (Ads and Analytics) and Meta to measure advertising, optimize ads and understand website use. Advertising click IDs and campaign source are saved with your enquiry. Accept or reject optional cookies; change your choice in Cookie Settings.';
export type Choice = 'accepted' | 'rejected' | null;
export type ConsentEvidence = { visitorId: string; choice: Exclude<Choice, null>; at: string; noticeVersion: string; notice: string; region: string; previousAcceptance?: { at: string; noticeVersion: string; notice: string } };
let regionPromise: Promise<string> | undefined;
export function readEvidence(): ConsentEvidence | null {
  try { return JSON.parse(localStorage.getItem(EVIDENCE_KEY) || 'null'); } catch { return null; }
}
export function readChoice(): Choice {
  const evidence = readEvidence();
  // Legacy acceptance did not disclose advertising: ask again, but preserve refusals.
  if (localStorage.getItem(CONSENT_KEY) === 'rejected') return 'rejected';
  return evidence?.noticeVersion === NOTICE_VERSION ? evidence.choice : null;
}
export function resolveRegion(): Promise<string> {
  return regionPromise ??= (async () => {
    try {
      const response = await fetch('/cdn-cgi/trace', { signal: AbortSignal.timeout(2000) });
      if (!response.ok) return 'unknown';
      return (await response.text()).match(/^loc=([A-Z0-9]{2})$/m)?.[1] || 'unknown';
    } catch { return 'unknown'; }
  })();
}
export const consentRequired = (region: string) => ['unknown','XX','T1','AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB','CH','CA'].includes(region);
export function permissionFor(choice: Choice, region: string): boolean {
  return choice === 'accepted' || (choice === null && !consentRequired(region));
}
export async function canTrackAds(): Promise<boolean> {
  const region = await resolveRegion();
  return permissionFor(readChoice(), region) && navigator.globalPrivacyControl !== true;
}
export function recordChoice(choice: Exclude<Choice, null>, region: string) {
  const previous = readEvidence();
  const evidence: ConsentEvidence = {
    visitorId: previous?.visitorId || crypto.randomUUID(), choice, region,
    at: new Date().toISOString(), noticeVersion: NOTICE_VERSION, notice: CONSENT_NOTICE,
    previousAcceptance: previous?.choice === 'accepted'
      ? { at: previous.at, noticeVersion: previous.noticeVersion, notice: previous.notice }
      : previous?.previousAcceptance,
  };
  localStorage.setItem(EVIDENCE_KEY, JSON.stringify(evidence));
  localStorage.setItem(CONSENT_KEY, choice);
  return evidence;
}
declare global { interface Navigator { globalPrivacyControl?: boolean } }