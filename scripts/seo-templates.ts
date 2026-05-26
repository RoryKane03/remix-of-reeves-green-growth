#!/usr/bin/env ts-node

// Structured Data Templates for common page types

export const templates = {
  // Local Business (for main pages)
  localBusiness: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Reeves Tree Surgeons",
    "description": "Professional tree surgeons serving West Midlands. NPTC certified arborists offering tree removal, hedge cutting, stump grinding and commercial tree services.",
    "url": "https://www.reevestreesurgeons.co.uk",
    "telephone": "+44-XXXX-XXXXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Birmingham",
      "addressRegion": "West Midlands",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "52.4862",
      "longitude": "-1.8904"
    },
    "openingHours": ["Mo-Fr 08:00-18:00", "Sa 08:00-16:00"],
    "priceRange": "££",
    "image": "https://www.reevestreesurgeons.co.uk/lovable-uploads/26fe9352-cca5-4102-aedb-6ba7f5c2de66.png",
    "sameAs": [
      "https://www.facebook.com/reevestreeservices",
      "https://www.instagram.com/reevestreeservices"
    ]
  },

  // Service template
  service: (serviceName: string, description: string, serviceUrl?: string) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": description,
    "url": serviceUrl ? `https://www.reevestreesurgeons.co.uk${serviceUrl}` : "https://www.reevestreesurgeons.co.uk",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Reeves Tree Surgeons",
      "url": "https://www.reevestreesurgeons.co.uk"
    },
    "areaServed": {
      "@type": "Place",
      "name": "West Midlands, UK"
    },
    "serviceType": "Tree Surgery",
    "category": "Tree Services"
  }),

  // FAQ template
  faq: (faqs: Array<{question: string, answer: string}>) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }),

  // Organization (for About page)
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Reeves Tree Surgeons",
    "url": "https://www.reevestreesurgeons.co.uk",
    "logo": "https://www.reevestreesurgeons.co.uk/lovable-uploads/26fe9352-cca5-4102-aedb-6ba7f5c2de66.png",
    "description": "Professional tree surgery services in the West Midlands. NPTC certified arborists with full insurance coverage.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Birmingham",
      "addressRegion": "West Midlands",
      "addressCountry": "GB"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+44-XXXX-XXXXXX",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://www.facebook.com/reevestreeservices",
      "https://www.instagram.com/reevestreeservices"
    ]
  },

  // ImageGallery (for Our Work page)
  imageGallery: (images: Array<{url: string, caption?: string}>) => ({
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Reeves Tree Surgeons - Our Work Gallery",
    "description": "Gallery showcasing professional tree surgery work by Reeves Tree Surgeons",
    "url": "https://www.reevestreesurgeons.co.uk/our-work",
    "image": images.map(img => ({
      "@type": "ImageObject",
      "url": img.url,
      "caption": img.caption || "Professional tree surgery work"
    }))
  })
};

// Generate page-specific structured data
export function generatePageStructuredData(pageType: string, customData?: any) {
  switch (pageType) {
    case 'homepage':
      return templates.localBusiness;
    
    case 'about':
      return templates.organization;
    
    case 'service':
      if (!customData?.serviceName) {
        throw new Error('Service name required for service page structured data');
      }
      return templates.service(
        customData.serviceName,
        customData.description || `Professional ${customData.serviceName} services in West Midlands`,
        customData.serviceUrl
      );
    
    case 'gallery':
      return templates.imageGallery(customData?.images || []);
    
    case 'faq':
      return templates.faq(customData?.faqs || []);
    
    default:
      return templates.localBusiness; // Fallback
  }
}

// CLI usage example
if (require.main === module) {
  console.log('📋 Available Structured Data Templates:');
  console.log('1. Local Business (homepage)');
  console.log('2. Service (service pages)');
  console.log('3. FAQ (pages with FAQs)');
  console.log('4. Organization (about page)');
  console.log('5. Image Gallery (portfolio/gallery pages)');
  
  const pageType = process.argv[2];
  if (pageType) {
    try {
      const structuredData = generatePageStructuredData(pageType);
      console.log(`\n📄 ${pageType.toUpperCase()} Structured Data:`);
      console.log(JSON.stringify(structuredData, null, 2));
    } catch (error) {
      console.log(`❌ Error generating structured data: ${error.message}`);
    }
  }
}