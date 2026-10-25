const RECEIPT_KEY = 'rts_quote_receipt';
export function finishQuoteSubmission(quoteId: string, trackingAllowed: boolean) {
  try {
    sessionStorage.setItem(RECEIPT_KEY, JSON.stringify({ quoteId, trackingAllowed, createdAt: Date.now() }));
    // Full page navigation makes the existing Google page-load rule reliable.
    window.location.assign('/thank-you');
  } catch {
    // Tracking/storage problems never block the saved enquiry confirmation.
    window.location.assign('/thank-you?confirmation=untracked');
  }
}