// Local Business Structured Data
export const getLocalBusinessData = () => ({
  "@context": "https://schema.org", 
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": "https://www.reevestreesurgeons.co.uk",
  "name": "Reeves Tree Surgeons", 
  "alternateName": "Reeves Tree Services",
  "description": "Professional tree surgeons serving the West Midlands since 2002 and ARB Approved Contractors since 2020. Tree removal, hedge cutting, stump grinding and 24/7 emergency call-outs.",
  "url": "https://www.reevestreesurgeons.co.uk",
  "telephone": "+441527874143",
  "logo": "https://www.reevestreesurgeons.co.uk/lovable-uploads/26fe9352-cca5-4102-aedb-6ba7f5c2de66.png",
  "image": "https://www.reevestreesurgeons.co.uk/lovable-uploads/26fe9352-cca5-4102-aedb-6ba7f5c2de66.png",
  "foundingDate": "2002",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Stoney Lane, Tardebigge",
    "addressLocality": "Bromsgrove",
    "addressRegion": "Worcestershire",
    "postalCode": "B60 1LZ",
    "addressCountry": "GB"
  },
  "email": "info@reevestreesurgeons.co.uk",
  "areaServed": ["Bromsgrove", "Redditch", "Worcester", "Worcestershire", "Birmingham", "Solihull", "Warwick", "Warwickshire", "West Midlands"],
  "sameAs": [
    "https://www.facebook.com/reevestreesurgeons",
    "https://instagram.com/reevestreesurgeons/",
    "https://www.tiktok.com/@reevestreesurgeons"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Tree Surgery Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Tree Removal"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Hedge Cutting"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Stump Grinding"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Emergency Tree Services"
        }
      }
    ]
  },
  "openingHours": "Mo-Fr 09:00-16:00",
  "priceRange": "££",
  "paymentAccepted": ["Cash", "Card", "Bank Transfer"],
  "currenciesAccepted": "GBP"
});

// Review Schema for testimonials
export const getReviewSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "LocalBusiness",
    "name": "Reeves Tree Surgeons"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "author": {
    "@type": "Person",
    "name": "Verified Customer"
  },
  "reviewBody": "Excellent professional service. The team were punctual, efficient, and left our garden immaculate. Highly recommend for anyone needing tree work in the West Midlands."
});

// Enhanced Service Schema with pricing
export const getEnhancedServiceData = (serviceName: string, description: string, serviceUrl?: string, estimatedPrice?: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": serviceName,
  "description": description,
  "provider": {
    "@type": "LocalBusiness",
    "name": "Reeves Tree Surgeons",
    "url": "https://www.reevestreesurgeons.co.uk",
    "@id": "https://www.reevestreesurgeons.co.uk",
    "telephone": "01527874143",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "West Midlands",
      "addressCountry": "GB"
    }
  },
  "areaServed": {
    "@type": "State", 
    "name": "West Midlands"
  },
  "serviceType": serviceName,
  "url": serviceUrl ? `https://www.reevestreesurgeons.co.uk${serviceUrl}` : undefined,
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "price": estimatedPrice || "Free Quote Available",
    "priceCurrency": "GBP",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "priceCurrency": "GBP",
      "price": estimatedPrice || "POA"
    }
  },
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Insurance",
      "value": "£2 million public liability"
    },
    {
      "@type": "PropertyValue",
      "name": "Certification", 
      "value": "Qualified arborists with NPTC certification"
    },
    {
      "@type": "PropertyValue",
      "name": "Experience",
      "value": "Over 20 years serving West Midlands"
    },
    {
      "@type": "PropertyValue",
      "name": "Emergency Service",
      "value": "24/7 availability"
    }
  ]
});

// FAQ Structured Data
export const getFAQData = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What tree surgery services do you offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer comprehensive tree surgery services including tree removal, pruning, hedge cutting, stump grinding, emergency tree services, and commercial site clearance across the West Midlands."
      }
    },
    {
      "@type": "Question",
      "name": "Are you fully insured and certified?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we are fully insured with £2 million public liability insurance and our team consists of qualified arborists with relevant certifications and training."
      }
    },
    {
      "@type": "Question",
      "name": "Do you provide emergency tree services?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we provide 24/7 emergency tree services for storm damage, fallen trees, and dangerous tree situations across the West Midlands."
      }
    }
  ]
});

// Service-specific structured data
export const getServiceData = (serviceName: string, description: string, serviceUrl?: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": serviceName,
  "description": description,
  "provider": {
    "@type": "LocalBusiness",
    "name": "Reeves Tree Surgeons",
    "url": "https://www.reevestreesurgeons.co.uk",
    "@id": "https://www.reevestreesurgeons.co.uk",
    "telephone": "01527874143",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "West Midlands",
      "addressCountry": "GB"
    }
  },
  "areaServed": {
    "@type": "State",
    "name": "West Midlands"
  },
  "serviceType": serviceName,
  "url": serviceUrl ? `https://www.reevestreesurgeons.co.uk${serviceUrl}` : undefined,
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": serviceName,
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": serviceName,
          "description": description
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "GBP",
          "price": "Free Quote Available"
        }
      }
    ]
  },
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Insurance",
      "value": "£2 million public liability"
    },
    {
      "@type": "PropertyValue", 
      "name": "Certification",
      "value": "Qualified arborists with NPTC certification"
    },
    {
      "@type": "PropertyValue",
      "name": "Experience",
      "value": "Over 20 years serving West Midlands"
    }
  ]
});

// Breadcrumb structured data for better navigation
export const getBreadcrumbData = (breadcrumbItems: Array<{label: string, href: string, current?: boolean}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbItems.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.label,
    "item": item.current ? undefined : `https://www.reevestreesurgeons.co.uk${item.href}`
  }))
});

// Article/Blog structured data for SEO
export const getArticleStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Tree Surgery Resources & Expert Guides",
  "description": "Professional arboricultural advice, seasonal care guides, and essential information for property owners in the West Midlands.",
  "author": {
    "@type": "Organization",
    "name": "Reeves Tree Surgeons",
    "url": "https://www.reevestreesurgeons.co.uk"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Reeves Tree Surgeons",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.reevestreesurgeons.co.uk/lovable-uploads/26fe9352-cca5-4102-aedb-6ba7f5c2de66.png"
    }
  },
  "datePublished": new Date().toISOString(),
  "dateModified": new Date().toISOString(),
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.reevestreesurgeons.co.uk/resources"
  }
});

// Enhanced Article Schema with Author Attribution for comprehensive guides
export const getEnhancedArticleSchema = (
  title: string,
  description: string,
  slug: string,
  authorName: string,
  datePublished: string,
  wordCount?: number
) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": title,
  "description": description,
  "author": {
    "@type": "Person",
    "name": authorName,
    "url": `https://www.reevestreesurgeons.co.uk/team/${authorName.toLowerCase().replace(/\s+/g, '-')}`,
    "jobTitle": "Master Arborist & Company Director",
    "worksFor": {
      "@type": "Organization",
      "name": "Reeves Tree Surgeons"
    }
  },
  "publisher": {
    "@type": "Organization",
    "name": "Reeves Tree Surgeons",
    "url": "https://www.reevestreesurgeons.co.uk",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.reevestreesurgeons.co.uk/lovable-uploads/26fe9352-cca5-4102-aedb-6ba7f5c2de66.png"
    }
  },
  "datePublished": datePublished,
  "dateModified": new Date().toISOString(),
  "wordCount": wordCount,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://www.reevestreesurgeons.co.uk/resources/${slug}`
  },
  "inLanguage": "en-GB",
  "about": {
    "@type": "Thing",
    "name": "Tree Surgery",
    "description": "Professional arboriculture services"
  }
});