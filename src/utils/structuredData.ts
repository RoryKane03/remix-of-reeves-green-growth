// Local Business Structured Data
export const getLocalBusinessData = () => ({
  "@context": "https://schema.org", 
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": "https://reevestreesurgeons.uk",
  "name": "Reeves Tree Surgeons", 
  "alternateName": "Reeves Tree Services",
  "description": "Professional tree surgeons serving the West Midlands since 2002. Expert tree removal, hedge cutting, stump grinding and emergency tree services.",
  "url": "https://reevestreesurgeons.uk",
  "telephone": "+441527874143",
  "logo": "https://reevestreesurgeons.uk/lovable-uploads/26fe9352-cca5-4102-aedb-6ba7f5c2de66.png",
  "image": "https://reevestreesurgeons.uk/lovable-uploads/26fe9352-cca5-4102-aedb-6ba7f5c2de66.png",
  "foundingDate": "2002",
  "areaServed": {
    "@type": "State",
    "name": "West Midlands"
  },
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 52.4862,
      "longitude": -1.8904
    },
    "geoRadius": "50000"
  },
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
  "openingHours": "Mo-Su 07:00-19:00",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "50+",
    "bestRating": "5",
    "worstRating": "1"
  },
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
    "url": "https://reevestreesurgeons.uk",
    "@id": "https://reevestreesurgeons.uk",
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
  "url": serviceUrl ? `https://reevestreesurgeons.uk${serviceUrl}` : undefined,
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
    "url": "https://reevestreesurgeons.uk",
    "@id": "https://reevestreesurgeons.uk",
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
  "url": serviceUrl ? `https://reevestreesurgeons.uk${serviceUrl}` : undefined,
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
    "item": item.current ? undefined : `https://reevestreesurgeons.uk${item.href}`
  }))
});

// Author/Person Schema for E-E-A-T
export const getAuthorSchema = (authorName: string) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": authorName,
  "jobTitle": "Master Arborist & Company Director",
  "description": "NPTC qualified arborist with over 20 years of professional experience in tree surgery, serving the West Midlands since 2002.",
  "worksFor": {
    "@type": "Organization",
    "name": "Reeves Tree Surgeons",
    "url": "https://reevestreesurgeons.uk"
  },
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Professional Certification",
      "name": "NPTC Qualified Arborist",
      "recognizedBy": {
        "@type": "Organization",
        "name": "National Proficiency Tests Council"
      }
    },
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Professional Membership",
      "name": "ARB Approved Contractor",
      "recognizedBy": {
        "@type": "Organization",
        "name": "Arboricultural Association"
      }
    }
  ],
  "alumniOf": {
    "@type": "Organization",
    "name": "National Proficiency Tests Council"
  },
  "knowsAbout": [
    "Arboriculture",
    "Tree Surgery",
    "Tree Preservation Orders",
    "Emergency Tree Work",
    "Commercial Tree Management",
    "Urban Forestry",
    "Tree Risk Assessment",
    "Heritage Tree Care"
  ],
  "award": [
    "Over 20 years professional experience",
    "ARB Approved Contractor status",
    "Multiple NPTC certifications"
  ],
  "url": `https://reevestreesurgeons.uk/team/${authorName.toLowerCase().replace(/\s+/g, '-')}`
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
    "url": "https://reevestreesurgeons.uk"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Reeves Tree Surgeons",
    "logo": {
      "@type": "ImageObject",
      "url": "https://reevestreesurgeons.uk/lovable-uploads/26fe9352-cca5-4102-aedb-6ba7f5c2de66.png"
    }
  },
  "datePublished": new Date().toISOString(),
  "dateModified": new Date().toISOString(),
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://reevestreesurgeons.uk/resources"
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
    "url": `https://reevestreesurgeons.uk/team/${authorName.toLowerCase().replace(/\s+/g, '-')}`,
    "jobTitle": "Master Arborist & Company Director",
    "worksFor": {
      "@type": "Organization",
      "name": "Reeves Tree Surgeons"
    }
  },
  "publisher": {
    "@type": "Organization",
    "name": "Reeves Tree Surgeons",
    "url": "https://reevestreesurgeons.uk",
    "logo": {
      "@type": "ImageObject",
      "url": "https://reevestreesurgeons.uk/lovable-uploads/26fe9352-cca5-4102-aedb-6ba7f5c2de66.png"
    }
  },
  "datePublished": datePublished,
  "dateModified": new Date().toISOString(),
  "wordCount": wordCount,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://reevestreesurgeons.uk/resources/${slug}`
  },
  "inLanguage": "en-GB",
  "about": {
    "@type": "Thing",
    "name": "Tree Surgery",
    "description": "Professional arboriculture services"
  }
});