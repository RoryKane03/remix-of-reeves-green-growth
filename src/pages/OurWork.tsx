import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileStickyCTA from '@/components/MobileStickyCTA';

import GalleryHero from '@/components/gallery/GalleryHero';
import ImageGallery from '@/components/gallery/ImageGallery';
import GalleryCTA from '@/components/gallery/GalleryCTA';
import SEO from '@/components/SEO';

const OurWork = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Our Work Gallery - Tree Surgery Projects West Midlands | Reeves Tree Surgeons"
        description="Browse our portfolio of completed tree surgery, hedge cutting, stump grinding, and site clearance projects across the West Midlands. See professional results from NPTC qualified arborists."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Our Work', href: '/our-work', current: true }
        ]}
        keywords="tree surgery portfolio, tree work examples West Midlands, hedge cutting gallery, stump grinding projects, professional arborist work, tree removal Birmingham"
        url="/our-work"
      />
      
      <Header />
      
      <main>
        <GalleryHero />
        <ImageGallery />
        <GalleryCTA />
      </main>
      
      <Footer />
      <MobileStickyCTA />
    </div>
  );
};

export default OurWork;