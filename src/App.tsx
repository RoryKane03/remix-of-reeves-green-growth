import React, { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./contexts/AuthContext";
import { CookieConsentProvider } from "./contexts/CookieConsentContext";
import { usePerformanceMonitoring } from "./hooks/usePerformanceMonitoring";
import { seoAnalytics } from "./utils/seoAnalytics";
import CriticalCSS from "./components/CriticalCSS";
import ScrollToTop from "./components/ScrollToTop";
import RouteLoadingFallback from "./components/RouteLoadingFallback";
import CookieConsentBanner from './components/CookieConsentBanner';

// Lazy load all page components for better code splitting
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const OurWork = lazy(() => import("./pages/OurWork"));
const TreeWork = lazy(() => import("./pages/TreeWork"));
const HedgeCutting = lazy(() => import("./pages/HedgeCutting"));
const StumpGrinding = lazy(() => import("./pages/StumpGrinding"));
const DomesticServices = lazy(() => import("./pages/DomesticServices"));
const CommercialServices = lazy(() => import("./pages/CommercialServices"));
const CommercialTreeWork = lazy(() => import("./pages/CommercialTreeWork"));
const CommercialHedgeCutting = lazy(() => import("./pages/CommercialHedgeCutting"));
const CommercialStumpGrinding = lazy(() => import("./pages/CommercialStumpGrinding"));
const CommercialSiteClearance = lazy(() => import("./pages/CommercialSiteClearance"));
const Birmingham = lazy(() => import("./pages/locations/Birmingham"));
const Worcester = lazy(() => import("./pages/locations/Worcester"));
const Warwick = lazy(() => import("./pages/locations/Warwick"));
const AuthorProfile = lazy(() => import("./pages/team/AuthorProfile"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminBootstrap = lazy(() => import("./pages/AdminBootstrap"));
const AdminAnalytics = lazy(() => import("./pages/admin/Analytics"));



const queryClient = new QueryClient();

const AppContent = () => {
  // Initialize performance monitoring for Core Web Vitals tracking
  const { metrics, report } = usePerformanceMonitoring(true);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Track page views for SEO analytics
  React.useEffect(() => {
    seoAnalytics.trackPageView(window.location.pathname);
  }, []);

  return (
    <>
      <CriticalCSS />
      <ScrollToTop />
      <CookieConsentBanner />
      <div style={{ paddingTop: isHomePage ? '0' : '110px' }}>
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/our-work" element={<OurWork />} />
            <Route path="/tree-work" element={<TreeWork />} />
            <Route path="/hedge-cutting" element={<HedgeCutting />} />
            <Route path="/stump-grinding" element={<StumpGrinding />} />
            <Route path="/domestic-services" element={<DomesticServices />} />
            <Route path="/commercial-services" element={<CommercialServices />} />
            <Route path="/commercial/tree-work" element={<CommercialTreeWork />} />
            <Route path="/commercial/hedge-cutting" element={<CommercialHedgeCutting />} />
            <Route path="/commercial/stump-grinding" element={<CommercialStumpGrinding />} />
            <Route path="/services/commercial/site-clearance" element={<CommercialSiteClearance />} />
            <Route path="/locations/birmingham" element={<Birmingham />} />
            <Route path="/locations/worcester" element={<Worcester />} />
            <Route path="/locations/warwick" element={<Warwick />} />
            <Route path="/team/john-reeves" element={<AuthorProfile />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/bootstrap" element={<AdminBootstrap />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CookieConsentProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppContent />
        </TooltipProvider>
      </CookieConsentProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
