# Quote tracking
- [x] Consolidate tags and honor recorded cookie choices.
- [x] Count only a successfully saved quote, using the existing Google page rule without an extra conversion event.
- [x] Save consent-permitted attribution alongside quotes.
- [x] Test quote flow, refusal, direct visits and reloads. Labelled test saved; notification email suppressed. No Google quote event observed on localhost, where the live-host URL rule does not match.
- [x] Verify deployed Netlify version: live labelled quote saved with consent and test attribution; notification blocked in test browser; direct visits and reloads redirect to /contact.
- [ ] Verify Google receipt: live Google script returned 200, but no measurement or expected-label conversion request was observed after acceptance and successful submission. Investigate the array-based gtag queue before declaring tracking complete. Campaign settings unchanged; test is not an ad-attributed customer result.