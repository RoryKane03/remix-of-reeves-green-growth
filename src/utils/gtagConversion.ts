/** The existing Google WEBPAGE_CODELESS action counts a guarded /thank-you load.
 * Never send an additional conversion event for that same action.
 */
export {};
declare global {
  interface Window { gtag?: (...args: unknown[]) => void; }
}
