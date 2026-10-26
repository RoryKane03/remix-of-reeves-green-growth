/**
 * Resized, WebP/AVIF versions of our own photos via Netlify Image CDN.
 *
 * Netlify resizes each photo the first time it's requested and caches the result,
 * so a 2–3 MB original is served as a ~50–150 KB image at the size actually shown.
 *
 * Only switched on for builds that run on Netlify (NETLIFY=true at build time).
 * In the Lovable editor preview and local dev the original files are used, so
 * nothing breaks there. The flag is fixed at build time, so the prerendered HTML
 * and the browser always agree.
 */
declare const __NETLIFY_IMAGES__: boolean;

const enabled = typeof __NETLIFY_IMAGES__ !== 'undefined' && __NETLIFY_IMAGES__;

const canTransform = (src: string) =>
  enabled && src.startsWith('/') && !/\.(svg|gif)$/i.test(src);

/** One resized copy of a site image, `width` pixels wide. */
export function cdnImage(src: string, width: number, quality = 72): string {
  if (!canTransform(src)) return src;
  return `/.netlify/images?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}

/** One resized copy of a logo or badge, `height` pixels tall (width follows). */
export function cdnImageByHeight(src: string, height: number, quality = 80): string {
  if (!canTransform(src)) return src;
  return `/.netlify/images?url=${encodeURIComponent(src)}&h=${height}&q=${quality}`;
}

/** A srcSet so each device downloads only the size it needs. */
export function cdnSrcSet(src: string, widths: number[] = [480, 800, 1200]): string | undefined {
  if (!canTransform(src)) return undefined;
  return widths.map((w) => `${cdnImage(src, w)} ${w}w`).join(', ');
}
