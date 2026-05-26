import { useEffect, useState } from 'react';

export interface PerformanceMetrics {
  // Core Web Vitals
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  
  // Additional metrics
  fcp: number | null; // First Contentful Paint
  ttfb: number | null; // Time to First Byte
  domContentLoaded: number | null; // DOM Content Loaded
  windowLoad: number | null; // Window Load Complete
  
  // SEO-specific checks
  hasStructuredData: boolean;
  hasMetaDescription: boolean;
  hasCanonical: boolean;
}

export interface SEOPerformanceReport {
  url: string;
  timestamp: string;
  metrics: PerformanceMetrics;
  userAgent: string;
  isBot: boolean;
  score: number;
}

export const usePerformanceMonitoring = (enableReporting: boolean = false) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
    domContentLoaded: null,
    windowLoad: null,
    hasStructuredData: false,
    hasMetaDescription: false,
    hasCanonical: false
  });

  const [report, setReport] = useState<SEOPerformanceReport | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const measureMetrics = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');

      const newMetrics: Partial<PerformanceMetrics> = {};

      // Basic timing metrics
      if (navigation) {
        newMetrics.ttfb = navigation.responseStart - navigation.requestStart;
        newMetrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
        newMetrics.windowLoad = navigation.loadEventEnd - navigation.fetchStart;
      }

      // Paint metrics
      paint.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          newMetrics.fcp = entry.startTime;
        }
      });

      // SEO-specific checks
      newMetrics.hasStructuredData = checkStructuredData();
      newMetrics.hasMetaDescription = checkMetaDescription();
      newMetrics.hasCanonical = checkCanonical();

      setMetrics(prev => ({ ...prev, ...newMetrics }));
    };

    // Core Web Vitals measurement with proper observer types
    const measureCoreWebVitals = () => {
      if ('PerformanceObserver' in window) {
        try {
          // LCP measurement
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1] as any;
            const lcpValue = lastEntry.renderTime || lastEntry.loadTime;
            console.log('LCP detected:', lcpValue);
            setMetrics(prev => ({ ...prev, lcp: lcpValue }));
          });
          lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

          // CLS measurement
          let clsValue = 0;
          const clsObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value;
              }
            }
            console.log('CLS updated:', clsValue);
            setMetrics(prev => ({ ...prev, cls: clsValue }));
          });
          clsObserver.observe({ type: 'layout-shift', buffered: true });

          // FID measurement
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              const fidValue = entry.processingStart - entry.startTime;
              console.log('FID detected:', fidValue);
              setMetrics(prev => ({ ...prev, fid: fidValue }));
            });
          });
          try {
            fidObserver.observe({ type: 'first-input', buffered: true });
          } catch (e) {
            // FID not supported in this browser
            console.log('FID not supported');
          }
        } catch (error) {
          console.warn('Performance Observer not fully supported:', error);
        }
      }
    };

    // Monitor render performance
    const monitorRenderPerformance = () => {
      if ('PerformanceObserver' in window) {
        try {
          const longTaskObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              if (entry.duration > 50) {
                console.warn('Long task detected:', entry.duration + 'ms');
              }
            });
          });
          longTaskObserver.observe({ entryTypes: ['longtask'] });
        } catch (e) {
          // Longtask API not supported
        }
      }
    };

    // Run measurements
    measureMetrics();
    measureCoreWebVitals();
    monitorRenderPerformance();

    // Additional measurement after window load
    const handleLoad = () => {
      setTimeout(() => {
        measureMetrics();
        if (enableReporting) {
          generateReport();
        }
      }, 100);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, [enableReporting]);

  const checkStructuredData = (): boolean => {
    const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
    return jsonLdScripts.length > 0;
  };

  const checkMetaDescription = (): boolean => {
    const description = document.querySelector('meta[name="description"]')?.getAttribute('content');
    return !!(description && description.length > 0);
  };

  const checkCanonical = (): boolean => {
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
    return !!(canonical && canonical.length > 0);
  };

  const calculateScore = (metrics: PerformanceMetrics): number => {
    let score = 100;
    
    // Core Web Vitals scoring (heavily weighted for Google ranking)
    if (metrics.lcp && metrics.lcp > 4000) score -= 30;
    else if (metrics.lcp && metrics.lcp > 2500) score -= 15;
    
    if (metrics.fid && metrics.fid > 300) score -= 20;
    else if (metrics.fid && metrics.fid > 100) score -= 10;
    
    if (metrics.cls && metrics.cls > 0.25) score -= 25;
    else if (metrics.cls && metrics.cls > 0.1) score -= 10;
    
    // Performance timing scoring
    if (metrics.domContentLoaded && metrics.domContentLoaded > 3000) score -= 10;
    if (metrics.windowLoad && metrics.windowLoad > 5000) score -= 10;
    
    // TTFB is critical for SEO
    if (metrics.ttfb && metrics.ttfb > 800) score -= 15;
    else if (metrics.ttfb && metrics.ttfb > 600) score -= 8;
    
    // SEO checks (critical for ranking)
    if (!metrics.hasStructuredData) score -= 5;
    if (!metrics.hasMetaDescription) score -= 3;
    if (!metrics.hasCanonical) score -= 2;
    
    return Math.max(0, score);
  };

  const detectBot = (): boolean => {
    const userAgent = navigator.userAgent.toLowerCase();
    const botPatterns = [
      'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider',
      'yandexbot', 'facebookexternalhit', 'twitterbot', 'linkedinbot',
      'whatsapp', 'telegrambot', 'applebot', 'crawler', 'spider'
    ];
    
    return botPatterns.some(pattern => userAgent.includes(pattern));
  };

  const generateReport = (): SEOPerformanceReport => {
    const reportData: SEOPerformanceReport = {
      url: window.location.href,
      timestamp: new Date().toISOString(),
      metrics,
      userAgent: navigator.userAgent,
      isBot: detectBot(),
      score: calculateScore(metrics)
    };

    setReport(reportData);
    
    // Send to analytics if configured
    if (enableReporting && !detectBot()) {
      console.log('SEO Performance Report:', reportData);
      
      // Send to SEO analytics service
      if (typeof window !== 'undefined') {
        import('../utils/seoAnalytics').then(({ seoAnalytics }) => {
          seoAnalytics.trackPerformanceMetrics(reportData.metrics);
        });
      }
    }

    return reportData;
  };

  return {
    metrics,
    report,
    generateReport,
    calculateScore: () => calculateScore(metrics)
  };
};

export default usePerformanceMonitoring;