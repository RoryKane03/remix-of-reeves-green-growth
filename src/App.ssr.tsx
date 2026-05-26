import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CookieConsentProvider } from "./contexts/CookieConsentContext";
import CriticalCSS from "./components/CriticalCSS";

// Direct imports for SSR (no lazy loading)
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OurWork from "./pages/OurWork";
import TreeWork from "./pages/TreeWork";
import HedgeCutting from "./pages/HedgeCutting";
import StumpGrinding from "./pages/StumpGrinding";
import DomesticServices from "./pages/DomesticServices";
import CommercialServices from "./pages/CommercialServices";
import CommercialTreeWork from "./pages/CommercialTreeWork";
import CommercialHedgeCutting from "./pages/CommercialHedgeCutting";
import CommercialStumpGrinding from "./pages/CommercialStumpGrinding";
import CommercialSiteClearance from "./pages/CommercialSiteClearance";
import Birmingham from "./pages/locations/Birmingham";
import Worcester from "./pages/locations/Worcester";
import Warwick from "./pages/locations/Warwick";
import AuthorProfile from "./pages/team/AuthorProfile";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppSSR = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CookieConsentProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <CriticalCSS />
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </CookieConsentProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default AppSSR;
