import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Scissors, TreePine, Wrench, RefreshCw, Phone, FileText, Settings, CalendarCheck, Users, CircleDollarSign, MapPin } from 'lucide-react';
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
import beforeImg from '@/assets/before-after/hedge-cutting-before.jpg';
import afterImg from '@/assets/before-after/hedge-cutting-after.jpg';
const HedgeCutting = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const scrollToContact = () => {
    navigate('/contact');
  };
  const handleCall = () => {
    window.location.href = 'tel:01527874143';
  };
  const services = [{
    id: 'regular',
    icon: Scissors,
    title: 'Regular Trimming',
    description: 'Maintain the perfect shape and density of your hedges with our professional trimming service. We provide scheduled maintenance throughout the growing season, ensuring your boundaries remain neat, healthy, and attractive. Our expert team works with all hedge types, from formal box hedges to natural hawthorn boundaries, delivering precise cuts that encourage dense, vigorous growth.'
  }, {
    id: 'height',
    icon: TreePine,
    title: 'Height Reduction',
    description: 'Safely reduce overgrown hedges that obstruct views, block light, or interfere with structures. Our careful reduction techniques maintain the hedge\'s health while achieving your desired height. We use specialist equipment to work safely at height, ensuring clean cuts that promote quick recovery and prevent disease. Perfect for bringing neglected hedges back under control.'
  }, {
    id: 'shaping',
    icon: Wrench,
    title: 'Thinning & Shaping',
    description: 'Expert thinning and shaping services to improve your hedge\'s structure, density, and visual appeal. We carefully remove selected growth to enhance airflow, light penetration, and overall plant health. Our skilled team can create formal shapes, restore symmetry, or develop natural forms depending on your preference and the hedge species.'
  }, {
    id: 'restoration',
    icon: RefreshCw,
    title: 'Hedge Restoration',
    description: 'Rejuvenate neglected or overgrown hedges with our specialist restoration service. We assess the hedge\'s condition and implement a tailored recovery plan, often involving gradual reduction and selective pruning over multiple seasons. This approach encourages healthy new growth from the base, transforming sparse or damaged hedges into dense, attractive boundaries once more.'
  }];
  const benefits = [{
    icon: Settings,
    text: 'Professional Equipment'
  }, {
    icon: CalendarCheck,
    text: 'All Waste Removed'
  }, {
    icon: TreePine,
    text: 'Seasonal Advice'
  }, {
    icon: Users,
    text: 'Residential & Commercial'
  }, {
    icon: MapPin,
    text: 'Free Site Visits'
  }, {
    icon: CircleDollarSign,
    text: 'Competitive Pricing'
  }];
  return <div className="min-h-screen bg-white">
      <SEO title="Professional Hedge Cutting & Maintenance | Reeves Tree Surgeons" description="Expert hedge cutting, trimming, shaping & restoration services in West Midlands. Professional hedge maintenance for residential properties. Free quotes available." keywords="hedge cutting, hedge trimming, hedge maintenance, hedge shaping, hedge restoration, West Midlands" url="/hedge-cutting" structuredData={getServiceData("Hedge Cutting & Maintenance", "Professional hedge trimming, shaping, and restoration services", "/hedge-cutting")} />
      <Header />
      
      <main>
        {/* Hero Section */}
      <ServiceHero
        category="Domestic Services"
        icon={Scissors}
        title="Hedge Cutting & Maintenance"
        description="Professional hedge trimming, shaping, and restoration services for residential properties"
        backgroundImage="/lovable-uploads/hedge-cutting-hero-new.jpg"
        objectPosition="center 65%"
        showCTA={true}
        ctaText="Get a Free Quote"
      />

        {/* Introduction Section */}
        <section className="py-20 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Text Content */}
              <div className="order-2 lg:order-1 flex flex-col justify-center">
                <p className="text-lg leading-relaxed mb-6" style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#2B2B2B'
                }}>
                  Reeves Tree Surgeons provide professional hedge cutting services throughout the West Midlands, helping homeowners maintain beautiful, healthy hedges that enhance their property's appearance and privacy. Our expert hedge maintenance team has decades of experience working with all types of hedges, from traditional privet and hawthorn to formal box hedging and conifer screens.
                </p>
                <p className="text-lg leading-relaxed" style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#2B2B2B'
                }}>
                  Whether you need regular seasonal trimming, height reduction for overgrown boundaries, or specialist restoration work to rejuvenate neglected hedges, we deliver precise, professional results. Our skilled team uses specialist equipment to ensure clean, accurate cuts that promote healthy growth. We understand that every hedge is unique, with different species requiring specific cutting techniques and seasonal timing. All work is completed efficiently with complete waste removal, leaving your garden tidy and your hedges looking their absolute best.
                </p>
              </div>
              
              {/* Right Column - Video and Before/After */}
              <div className="order-1 lg:order-2 space-y-8">
                {/* Video */}
                <div>
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <video 
                      className="w-full h-auto"
                      controls
                      preload="auto"
                      playsInline
                      poster="/lovable-uploads/hedge-cutting-formal-topiary.jpg"
                    >
                      <source src="/lovable-uploads/hedge-cutting-action.mov" type="video/quicktime" />
                      <source src="/lovable-uploads/hedge-cutting-action.mov" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="bg-white p-3 text-center border-t border-gray-200">
                      <p className="text-sm text-gray-600 font-medium">
                        Watch Professional Hedge Cutting in Action
                      </p>
                    </div>
                  </div>
                </div>

                {/* Before/After Comparison */}
                <div>
                  <BeforeAfterComparison
                    beforeImage={beforeImg}
                    afterImage={afterImg}
                    beforeAlt="Overgrown hedge before professional cutting by Reeves Tree Surgeons"
                    afterAlt="Neatly trimmed hedge after maintenance service in central West Midlands"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Cards Section */}
        <section className="py-20" style={{
        backgroundColor: '#F8F8F8'
      }}>
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{
              fontFamily: 'Inter, sans-serif',
              color: '#2B2B2B'
            }}>
                What's Included
              </h2>
              <div className="w-24 h-1 mx-auto rounded-full" style={{
              backgroundColor: '#2D5F3F'
            }} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map(service => {
              const IconComponent = service.icon;
              return <div key={service.id} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center" style={{
                    backgroundColor: '#2D5F3F'
                  }}>
                        <IconComponent size={24} color="white" />
                      </div>
                      
                      <div className="flex-1">
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
                  </div>;
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
                Why Choose Our Hedge Cutting Services
              </h2>
              <div className="w-24 h-1 mx-auto rounded-full" style={{
              backgroundColor: '#2D5F3F'
            }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return <div key={index} className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{
                  backgroundColor: '#2D5F3F'
                }}>
                      <IconComponent size={20} color="white" />
                    </div>
                    <p className="text-lg font-medium" style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#2B2B2B'
                }}>
                      {benefit.text}
                    </p>
                  </div>;
            })}
            </div>
          </div>
        </section>

        {/* Related Services - Lazy Loaded */}
        <LazySection threshold={0.1} rootMargin="300px">
          <section className="py-20" style={{
          backgroundColor: '#F8F8F8'
        }}>
            <RelatedServices currentService="hedge-cutting" category="domestic" />
          </section>
        </LazySection>
        
        {/* Internal Link Suggestions - Lazy Loaded */}
        <LazySection threshold={0.1} rootMargin="300px">
          <section className="py-20 bg-white">
            <InternalLinkSuggestions currentPage="hedge-cutting" category="domestic" />
          </section>
        </LazySection>

        {/* CTA Section - Lazy Loaded */}
        <LazySection threshold={0.1} rootMargin="200px">
          <CTASection />
        </LazySection>
      </main>

      <Footer />
      <MobileStickyCTA />
    </div>;
};
export default HedgeCutting;