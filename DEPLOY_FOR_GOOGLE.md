# 🚀 Quick Deploy Guide for Google Indexing

## Run This to Build for Google:

```bash
# Option 1: Use the build script (recommended)
chmod +x scripts/build-with-prerender.sh
./scripts/build-with-prerender.sh

# Option 2: Manual steps
npm run build
node scripts/prerender.ts
```

## What This Creates:

Your `dist/` folder will now contain:
- ✅ `index.html` - Homepage with full content (not just JavaScript)
- ✅ `our-work.html` - Gallery page  
- ✅ `about.html` - About page
- ✅ `privacy-policy.html` - Privacy policy
- ✅ All service pages as static HTML files
- ✅ `sitemap.xml` - For Google Search Console
- ✅ `robots.txt` - Crawler instructions
- ✅ `llms.txt` - AI crawler information

## Deploy This:

1. **Upload** the entire `dist/` folder to your web host
2. **Submit sitemap** to Google Search Console: `https://yoursite.com/sitemap.xml`
3. **Test** with Google's URL Inspection tool

## Verify It's Working:

```bash
curl -A "Googlebot" https://yoursite.com/
```
Should return full HTML content, not just a loading screen.

**That's it!** Google will now be able to read and index your site properly. 🎉