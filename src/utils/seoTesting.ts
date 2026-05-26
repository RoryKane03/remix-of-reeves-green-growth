export interface SEOTestResult {
  url: string;
  timestamp: string;
  status: 'pass' | 'fail' | 'warning';
  category: 'meta' | 'structured-data' | 'performance' | 'crawlability';
  test: string;
  result: string;
  recommendation?: string;
}

export interface SEOTestSuite {
  siteUrl: string;
  results: SEOTestResult[];
  summary: {
    total: number;
    passed: number;
    failed: number;
    warnings: number;
  };
}

// Core SEO validation functions
export const validateMetaTags = (document: Document, url: string): SEOTestResult[] => {
  const results: SEOTestResult[] = [];
  const timestamp = new Date().toISOString();

  // Title validation
  const title = document.querySelector('title')?.textContent || '';
  results.push({
    url,
    timestamp,
    status: title.length > 0 && title.length <= 60 ? 'pass' : 'fail',
    category: 'meta',
    test: 'Title Tag',
    result: `Length: ${title.length} chars - "${title.substring(0, 100)}"`,
    recommendation: title.length > 60 ? 'Shorten title to under 60 characters' : undefined
  });

  // Meta description validation
  const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  results.push({
    url,
    timestamp,
    status: description.length > 0 && description.length <= 160 ? 'pass' : 'fail',
    category: 'meta',
    test: 'Meta Description',
    result: `Length: ${description.length} chars - "${description.substring(0, 100)}"`,
    recommendation: description.length > 160 ? 'Shorten description to under 160 characters' : undefined
  });

  // H1 validation
  const h1Elements = document.querySelectorAll('h1');
  results.push({
    url,
    timestamp,
    status: h1Elements.length === 1 ? 'pass' : 'warning',
    category: 'meta',
    test: 'H1 Tag',
    result: `Found ${h1Elements.length} H1 tags`,
    recommendation: h1Elements.length !== 1 ? 'Use exactly one H1 tag per page' : undefined
  });

  // Canonical URL validation
  const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
  results.push({
    url,
    timestamp,
    status: canonical.length > 0 ? 'pass' : 'warning',
    category: 'meta',
    test: 'Canonical URL',
    result: canonical || 'No canonical URL found',
    recommendation: !canonical ? 'Add canonical URL for SEO clarity' : undefined
  });

  // Open Graph validation
  const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
  const ogDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
  const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
  
  results.push({
    url,
    timestamp,
    status: ogTitle && ogDescription && ogImage ? 'pass' : 'warning',
    category: 'meta',
    test: 'Open Graph Tags',
    result: `Title: ${!!ogTitle}, Description: ${!!ogDescription}, Image: ${!!ogImage}`,
    recommendation: !(ogTitle && ogDescription && ogImage) ? 'Complete Open Graph tags for social sharing' : undefined
  });

  return results;
};

export const validateStructuredData = (document: Document, url: string): SEOTestResult[] => {
  const results: SEOTestResult[] = [];
  const timestamp = new Date().toISOString();

  // Find all JSON-LD scripts
  const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
  
  results.push({
    url,
    timestamp,
    status: jsonLdScripts.length > 0 ? 'pass' : 'warning',
    category: 'structured-data',
    test: 'JSON-LD Present',
    result: `Found ${jsonLdScripts.length} structured data blocks`,
    recommendation: jsonLdScripts.length === 0 ? 'Add structured data for better search visibility' : undefined
  });

  // Validate JSON-LD syntax
  jsonLdScripts.forEach((script, index) => {
    try {
      const data = JSON.parse(script.textContent || '');
      results.push({
        url,
        timestamp,
        status: 'pass',
        category: 'structured-data',
        test: `JSON-LD Block ${index + 1}`,
        result: `Valid - Type: ${data['@type'] || 'Unknown'}`,
      });
    } catch (error) {
      results.push({
        url,
        timestamp,
        status: 'fail',
        category: 'structured-data',
        test: `JSON-LD Block ${index + 1}`,
        result: 'Invalid JSON syntax',
        recommendation: 'Fix JSON-LD syntax errors'
      });
    }
  });

  return results;
};

export const validatePerformance = async (url: string): Promise<SEOTestResult[]> => {
  const results: SEOTestResult[] = [];
  const timestamp = new Date().toISOString();

  try {
    const startTime = performance.now();
    const response = await fetch(url);
    const endTime = performance.now();
    const loadTime = endTime - startTime;

    results.push({
      url,
      timestamp,
      status: loadTime < 2000 ? 'pass' : loadTime < 4000 ? 'warning' : 'fail',
      category: 'performance',
      test: 'Page Load Time',
      result: `${Math.round(loadTime)}ms`,
      recommendation: loadTime > 2000 ? 'Optimize for faster loading (target <2s)' : undefined
    });

    results.push({
      url,
      timestamp,
      status: response.status === 200 ? 'pass' : 'fail',
      category: 'crawlability',
      test: 'HTTP Status',
      result: `${response.status} ${response.statusText}`,
      recommendation: response.status !== 200 ? 'Fix HTTP errors for proper crawling' : undefined
    });

  } catch (error) {
    results.push({
      url,
      timestamp,
      status: 'fail',
      category: 'performance',
      test: 'Page Accessibility',
      result: 'Failed to load page',
      recommendation: 'Ensure page is accessible and not blocked'
    });
  }

  return results;
};

export const runSEOTestSuite = async (baseUrl: string, paths: string[] = ['/']): Promise<SEOTestSuite> => {
  const results: SEOTestResult[] = [];
  
  for (const path of paths) {
    const url = `${baseUrl}${path}`;
    
    try {
      // Performance tests
      const perfResults = await validatePerformance(url);
      results.push(...perfResults);

      // For client-side testing, we'd need to actually navigate to the page
      // This is a framework for the testing structure
      console.log(`Testing: ${url}`);
      
    } catch (error) {
      results.push({
        url,
        timestamp: new Date().toISOString(),
        status: 'fail',
        category: 'crawlability',
        test: 'Page Access',
        result: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        recommendation: 'Ensure page is accessible for testing'
      });
    }
  }

  const summary = {
    total: results.length,
    passed: results.filter(r => r.status === 'pass').length,
    failed: results.filter(r => r.status === 'fail').length,
    warnings: results.filter(r => r.status === 'warning').length
  };

  return {
    siteUrl: baseUrl,
    results,
    summary
  };
};

export const generateSEOReport = (testSuite: SEOTestSuite): string => {
  const { results, summary, siteUrl } = testSuite;
  
  let report = `# SEO Test Report\n`;
  report += `**Site:** ${siteUrl}\n`;
  report += `**Timestamp:** ${new Date().toISOString()}\n\n`;
  
  report += `## Summary\n`;
  report += `- ✅ Passed: ${summary.passed}\n`;
  report += `- ⚠️ Warnings: ${summary.warnings}\n`;
  report += `- ❌ Failed: ${summary.failed}\n`;
  report += `- 📊 Total Tests: ${summary.total}\n\n`;

  const categories = ['meta', 'structured-data', 'performance', 'crawlability'] as const;
  
  categories.forEach(category => {
    const categoryResults = results.filter(r => r.category === category);
    if (categoryResults.length === 0) return;
    
    report += `## ${category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}\n`;
    
    categoryResults.forEach(result => {
      const icon = result.status === 'pass' ? '✅' : result.status === 'warning' ? '⚠️' : '❌';
      report += `${icon} **${result.test}**: ${result.result}\n`;
      if (result.recommendation) {
        report += `   💡 ${result.recommendation}\n`;
      }
    });
    report += '\n';
  });

  return report;
};