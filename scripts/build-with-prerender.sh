#!/bin/bash

# Build script with prerendering for SEO
echo "🔨 Building site with prerendering for Google indexing..."

# Step 1: Update sitemap automatically
echo "🗺️  Updating sitemap.xml..."
npx ts-node scripts/update-sitemap.ts --scan

# Step 2: Run normal Vite build
echo "📦 Building static assets..."
npm run build

# Step 3: Run prerender script to generate static HTML
echo "🕷️ Generating prerendered HTML for crawlers..."
node scripts/prerender.ts

# Step 4: Copy additional SEO files
echo "📄 Copying SEO files..."
cp public/robots.txt dist/robots.txt
cp public/sitemap.xml dist/sitemap.xml
cp public/llms.txt dist/llms.txt

# Step 5: Run SEO validation
echo "🔍 Validating SEO compliance..."
npx ts-node scripts/seo-validator.ts

echo "✅ Build complete with prerendered HTML files!"
echo "🔍 Generated static HTML files for Google crawler access:"
echo "   - dist/index.html (homepage)"
echo "   - dist/our-work/index.html"
echo "   - dist/about/index.html"
echo "   - dist/privacy-policy/index.html"
echo "   - And all other pages..."
echo ""
echo "📋 Next steps:"
echo "1. Deploy the dist/ folder to your hosting"
echo "2. Submit your sitemap to Google Search Console: https://yoursite.com/sitemap.xml"
echo "3. Test with URL inspection tool in Search Console"