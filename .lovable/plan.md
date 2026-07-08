## Why the images show as blank with text on the live site

Your published site is hosted on **Netlify** (see `netlify.toml`), not on Lovable's hosting.

When I added the 5 new hedge photos, I used the Lovable CDN system, which serves files from special URLs like `/__l5e/assets-v1/…/hedge-cutting-1574.jpg`. Those URLs only work on Lovable hosting — on Netlify they don't exist, so Netlify's SPA fallback returns your `index.html` page instead of the image. The browser tries to render that HTML as an image, which is why you see a blank tile with page text on it.

Every other image in your gallery uses `/lovable-uploads/…` (files inside the `public/` folder), which Netlify serves correctly. The fix is to do the same for these 5 images.

## Plan

1. Copy the 5 uploaded photos into `public/lovable-uploads/`:
   - `hedge-cutting-1574.jpg`
   - `hedge-cutting-1575.jpg`
   - `hedge-cutting-1576.jpg`
   - `hedge-cutting-1577.jpg`
   - `hedge-cutting-1578.jpg`
2. In `src/components/gallery/ImageGallery.tsx`:
   - Remove the 5 `import hedgeCutting15xx from '@/assets/hedge-cutting-15xx.jpg.asset.json'` lines.
   - Change each of the 5 gallery entries from `src: hedgeCutting15xx.url` to `src: "/lovable-uploads/hedge-cutting-15xx.jpg"`.
3. Delete the now-unused Lovable CDN pointers from `src/assets/`:
   - `hedge-cutting-1574.jpg.asset.json` … `hedge-cutting-1578.jpg.asset.json`
   (Uses `lovable-assets delete` so the CDN copies are cleaned up too.)
4. Verify the build compiles.

After you publish/redeploy on Netlify, the 5 hedge cutting photos will display correctly.
