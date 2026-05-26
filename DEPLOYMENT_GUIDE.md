# 🚀 Deployment Guide - Optimized Setup

## Quick Deploy Commands

### For Vercel/Netlify (Recommended)
```bash
# Production build with prerendering
npm run build:production

# Full build with SEO validation (local testing)
npm run build:full
```

### Build Options
- `npm run build:production` - Fast build with prerendering (for deployment)
- `npm run build:full` - Complete build with sitemap updates & SEO validation
- `npm run build` - Basic Vite build (no prerendering)

## Vercel Deployment

1. **Export from Lovable** to your GitHub repository
2. **Connect to Vercel** and set:
   - Build Command: `npm run build:production`
   - Output Directory: `dist`
   - Environment Variables:
     ```
     VITE_SUPABASE_URL=https://zcvamcvgmrsawpxlchst.supabase.co
     VITE_SUPABASE_PUBLISHABLE_KEY=your_key_here
     ```

3. **Deploy** - Your site will have:
   - ✅ Server-side rendered HTML for all pages
   - ✅ Full SEO meta tags in HTML source
   - ✅ Static sitemap.xml and robots.txt
   - ✅ Optimized images and assets

## Netlify Deployment

1. **Export from Lovable** to your GitHub repository
2. **Connect to Netlify** and set:
   - Build Command: `npm run build:production`
   - Publish Directory: `dist`
   - Environment Variables: (same as Vercel)

## Verify Deployment

After deployment, test your SEO:

```bash
# Check HTML content (should show full page, not loading screen)
curl -A "Googlebot" https://yoursite.com/

# Verify sitemap
curl https://yoursite.com/sitemap.xml

# Check robots.txt
curl https://yoursite.com/robots.txt
```

## Google Search Console Setup

1. Add your domain to [Google Search Console](https://search.google.com/search-console/)
2. Submit sitemap: `https://yoursite.com/sitemap.xml`
3. Test pages with URL Inspection tool
4. Request indexing for key pages

## Performance Optimization

Your current setup includes:
- ✅ Prerendered static HTML files
- ✅ Optimized bundle chunking
- ✅ Image lazy loading
- ✅ Critical CSS inlined
- ✅ Service worker for caching

**Result**: Your site will rank well and load fast! 🎉