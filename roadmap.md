# Quote tracking
- [x] Consolidate tags and honor recorded cookie choices.
- [x] Count only a successfully saved quote, using the existing Google page rule without an extra conversion event.
- [x] Save consent-permitted attribution alongside quotes.
- [x] Test quote flow, refusal, direct visits and reloads. Labelled test saved; notification email suppressed. No Google quote event observed on localhost, where the live-host URL rule does not match.
- [x] Verify deployed Netlify version: live labelled quote saved with consent and test attribution; notification blocked in test browser; direct visits and reloads redirect to /contact.
- [x] Verify Google receipt on live site: real sponsored-click test quote (26 Oct 11:52) saved with genuine gclid, google.com referrer and accepted consent. Website side confirmed end to end.
- [ ] Confirm Google Ads reports the 26 Oct test conversion under Campaign 2 (reporting lags 3-9 hours; check 27 Oct).