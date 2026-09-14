# Redesign the homepage hero

## Scope
- Change only the existing homepage hero and the homepage image preload.
- Keep the header, navigation, utility bar, client logo strip, and every later section unchanged.
- Keep the current drone photograph and ARB Approved badge.

## Implementation
- Replace the hero copy with the exact supplied kicker, headline, supporting text, buttons, and badge caption.
- Apply the supplied desktop and mobile gradients, spacing, type scale, button styles, focus states, and badge placement.
- Use the existing design-system button component and semantic hero-specific tokens for the supplied brand colours.
- Simplify the existing hero code by removing unused video, scrolling, and old badge logic.
- Generate local 400, 800, 1200, and 2000 pixel WebP versions of the existing drone photo, retain its JPEG fallback, and update the existing image preload.
- Add the single staggered entrance sequence and disable it for reduced-motion users.

## Verification
- Confirm the homepage still has one H1 and that both links open the requested pages.
- Test desktop plus 360px, 390px, and 430px widths for image framing, text/button fit, no horizontal overflow, and above-fold access at 390×844.
- Confirm the ARB caption contrast and visible keyboard focus.
