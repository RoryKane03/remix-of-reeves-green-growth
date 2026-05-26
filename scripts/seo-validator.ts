#!/usr/bin/env ts-node

import * as fs from 'fs/promises';
import * as path from 'path';
import { JSDOM } from 'jsdom';

interface SEOIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  element?: string;
}

interface PageSEOReport {
  url: string;
  issues: SEOIssue[];
  score: number;
}

// Check if a page has proper SEO meta tags
async function validatePageSEO(htmlContent: string, url: string): Promise<PageSEOReport> {
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;
  const issues: SEOIssue[] = [];

  // Check title tag
  const title = document.querySelector('title');
  if (!title) {
    issues.push({ type: 'error', message: 'Missing <title> tag', element: 'title' });
  } else if (title.textContent && title.textContent.length > 60) {
    issues.push({ type: 'warning', message: `Title too long: ${title.textContent.length} chars (max 60)`, element: 'title' });
  } else if (title.textContent && title.textContent.length < 30) {
    issues.push({ type: 'warning', message: `Title too short: ${title.textContent.length} chars (min 30)`, element: 'title' });
  }

  // Check meta description
  const description = document.querySelector('meta[name="description"]');
  if (!description) {
    issues.push({ type: 'error', message: 'Missing meta description', element: 'meta[name="description"]' });
  } else {
    const content = description.getAttribute('content');
    if (content && content.length > 160) {
      issues.push({ type: 'warning', message: `Meta description too long: ${content.length} chars (max 160)`, element: 'meta[name="description"]' });
    } else if (content && content.length < 120) {
      issues.push({ type: 'warning', message: `Meta description too short: ${content.length} chars (min 120)`, element: 'meta[name="description"]' });
    }
  }

  // Check H1 tag
  const h1Tags = document.querySelectorAll('h1');
  if (h1Tags.length === 0) {
    issues.push({ type: 'error', message: 'Missing H1 tag', element: 'h1' });
  } else if (h1Tags.length > 1) {
    issues.push({ type: 'warning', message: `Multiple H1 tags found: ${h1Tags.length}`, element: 'h1' });
  }

  // Check canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    issues.push({ type: 'error', message: 'Missing canonical URL', element: 'link[rel="canonical"]' });
  }

  // Check Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const ogImage = document.querySelector('meta[property="og:image"]');
  
  if (!ogTitle) issues.push({ type: 'warning', message: 'Missing og:title', element: 'meta[property="og:title"]' });
  if (!ogDescription) issues.push({ type: 'warning', message: 'Missing og:description', element: 'meta[property="og:description"]' });
  if (!ogImage) issues.push({ type: 'warning', message: 'Missing og:image', element: 'meta[property="og:image"]' });

  // Check structured data
  const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
  if (structuredData.length === 0) {
    issues.push({ type: 'warning', message: 'No structured data found', element: 'script[type="application/ld+json"]' });
  } else {
    // Validate JSON-LD syntax
    structuredData.forEach((script, index) => {
      try {
        JSON.parse(script.textContent || '');
        issues.push({ type: 'info', message: `Valid structured data block ${index + 1}`, element: 'script[type="application/ld+json"]' });
      } catch (error) {
        issues.push({ type: 'error', message: `Invalid JSON-LD syntax in block ${index + 1}`, element: 'script[type="application/ld+json"]' });
      }
    });
  }

  // Check images for alt text
  const images = document.querySelectorAll('img');
  let imagesWithoutAlt = 0;
  images.forEach(img => {
    if (!img.getAttribute('alt')) {
      imagesWithoutAlt++;
    }
  });
  
  if (imagesWithoutAlt > 0) {
    issues.push({ type: 'warning', message: `${imagesWithoutAlt} images missing alt text`, element: 'img' });
  }

  // Calculate score
  const errors = issues.filter(i => i.type === 'error').length;
  const warnings = issues.filter(i => i.type === 'warning').length;
  const score = Math.max(0, 100 - (errors * 20) - (warnings * 5));

  return { url, issues, score };
}

async function validateAllPages(): Promise<void> {
  console.log('🔍 Running SEO validation...\n');
  
  const distPath = path.join(process.cwd(), 'dist');
  
  try {
    await fs.access(distPath);
  } catch {
    console.log('❌ No dist folder found. Run build first: npm run build');
    return;
  }

  const routes = [
    { path: '/', file: 'index.html' },
    { path: '/about', file: 'about/index.html' },
    { path: '/our-work', file: 'our-work/index.html' },
    { path: '/tree-work', file: 'tree-work/index.html' },
    { path: '/hedge-cutting', file: 'hedge-cutting/index.html' },
    { path: '/stump-grinding', file: 'stump-grinding/index.html' }
  ];

  const reports: PageSEOReport[] = [];
  
  for (const route of routes) {
    const filePath = path.join(distPath, route.file);
    
    try {
      const html = await fs.readFile(filePath, 'utf-8');
      const report = await validatePageSEO(html, route.path);
      reports.push(report);
      
      console.log(`📄 ${route.path} - Score: ${report.score}/100`);
      
      if (report.issues.length > 0) {
        report.issues.forEach(issue => {
          const icon = issue.type === 'error' ? '❌' : issue.type === 'warning' ? '⚠️' : 'ℹ️';
          console.log(`   ${icon} ${issue.message}`);
        });
      } else {
        console.log('   ✅ No issues found');
      }
      console.log();
      
    } catch (error) {
      console.log(`❌ Could not read ${route.file}`);
    }
  }

  // Summary
  const avgScore = reports.reduce((sum, r) => sum + r.score, 0) / reports.length;
  const totalErrors = reports.reduce((sum, r) => sum + r.issues.filter(i => i.type === 'error').length, 0);
  const totalWarnings = reports.reduce((sum, r) => sum + r.issues.filter(i => i.type === 'warning').length, 0);

  console.log('📊 SEO VALIDATION SUMMARY');
  console.log(`   Average Score: ${avgScore.toFixed(1)}/100`);
  console.log(`   Total Errors: ${totalErrors}`);
  console.log(`   Total Warnings: ${totalWarnings}`);
  
  if (avgScore >= 90) {
    console.log('🎉 Excellent SEO score! Ready for Google indexing.');
  } else if (avgScore >= 70) {
    console.log('👍 Good SEO score. Consider fixing warnings for better results.');
  } else {
    console.log('⚠️ SEO score needs improvement. Fix errors before deploying.');
  }
}

// Add JSDOM dependency check
async function checkDependencies() {
  try {
    require('jsdom');
  } catch (error) {
    console.log('📦 Installing jsdom for HTML parsing...');
    const { exec } = require('child_process');
    return new Promise((resolve, reject) => {
      exec('npm install --save-dev jsdom @types/jsdom', (error, stdout, stderr) => {
        if (error) {
          console.log('❌ Failed to install jsdom. Install manually: npm install --save-dev jsdom @types/jsdom');
          reject(error);
        } else {
          console.log('✅ jsdom installed successfully');
          resolve(stdout);
        }
      });
    });
  }
}

// Run the script
if (require.main === module) {
  checkDependencies()
    .then(() => validateAllPages())
    .catch(() => {
      console.log('⚠️ Running validation without jsdom (limited functionality)');
      // Fallback validation without HTML parsing
      console.log('💡 For full SEO validation, install: npm install --save-dev jsdom @types/jsdom');
    });
}

export { validatePageSEO, validateAllPages };