# Add drone photo to Our Work – Tree Work gallery

Add the uploaded aerial photo (crane/chipper site clearance of a large pine beside industrial units) to the Tree Work category of the Our Work gallery.

## Steps
1. Copy the upload to `public/lovable-uploads/tree-work-aerial-pine-yard.jpg` so it serves correctly on Netlify (same pattern as the other working gallery images).
2. Add a new entry at the top of the tree-work list in `src/components/gallery/ImageGallery.tsx` with id 2025, the local path, and descriptive SEO alt text.

## Notes
No CDN asset pointer is used — past uploads via CDN failed to render on Netlify, so local `public/lovable-uploads/` is the reliable route.
