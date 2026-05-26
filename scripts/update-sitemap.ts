#!/usr/bin/env ts-node

import * as fs from 'fs/promises';
import * as path from 'path';

// Define your routes here - this should match the routes in your app
const routes = [
  '/',
  '/about',
  '/contact',
  '/our-work',
  '/privacy-policy',
  '/tree-work',
  '/hedge-cutting', 
  '/stump-grinding',
  '/domestic-services',
  '/commercial-services',
  '/commercial/tree-work',
  '/commercial/hedge-cutting',
  '/commercial/stump-grinding',
  '/services/commercial/site-clearance',
  '/locations/birmingham',
  '/locations/worcester',
  '/locations/warwick'
];

const baseUrl = 'https://www.reevestreesurgeons.co.uk';

async function generateSitemap(finalRoutes: string[]) {
  console.log('🗺️  Generating sitemap.xml...');
  
  const sitemapEntries = finalRoutes.map(route => {
    const url = route === '/' ? baseUrl : `${baseUrl}${route}`;
    const lastmod = new Date().toISOString().split('T')[0];
    
    // Strategic priority scoring
    let priority = '0.5';
    let changefreq = 'monthly';
    
    if (route === '/') {
      priority = '1.0';
      changefreq = 'weekly';
    } else if (['/domestic-services', '/commercial-services', '/contact'].includes(route)) {
      priority = '0.9';
      changefreq = 'weekly';
    } else if (route.startsWith('/locations/') || route === '/about') {
      priority = '0.8';
      changefreq = 'monthly';
    } else if (['/tree-work', '/hedge-cutting', '/stump-grinding', '/our-work'].includes(route)) {
      priority = '0.7';
      changefreq = 'monthly';
    } else if (route.startsWith('/commercial/') || route.includes('/site-clearance')) {
      priority = '0.6';
      changefreq = 'monthly';
    } else if (route === '/privacy-policy') {
      priority = '0.3';
      changefreq = 'yearly';
    }
    
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>`;

  await fs.writeFile('public/sitemap.xml', sitemap);
  console.log(`✅ Sitemap generated with ${finalRoutes.length} pages`);
}

// Auto-scan routes from App.tsx (optional enhancement)
async function scanRoutes(): Promise<string[]> {
  try {
    const appContent = await fs.readFile('src/App.tsx', 'utf-8');
    const routeMatches = appContent.match(/path="([^"]+)"/g) || [];
    const scannedRoutes = routeMatches
      .map(match => match.replace('path="', '').replace('"', ''))
      .filter(route => {
        // Exclude wildcards, params, admin routes, auth, and team pages
        return !route.includes('*') && 
               !route.includes(':') && 
               !route.startsWith('/admin') && 
               !route.startsWith('/auth') &&
               !route.includes('/team/');
      })
      .sort();
    
    console.log('📍 Scanned routes from App.tsx:', scannedRoutes);
    return scannedRoutes;
  } catch (error) {
    console.log('⚠️  Could not scan App.tsx, using manual route list');
    return routes;
  }
}

async function updateSitemap() {
  try {
    const finalRoutes = process.argv.includes('--scan') ? await scanRoutes() : routes;
    
    // Update the routes array in this file for future runs
    if (process.argv.includes('--scan')) {
      console.log('🔄 Using scanned routes for sitemap generation');
    }
    
    await generateSitemap(finalRoutes);
  } catch (error) {
    console.error('❌ Error updating sitemap:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  updateSitemap();
}

export { updateSitemap, routes };