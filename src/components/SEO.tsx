import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
  breadcrumbs?: Array<{label: string, href: string, current?: boolean}>;
  noindex?: boolean;
}

const SEO = ({ 
  title, 
  description, 
  keywords = "tree surgeons, tree removal, hedge cutting, stump grinding, West Midlands, Birmingham, arborists, NPTC certified, ARB approved",
  image = "/reeves-og-social.jpg",
  url,
  type = "website",
  structuredData,
  breadcrumbs,
  noindex = false
}: SEOProps) => {
  const fullTitle = title.includes('Reeves Tree Surgeons') ? title : `${title} | Reeves Tree Surgeons`;
  const isBrowser = typeof window !== 'undefined';
  const prodHosts = ['reevestreesurgeons.co.uk', 'www.reevestreesurgeons.co.uk'];
  const currentHost = isBrowser ? window.location.hostname : '';
  // Treat any non-production host as staging (includes localhost and any temporary hosts)
  const isStaging = isBrowser ? !prodHosts.includes(currentHost) : false;
  
  // Set canonical URL to always point to production domain to avoid duplicate content
  const baseUrl = 'https://www.reevestreesurgeons.co.uk';
  // Always remove trailing slashes for consistent canonical URLs
  const cleanUrl = url ? url.replace(/\/$/, '') : '';
  const canonicalUrl = cleanUrl ? `${baseUrl}${cleanUrl}` : baseUrl;
  
  const robotsContent = isStaging ? 'noindex, nofollow, noarchive' : noindex ? 'noindex, follow' : 'index, follow';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Reeves Tree Surgeons" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Business Information */}
      <meta name="author" content="Reeves Tree Surgeons" />
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="bingbot" content={robotsContent} />
      <meta name="geo.region" content="GB-WOR" />
      <meta name="geo.placename" content="Bromsgrove" />
      
      {/* PWA & Performance */}
      <meta name="theme-color" content="#22c55e" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Additional Business Meta */}
      <meta name="coverage" content="West Midlands, Birmingham, Worcester, Bromsgrove, Redditch, Droitwich, Wolverhampton, Dudley, Solihull, Walsall" />
      <meta name="distribution" content="local" />
      <meta name="application-name" content="Reeves Tree Surgeons" />
      {/* Performance Hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      
      {/* CSS will be injected by Vite during build - no need for hardcoded paths */}
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Breadcrumb Structured Data */}
      {breadcrumbs && breadcrumbs.length > 1 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.label,
              "item": item.current ? undefined : `https://www.reevestreesurgeons.co.uk${item.href}`
            }))
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;