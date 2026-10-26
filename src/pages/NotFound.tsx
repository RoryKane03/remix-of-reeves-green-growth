import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const links = [
  { href: "/tree-work", label: "Tree work" },
  { href: "/hedge-cutting", label: "Hedge cutting" },
  { href: "/stump-grinding", label: "Stump grinding" },
  { href: "/commercial-services", label: "Commercial services" },
  { href: "/our-work", label: "Our work" },
  { href: "/contact", label: "Get a free quote" },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEO
        title="Page Not Found | Reeves Tree Surgeons"
        description="Sorry, we couldn't find that page. Browse our tree surgery services or call 01527 874143 for a free quote."
        url="/404"
        noindex
      />
      <Header />
      <main className="min-h-[60vh] flex items-center justify-center bg-gray-50 px-4 py-24">
        <div className="text-center max-w-xl">
          <h1 className="text-4xl font-bold mb-4">Page not found</h1>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, that page doesn't exist or has moved. Try one of these instead, or call{" "}
            <a href="tel:01527874143" className="underline">01527 874143</a>.
          </p>
          <ul className="flex flex-wrap justify-center gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-block rounded-md border px-4 py-2 hover:bg-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
