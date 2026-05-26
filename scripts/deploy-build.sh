#!/bin/bash

# Optimized deployment build script
echo "🚀 Building for deployment with SEO optimization..."

# Step 1: Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist

# Step 2: Run Vite build (client bundle)
echo "📦 Building client bundle..."
vite build

# Step 3: Generate static HTML for all routes with proper SSR
echo "🕷️ Generating static HTML for all routes with SSR..."
npm run build:prerender || { echo "❌ Prerendering failed!"; exit 1; }

# Step 4: Copy SEO files and routing configuration
echo "📄 Copying SEO files and routing configuration..."
cp public/robots.txt dist/robots.txt 2>/dev/null || echo "robots.txt not found, skipping"
cp public/sitemap.xml dist/sitemap.xml 2>/dev/null || echo "sitemap.xml not found, skipping"
cp public/llms.txt dist/llms.txt 2>/dev/null || echo "llms.txt not found, skipping"
cp public/_redirects dist/_redirects 2>/dev/null || echo "_redirects not found, skipping"

echo "✅ Deployment build complete!"
echo ""
echo "📋 Ready to deploy:"
echo "   - Upload dist/ folder to your hosting provider"
echo "   - Or commit and push for automatic deployment"
echo ""
echo "🔍 Your site now has:"
echo "   ✅ Prerendered HTML for all pages"
echo "   ✅ SEO meta tags in HTML source"
echo "   ✅ Optimized static assets"
echo "   ✅ Sitemap and robots.txt"