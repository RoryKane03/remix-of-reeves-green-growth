## Why Netlify is stuck

A 5+ minute "building" with no failure log almost always means the build process is hanging (not erroring). Combined with the recent Cloud reconnect, the most likely causes — in order — are:

1. **Pending DB migration not approved** → `src/integrations/supabase/types.ts` is still empty → `tsc` errors on `quotes`, `user_roles`, `quote_files`, `log_security_event` references. (This would normally fail fast, but if Netlify's TS step is set to be non-blocking the build moves on to step 2.)
2. **Prerender step hanging** → this project has an SSR `prerender.js` (per project memory it must be non-fatal). If it tries to reach the old Supabase URL at build time, network calls can hang for minutes before timing out.
3. **Missing env vars on Netlify** → `.env` is git-ignored. After Cloud was re-enabled, the new `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` / `VITE_SUPABASE_PROJECT_ID` live only in the Lovable sandbox. Netlify still has the old values (or none), so any build-time fetch points at the dead project and hangs/fails.

## Plan

1. **Approve the database migration** I submitted earlier (adds `quotes`, `quote_files`, `user_roles`, `security_events`, `quote-photos` bucket, `has_role` + `log_security_event` functions). This regenerates `types.ts` and clears the TS errors.
2. **Verify locally**: run `tsc --noEmit` + `vite build` in the sandbox and confirm both succeed without hanging.
3. **Inspect `prerender.js`** for any Supabase calls or network requests during build; if found, guard them with a short timeout and `try/catch` so a dead endpoint can't stall Netlify.
4. **Update Netlify env vars**: give you the three values to paste into Netlify → Site settings → Environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_PROJECT_ID`
5. **Cancel the stuck Netlify build** and trigger a fresh deploy.
6. If it still hangs, pull the Netlify deploy log tail and iterate from real signal rather than guesses.

## What I need from you

- Click **Approve** on the pending migration (chat will show an "Approve migration" button on my earlier message).
- After the next failed/finished Netlify deploy, paste the last ~40 lines of the Netlify build log so I can confirm root cause vs. guess.

## Out of scope for this pass

- Redesigning UI, fixing the unrelated Carousel error in console, changing hosting away from Netlify, or touching the edge function code (already redeployed and working).