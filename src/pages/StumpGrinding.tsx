import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shovel, CheckCircle, Settings, Leaf, Zap, Phone, FileText, Shield, Calendar, DollarSign, Wrench } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileStickyCTA from '@/components/MobileStickyCTA';

import SEO from '@/components/SEO';
import RelatedServices from '@/components/RelatedServices';
import InternalLinkSuggestions from '@/components/InternalLinkSuggestions';
import CTASection from '@/components/CTASection';
import BeforeAfterComparison from '@/components/BeforeAfterComparison';
import ServiceHero from '@/components/ServiceHero';
import { LazySection } from '@/components/LazySection';
import { getServiceData } from '@/utils/structuredData';
import { handlePhoneClick } from '@/utils/phoneTracking';

const StumpGrinding = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToContact = () => {
    navigate('/contact');
  };

  const handleCall = () => {
    handlePhoneClick('01527874143');
  };

  const services = [
    {
      id: 'removal',
      icon: CheckCircle,
      title: 'Complete Removal',
      description: 'Our professional stump grinding service removes stumps below surface level, eliminating trip hazards and obstacles from your garden. Using powerful grinding equipment, we reduce stumps to wood chips, creating a level surface ready for lawn seeding, paving, or new planting. The grinding depth is tailored to your requirements, typically 150-300mm below ground level.'
    },
    {
      id: 'tailored',
      icon: Settings,
      title: 'Tailored Service',
      description: 'Every stump removal project is unique, from single stumps in residential gardens to multiple stumps on larger sites. We assess each situation and provide solutions that fit your needs and budget. Whether you\'re clearing space for landscaping, removing hazards, or preparing for construction, we deliver efficient stump grinding with minimal disruption.'
    },
    {
      id: 'impact',
      icon: Shovel,
      title: 'Low Impact',
      description: 'Our specialist equipment is designed to access tight spaces while protecting your garden and property. We use compact stump grinders that can navigate through standard garden gates and work in confined areas. Ground protection measures ensure minimal impact on lawns, patios, and surrounding plants, leaving your garden in excellent condition.'
    },
    {
      id: 'eco',
      icon: Leaf,
      title: 'Eco-Friendly',
      description: 'Stump grinding is an environmentally responsible approach to stump removal. The process creates natural wood chip mulch that enriches your soil as it decomposes, adding valuable organic matter and nutrients. You can use the mulch in borders, composting, or we can remove it completely—the choice is yours.'
    },
    {
      id: 'fast',
      icon: Zap,
      title: 'Fast & Efficient',
      description: 'Modern stump grinding equipment makes quick work of even large stumps. Most domestic stumps can be ground in 30-60 minutes, with minimal disruption to your day. We arrive fully equipped, complete the work efficiently, and leave your site clean and tidy. Emergency stump removal is also available for urgent situations.'
    }
  ];

  const benefits = [
    { icon: Shield, text: 'No Root Damage to Surroundings' },
    { icon: Shovel, text: 'Access-Friendly Equipment' },
    { icon: Leaf, text: 'Mulch or Removal Options' },
    { icon: Calendar, text: 'Same-Day Service Available' },
    { icon: CheckCircle, text: 'All Stump Sizes' },
    { icon: DollarSign, text: 'Competitive Fixed Prices' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Stump Grinding Bromsgrove | Reeves Tree Surgeons"
        description="Tree stumps ground out and cleared up in Bromsgrove, Redditch, Barnt Green, Birmingham & Solihull. Tidy, fully insured work. Call 01527 874143."
        keywords="stump grinding, stump removal, tree stump removal, eco-friendly stump grinding, West Midlands"
        url="/stump-grinding"
        structuredData={getServiceData("Stump Grinding & Removal", "Fast, safe, and eco-friendly stump removal services", "/stump-grinding")}
      />
      <Header />
      
      <main>
        {/* Hero Section */}
        <ServiceHero
          category="Domestic Services"
          icon={Wrench}
          title="Stump Grinding & Removal"
          description="Fast, safe, and eco-friendly stump removal services for residential properties"
          backgroundImage="/lovable-uploads/stump-grinding-residential-1.jpg"
          showCTA={true}
          ctaText="Get a Free Quote"
        />

        {/* Introduction Section */}
        <section className="py-20 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Text Content */}
              <div className="order-2 lg:order-1 flex flex-col justify-center">
                <p className="text-lg leading-relaxed mb-6" style={{ fontFamily: 'Inter, sans-serif', color: '#2B2B2B' }}>
                  Reeves Tree Surgeons offer professional stump grinding services throughout the West Midlands, providing complete stump removal solutions for residential properties. Our specialist stump grinding equipment removes tree stumps quickly, safely, and with minimal impact on your garden, eliminating unsightly obstacles and potential hazards from your outdoor space.
                </p>
                <p className="text-lg leading-relaxed mb-6" style={{ fontFamily: 'Inter, sans-serif', color: '#2B2B2B' }}>
                  Whether you have a single stump left after tree removal or multiple stumps requiring clearance, our experienced team delivers efficient, eco-friendly stump grinding that leaves your garden ready for its next phase. We grind stumps to below ground level—typically 150-300mm deep—creating a level surface perfect for lawn restoration, new planting, or landscaping projects. The process is remarkably fast, with most domestic stumps ground within 30-60 minutes.
                </p>
                <p className="text-lg leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', color: '#2B2B2B' }}>
                  Our compact stump grinders can access confined spaces, passing through standard garden gates and working around established plants, patios, and structures without damage. The grinding process produces natural wood chip mulch that can enrich your soil or be removed entirely—whichever suits your needs. With same-day service available and competitive fixed pricing, we make stump removal straightforward, affordable, and stress-free.
                </p>
              </div>

              {/* Right Column - Video and Before/After */}
              <div className="order-1 lg:order-2 space-y-8">
                {/* Video Section */}
                <div className="rounded-lg overflow-hidden shadow-lg bg-gray-900">
                  <video 
                    className="w-full h-auto"
                    controls
                    playsInline
                    preload="metadata"
                  >
                    <source src="/lovable-uploads/stump-grinding-action.mov" type="video/quicktime" />
                    <source src="/lovable-uploads/stump-grinding-action.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="p-4 bg-background">
                    <p className="text-sm font-medium text-foreground">Watch Professional Stump Grinding in Action</p>
                    <p className="text-xs text-muted-foreground mt-1">Fast, efficient stump removal with minimal garden impact</p>
                  </div>
                </div>

                {/* Before/After Comparison */}
                <BeforeAfterComparison
                  beforeImage="/lovable-uploads/stump-grinding-before.jpg"
                  afterImage="/lovable-uploads/stump-grinding-after.jpg"
                  beforeAlt="Garden with multiple tree stumps before professional grinding removal"
                  afterAlt="Clean, level garden surface after expert stump grinding and removal"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Service Cards Section */}
        <section className="py-20" style={{ backgroundColor: '#F8F8F8' }}>
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{
                fontFamily: 'Inter, sans-serif',
                color: '#2B2B2B'
              }}>
                What's Included
              </h2>
              <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: '#2D5F3F' }} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map(service => {
                const IconComponent = service.icon;
                return (
                  <div key={service.id} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                    <div className="flex flex-col items-start">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#2D5F3F' }}>
                        <IconComponent size={24} color="white" />
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-3" style={{
                        fontFamily: 'Inter, sans-serif',
                        color: '#2B2B2B'
                      }}>
                        {service.title}
                      </h3>
                      <p className="text-base leading-relaxed" style={{
                        fontFamily: 'Inter, sans-serif',
                        color: '#6B7280'
                      }}>
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{
                fontFamily: 'Inter, sans-serif',
                color: '#2B2B2B'
              }}>
                Why Choose Our Stump Grinding Services
              </h2>
              <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: '#2D5F3F' }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2D5F3F' }}>
                      <IconComponent size={20} color="white" />
                    </div>
                    <p className="text-lg font-medium" style={{ fontFamily: 'Inter, sans-serif', color: '#2B2B2B' }}>
                      {benefit.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Related Services - Lazy Loaded */}
        <LazySection threshold={0.1} rootMargin="300px">
          <section className="py-20" style={{ backgroundColor: '#F8F8F8' }}>
            <RelatedServices currentService="stump-grinding" category="domestic" />
          </section>
        </LazySection>
        
        {/* Internal Link Suggestions - Lazy Loaded */}
        <LazySection threshold={0.1} rootMargin="300px">
          <section className="py-20 bg-white">
            <InternalLinkSuggestions currentPage="stump-grinding" category="domestic" />
          </section>
        </LazySection>

        {/* CTA Section - Lazy Loaded */}
        <LazySection threshold={0.1} rootMargin="200px">
          <CTASection />
        </LazySection>
      </main>

      <Footer />
      <MobileStickyCTA />
    </div>
  );
};

export default StumpGrinding;
