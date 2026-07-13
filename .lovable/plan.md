## Goal
A private admin-only page that shows how many times people clicked "Call" buttons on the website, updating every time you open/refresh it. Also includes quick links to Google Analytics and Meta Events Manager for deeper analysis.

## What you'll get

- New page at `/admin/analytics`
- Only visible to you (must be signed in with the admin role you already have)
- Non-admins get redirected away; logged-out users get sent to sign-in
- No public link — it's hidden from the site navigation

### Metrics shown
- Total call clicks — **Today**, **Last 7 days**, **Last 30 days**, **All-time**
- "Last updated" timestamp + Refresh button
- Small links out to Google Analytics 4 and Meta Events Manager

## How the data gets there

1. New table `phone_clicks` in the backend (page URL, timestamp, optional user-agent).
2. Every existing call/phone button already runs `trackPhoneCall()` — I'll extend that helper so it also writes a row to `phone_clicks` in parallel with the GA / Google Ads / Meta pixel events. No button code changes.
3. The dashboard reads counts from that table on every visit — always fresh.

## Access rules
- `phone_clicks` insert: allowed for anyone (including logged-out visitors) so clicks are captured.
- `phone_clicks` read: admin role only.

## Technical details
- Migration: create `public.phone_clicks (id, page_path, user_agent, created_at)`, GRANTs, RLS, policies (`INSERT` to anon+authenticated, `SELECT` via `has_role(auth.uid(),'admin')`).
- Update `src/utils/phoneTracking.ts` to `supabase.from('phone_clicks').insert(...)` (fire-and-forget, never blocks the dial).
- New route `/admin/analytics` in `src/App.tsx` → `src/pages/admin/Analytics.tsx`.
- Guard: check session + `user_roles` for `admin`; redirect otherwise.
- Queries: 4 `count` queries with `created_at >=` filters for today / 7d / 30d / all-time, run on mount + on Refresh click.
- Styled with existing forest/gold brand tokens; no changes to public site UI.

## Out of scope (can add later if wanted)
- Clicks-per-page breakdown, time-series chart, recent clicks feed
- Form submissions or other event tracking
