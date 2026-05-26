import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <SEO 
        title="Page Not Found - 404 | Reeves Tree Surgeons"
        description="The requested page could not be found. Return to Reeves Tree Surgeons homepage for professional tree surgery services in West Midlands."
        url="/404"
      />
      <meta name="robots" content="noindex, nofollow" />
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
