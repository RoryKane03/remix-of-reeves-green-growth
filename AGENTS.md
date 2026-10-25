# Architecture rules
- Keep client-only createRoot rendering; prerender failures must remain non-fatal.
- Centralize third-party measurement behind the existing cookie choices; do not load a second tag manager installation.
- Retain the existing Google codeless quote action: a one-use receipt after successful submission permits a full navigation to /thank-you; direct visits and reloads return to /contact before measurement loads. Do not add a second explicit conversion event to that URL rule.
- Attribution is optional, consent-gated JSON on quotes; tracking failures must never prevent an enquiry, and click identifiers alone do not prove campaign attribution.