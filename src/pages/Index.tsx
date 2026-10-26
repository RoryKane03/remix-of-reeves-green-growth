
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import CriticalCSS from '@/components/CriticalCSS';
import { LazySection } from '@/components/LazySection';
import { SectionSkeleton } from '@/components/skeletons/SectionSkeleton';
import { initializeRevealAnimations } from '@/utils/animations';
import { getLocalBusinessData, getFAQData } from '@/utils/structuredData';

// Component imports
import CredibilityBand from '@/components/CredibilityBand';
import WhyChooseUs from '@/components/WhyChooseUs';
import Services from '@/components/Services';
import FeaturedProject from '@/components/FeaturedProject';
import Testimonials from '@/components/Testimonials';
import TrustedSince from '@/components/TrustedSince';
import MobileStickyCTA from '@/components/MobileStickyCTA';
import CTASection from '@/components/CTASection';


const Index = () => {
  useEffect(() => {
    // Initialize reveal animations after component mounts
    const timer = setTimeout(() => {
      initializeRevealAnimations();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--neutral-050)' }}>
      <SEO 
        title="Tree Surgeons Bromsgrove | Reeves Tree Surgeons"
        description="Family-run, ARB Approved tree surgeons in Bromsgrove since 2002, covering Redditch, Birmingham, Solihull & the West Midlands."
        keywords="tree surgeons West Midlands, tree removal Birmingham, hedge cutting, stump grinding, emergency tree services, arborists"
        url="/"
        structuredData={[getLocalBusinessData(), getFAQData()]}
      />
      <CriticalCSS />
      <Header />
      
      {/* 1. HERO SECTION */}
      <Hero />
      
      {/* 2. CREDIBILITY / PROOF BAND */}
      <CredibilityBand />
      
      {/* 3. ABOUT / OUR STORY */}
      <TrustedSince />
      
      {/* 4. WHY CHOOSE US / KEY BENEFITS */}
      <WhyChooseUs />
      
      {/* 5. SERVICES SNAPSHOT */}
      <Services />
      
      {/* 6. FEATURED PROJECT / CASE STUDY */}
      <FeaturedProject />
      
      {/* 7. TESTIMONIALS */}
      <Testimonials />
      
      {/* 8. FINAL CTA SECTION */}
      <CTASection />
      
      {/* 9. MOBILE STICKY CTA */}
      <MobileStickyCTA />
      
      
      <Footer />
    </div>
  );
};

export default Index;
