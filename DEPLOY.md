# 🚀 Vercel Deployment Guide

## Quick Setup Steps

1. **Export from Lovable** to your GitHub repository
2. **Connect to Vercel** at [vercel.com](https://vercel.com)
3. **Configure build settings**:
   - Build Command: `npm run deploy:build`
   - Output Directory: `dist`
4. **Add environment variables**:
   ```
   VITE_SUPABASE_URL=https://zcvamcvgmrsawpxlchst.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=[your_key_here]
   ```
5. **Deploy** - Your site will have full SEO and prerendered HTML!

## What This Does

- ✅ Builds static assets with `vite build`
- ✅ Prerenders HTML files for all routes with `scripts/prerender.ts`
- ✅ Copies `sitemap.xml`, `robots.txt`, and `llms.txt` to site root
- ✅ Creates crawler-readable HTML (not just JavaScript)

## Verify Deployment

Test that Google can see your content:
```bash
curl -A "Googlebot" https://yoursite.com/
```

Should return full HTML content, not loading screen.

## Google Search Console

1. Add your domain to [Google Search Console](https://search.google.com/search-console/)
2. Submit sitemap: `https://yoursite.com/sitemap.xml`
3. Request indexing for key pages

**Done!** Your site is now optimized for Google indexing 🎉