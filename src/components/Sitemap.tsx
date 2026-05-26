import { Helmet } from "react-helmet-async";

const Sitemap = () => {
  const urls = [
    { loc: "https://www.reevestreesurgeons.co.uk/", lastmod: "2025-01-03", changefreq: "weekly", priority: "1.0" },
    { loc: "https://www.reevestreesurgeons.co.uk/about", lastmod: "2025-01-03", changefreq: "monthly", priority: "0.8" },
    { loc: "https://www.reevestreesurgeons.co.uk/our-work", lastmod: "2025-01-03", changefreq: "monthly", priority: "0.8" },
    { loc: "https://www.reevestreesurgeons.co.uk/domestic-services", lastmod: "2025-01-03", changefreq: "monthly", priority: "0.9" },
    { loc: "https://www.reevestreesurgeons.co.uk/commercial-services", lastmod: "2025-01-03", changefreq: "monthly", priority: "0.9" },
    { loc: "https://www.reevestreesurgeons.co.uk/tree-work", lastmod: "2025-01-03", changefreq: "monthly", priority: "0.7" },
    { loc: "https://www.reevestreesurgeons.co.uk/hedge-cutting", lastmod: "2025-01-03", changefreq: "monthly", priority: "0.7" },
    { loc: "https://www.reevestreesurgeons.co.uk/stump-grinding", lastmod: "2025-01-03", changefreq: "monthly", priority: "0.7" },
    { loc: "https://www.reevestreesurgeons.co.uk/commercial/tree-work", lastmod: "2025-01-03", changefreq: "monthly", priority: "0.6" },
    { loc: "https://www.reevestreesurgeons.co.uk/commercial/hedge-cutting", lastmod: "2025-01-03", changefreq: "monthly", priority: "0.6" },
    { loc: "https://www.reevestreesurgeons.co.uk/commercial/stump-grinding", lastmod: "2025-01-03", changefreq: "monthly", priority: "0.6" },
    { loc: "https://www.reevestreesurgeons.co.uk/services/commercial/site-clearance", lastmod: "2025-01-03", changefreq: "monthly", priority: "0.6" },
    { loc: "https://www.reevestreesurgeons.co.uk/privacy-policy", lastmod: "2025-01-03", changefreq: "yearly", priority: "0.3" }
  ];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return (
    <>
      <Helmet>
        <meta httpEquiv="Content-Type" content="application/xml; charset=utf-8" />
      </Helmet>
      <pre dangerouslySetInnerHTML={{ __html: xmlContent }} />
    </>
  );
};

export default Sitemap;