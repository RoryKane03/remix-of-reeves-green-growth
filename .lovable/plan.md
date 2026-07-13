## Goal
Track every click on any "Call Us Now" / phone button so you can see which clicks turn into calls in your ad and analytics dashboards.

## What we will build
1. A single reusable helper `trackPhoneCall()` in `src/utils/phoneTracking.ts` that fires:
   - **Google Analytics 4** event `phone_call_click` (works immediately with the existing GA tag `G-XDQDP2VTBG`).
   - **Google Ads** conversion event for `AW-17942512211` (needs your conversion label).
   - **Meta Pixel** `Contact` event (needs your Pixel ID).
2. Replace every raw `tel:01527874143` click handler with the tracked wrapper.
3. Add the Meta Pixel base script to `index.html` so the `fbq()` function is available.

## Files to change
- `src/utils/phoneTracking.ts` — new tracking helper.
- `src/components/CTASection.tsx` — wrap "Call Us Now" button.
- `src/components/gallery/GalleryCTA.tsx` — wrap "Call Us Now" button.
- `src/components/FloatingChat.tsx` — wrap "Call Now" button.
- `src/components/Header.tsx` — wrap the top-bar phone number link.
- `index.html` — add Meta Pixel base code.

## What I need from you
Because you chose "All of the above", two extra IDs are required:

1. **Google Ads conversion label** for phone calls. You get this in Google Ads under:
   `Tools & Settings → Conversions → New conversion action → Website → Create and continue → Manually add code`
   It looks like a short string, e.g. `abc123xyz456`.
2. **Meta Pixel ID**. You get this from Meta Events Manager:
   `https://business.facebook.com/events_manager`
   It looks like `123456789012345`.

You can paste them here and I will store them securely via Lovable Secrets so they are not hard-coded in the repo. If you prefer, I can leave placeholder values in the code and you can update them later.

## How it will work
- When a visitor clicks any phone button, the helper first fires the tracking events, then navigates to `tel:01527874143`.
- A small `setTimeout` buffer gives the pixels time to dispatch before the browser leaves the page.
- In local development the helper will log to the console instead of sending real events.

## Out of scope
- We will not change the phone number, button styling, or page layout.
- We will not add backend storage for these events; they are sent directly to Google/Meta.