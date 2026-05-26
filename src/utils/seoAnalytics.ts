/**
 * SEO Analytics and Tracking Utilities
 */

interface SEOEvent {
  event: string;
  page: string;
  timestamp: number;
  userAgent: string;
  referrer: string;
  searchQuery?: string;
  coreWebVitals?: {
    lcp?: number;
    fid?: number;
    cls?: number;
  };
}

interface SEOAnalytics {
  trackPageView: (page: string) => void;
  trackSearchQuery: (query: string) => void;
  trackPerformanceMetrics: (metrics: any) => void;
  trackUserEngagement: (action: string, element?: string) => void;
}

class SEOAnalyticsService implements SEOAnalytics {
  private isDevelopment: boolean;
  
  constructor() {
    this.isDevelopment = import.meta.env.DEV || false;
  }

  private createEvent(event: string, additionalData: any = {}): SEOEvent {
    return {
      event,
      page: window.location.pathname,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      ...additionalData
    };
  }

  private sendEvent(eventData: SEOEvent) {
    // In development, just log to console
    if (this.isDevelopment) {
      console.log('🔍 SEO Analytics:', eventData);
      return;
    }

    // In production, you could send to your analytics service
    // Example integrations:
    
    // Google Analytics 4
    if (typeof window !== 'undefined' && typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', eventData.event, {
        page_path: eventData.page,
        custom_map: { 
          seo_timestamp: eventData.timestamp,
          user_agent: eventData.userAgent
        }
      });
    }

    // Google Tag Manager
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'seo_tracking',
        eventCategory: 'SEO',
        eventAction: eventData.event,
        eventLabel: eventData.page,
        customParameters: eventData
      });
    }
  }

  trackPageView(page: string) {
    const eventData = this.createEvent('page_view', { page });
    this.sendEvent(eventData);

    // Track SEO-specific page data
    this.trackSEOPageData();
  }

  trackSearchQuery(query: string) {
    const eventData = this.createEvent('search_query', { searchQuery: query });
    this.sendEvent(eventData);
  }

  trackPerformanceMetrics(metrics: any) {
    const eventData = this.createEvent('performance_metrics', {
      coreWebVitals: {
        lcp: metrics.lcp,
        fid: metrics.fid,
        cls: metrics.cls
      },
      performanceScore: metrics.score || 0
    });
    this.sendEvent(eventData);
  }

  trackUserEngagement(action: string, element?: string) {
    const eventData = this.createEvent('user_engagement', {
      action,
      element,
      engagementTime: performance.now()
    });
    this.sendEvent(eventData);
  }

  private trackSEOPageData() {
    // Track important SEO elements
    const title = document.title;
    const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
    const structuredData = document.querySelectorAll('script[type="application/ld+json"]').length;

    const seoData = this.createEvent('seo_audit', {
      title: title?.length || 0,
      description: metaDescription?.length || 0,
      hasCanonical: !!canonical,
      structuredDataCount: structuredData,
      h1Count: document.querySelectorAll('h1').length
    });

    this.sendEvent(seoData);
  }

  // Track search engine crawlers
  trackBotVisit() {
    const userAgent = navigator.userAgent.toLowerCase();
    const botPatterns = [
      'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider',
      'yandexbot', 'facebookexternalhit', 'twitterbot', 'linkedinbot'
    ];
    
    const detectedBot = botPatterns.find(pattern => userAgent.includes(pattern));
    
    if (detectedBot) {
      const eventData = this.createEvent('bot_visit', {
        botType: detectedBot,
        crawlTime: new Date().toISOString()
      });
      this.sendEvent(eventData);
    }
  }
}

// Create singleton instance
export const seoAnalytics = new SEOAnalyticsService();

// Auto-track bot visits on page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    seoAnalytics.trackBotVisit();
  });
}

export default seoAnalytics;