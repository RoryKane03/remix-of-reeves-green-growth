## Goal

Track every click on `mailto:` links the same way phone clicks are already tracked, and add a small stats tile to the Admin dashboard showing phone + email click totals over the last 7 and 30 days.

## What we'll build

### 1. Email click tracking

Mirror the existing phone tracking pattern.

- New file `src/utils/emailTracking.ts` exporting:
  - `trackEmailClick(email)` — fires GA4 `email_click` event, Meta Pixel `Contact` event, and inserts a row into a new `email_clicks` table (fire-and-forget).
  - `handleEmailClick(email)` — calls `trackEmailClick`, then opens `mailto:` after a 150 ms buffer (same pattern as `handlePhoneClick`).
- Wire `handleEmailClick` into every `mailto:` link:
  - `src/components/Footer.tsx` — `info@reevestreesurgeons.co.uk`
  - `src/pages/Contact.tsx` — any mailto links
  - Any other page with a mailto (I'll grep to make sure none are missed).
- Google Ads conversion is skipped for now (no label yet), matching the current phone setup.

### 2. Backend — `email_clicks` table

New table mirroring `phone_clicks`:

- Columns: `id`, `email_address`, `page_path`, `user_agent`, `created_at`.
- RLS: anyone (anon + authenticated) can INSERT; only admins can SELECT.
- GRANTs: INSERT to anon + authenticated; SELECT to authenticated; ALL to service_role.

### 3. Admin dashboard tile

Add a "Click Tracking" card to `src/pages/Admin.tsx` (or `src/pages/admin/Analytics.tsx` if that fits better — I'll pick whichever the current admin layout uses).

Shows four numbers in a compact card:

```text
                Last 7 days   Last 30 days
Phone clicks        42            187
Email clicks         9             38
```

Data comes from simple `count` queries against `phone_clicks` and `email_clicks` filtered by `created_at`. Admin-only, uses existing `has_role` guard already in place on those pages.

## Out of scope (per your answers)

- Google Ads conversion label — the placeholder in `phoneTracking.ts` stays as-is.
- WhatsApp click tracking.
- Full time-series charts or per-page breakdowns (can be added later if you want).

## Technical notes

- The `email_clicks` insert is fire-and-forget inside a `try/catch` so a slow/failed DB write never blocks the mail client from opening.
- Storing the email address (not just a click count) lets us later distinguish, say, sales vs support inboxes if you add more.
- GA4 events will show up in Reports → Engagement → Events as `phone_call_click` and `email_click`. Meta will show them under the standard `Contact` event.
