import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Leaf, Building, HardHat, ShieldCheck, Phone, FileText, Award, BadgeCheck, CircleDollarSign, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceHero from '@/components/ServiceHero';
import MobileStickyCTA from '@/components/MobileStickyCTA';
import RelatedServices from '@/components/RelatedServices';
import InternalLinkSuggestions from '@/components/InternalLinkSuggestions';
import CTASection from '@/components/CTASection';
import SEO from '@/components/SEO';
import { getServiceData } from '@/utils/structuredData';
import OptimizedImage from '@/components/ImageOptimization';

const CommercialSiteClearance = () => {
  const navigate = useNavigate();

  // Ensure page loads at top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToContact = () => {
    navigate('/contact');
  };

  const handleCall = () => {
    window.location.href = 'tel:01527874143';
  };

  const services = [
    {
      id: 'garden',
      icon: Leaf,
      title: 'Garden Clearances',
      description: 'Professional commercial garden and landscape clearance removes overgrown vegetation, unwanted structures, and accumulated debris to restore outdoor spaces on business premises. We handle everything from small courtyard gardens to extensive commercial landscapes, clearing shrubs, bushes, small trees, and waste materials efficiently. Our service includes site assessment, vegetation removal, debris clearance, and site restoration, leaving you with clean, usable outdoor space that enhances your commercial property\'s appearance and functionality.'
    },
    {
      id: 'land',
      icon: Building,
      title: 'Land Development',
      description: 'Large-scale site clearance for residential, commercial, and industrial development projects across the West Midlands. Our experienced team efficiently removes trees, vegetation, structures, and waste materials to prepare greenfield or brownfield sites for construction. We manage environmental compliance, obtain necessary permits, and coordinate with your project timeline to ensure sites are cleared and ready when you need them. From small plots to major development sites, we deliver thorough clearance that meets planning requirements and environmental standards.'
    },
    {
      id: 'construction',
      icon: HardHat,
      title: 'Construction Preparation',
      description: 'Comprehensive site preparation services for construction projects, including tree and vegetation removal, debris clearance, and site leveling. We create clean, level, development-ready sites that allow building work to commence on schedule. Our team works efficiently around your construction timeline, providing flexible scheduling including out-of-hours and weekend services to avoid delays. All work includes underground utility checks, environmental assessments, and coordination with your contractors to ensure smooth project progression from site clearance through to construction completion.'
    },
    {
      id: 'compliance',
      icon: ShieldCheck,
      title: 'Compliance & Safety',
      description: 'All commercial site clearance work is completed in full accordance with local planning regulations, environmental legislation, and health and safety requirements. We handle permit applications, conduct environmental impact assessments, and provide comprehensive risk assessments and method statements (RAMS) for every project. Our team is trained in commercial site safety procedures, protected species protocols, and waste management regulations. With £10 million public liability insurance and ARB certification, we ensure your business meets its duty of care obligations while maintaining environmental responsibility throughout the clearance process.'
    }
  ];

  const benefits = [
    {
      icon: Award,
      text: 'ARB Approved Contractor'
    },
    {
      icon: BadgeCheck,
      text: 'NPTC & Lantra Certified Team'
    },
    {
      icon: ShieldCheck,
      text: '£10 Million Public Liability Insurance'
    },
    {
      icon: FileText,
      text: 'Full Site Risk Assessments (RAMS)'
    },
    {
      icon: Leaf,
      text: 'Environmental Compliance Certified'
    },
    {
      icon: CircleDollarSign,
      text: 'Fixed-Price Commercial Quotes'
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--neutral-050)' }}>
      <SEO 
        title="Commercial Site Clearance Services | Reeves Tree Surgeons"
        description="Expert commercial site clearance in the West Midlands. Garden clearance, land development & construction site preparation. ARB approved, fully insured, compliant service."
        keywords="commercial site clearance, land clearance Birmingham, construction site preparation, garden clearance, development clearance, West Midlands"
        url="/services/commercial/site-clearance"
        structuredData={getServiceData(
          "Commercial Site Clearance Services", 
          "Efficient and compliant clearance for gardens, land development, and construction projects across the West Midlands", 
          "/services/commercial/site-clearance"
        )}
      />
      <Header />
      
      <main>
      <ServiceHero
        category="Commercial Services"
        icon={Building}
        title="Commercial Site Clearance"
        description="Efficient and compliant clearance for gardens, land development, and construction projects across the West Midlands"
        backgroundImage="/lovable-uploads/site-clearance-hero.jpg"
        objectPosition="center 45%"
        showCTA={true}
        ctaText="Get a Free Quote"
      />

        {/* Introduction Section with Images */}
        <section className="py-12 lg:py-16" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
              
              {/* Text Content - Left Column (60%) */}
              <div className="lg:col-span-3 order-1 lg:pr-12">
                <div className="space-y-6">
                  <p className="text-lg leading-relaxed" style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#2B2B2B'
                  }}>
                    At Reeves Tree Surgeons, we provide comprehensive commercial site clearance services to businesses, developers, local councils, and property managers throughout the West Midlands. From small garden clearances to large-scale land development projects, our professional team delivers efficient, compliant site preparation that keeps your projects on schedule.
                  </p>
                  
                  <p className="text-lg leading-relaxed" style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#2B2B2B'
                  }}>
                    Our commercial site clearance services include garden and landscape clearance, land development preparation, construction site clearance, vegetation removal, tree felling and stump grinding, debris removal, and site leveling. Every project follows strict environmental guidelines and health and safety regulations, backed by £10 million public liability insurance and comprehensive risk assessments.
                  </p>

                  <p className="text-lg leading-relaxed" style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#2B2B2B'
                  }}>
                    Whether you need urgent site clearance for construction start dates, scheduled landscape restoration, or large-scale development site preparation, Reeves delivers reliable commercial service across Birmingham, Worcester, Coventry, Wolverhampton, Solihull, and throughout the West Midlands. Contact us today for a free site assessment and fixed-price commercial quote.
                  </p>
                </div>
              </div>

              {/* Video - Right Column (40%) */}
              <div className="lg:col-span-2 order-2 lg:pl-8">
                <div className="lg:sticky lg:top-24">
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <video 
                      className="w-full h-auto"
                      controls
                      preload="metadata"
                      playsInline
                    >
                      <source src="/lovable-uploads/site-clearance-commercial.mov" type="video/quicktime" />
                      <source src="/lovable-uploads/site-clearance-commercial.mov" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="bg-white p-3 text-center border-t border-gray-200">
                      <p className="text-sm text-gray-600 font-medium">
                        Watch Professional Site Clearance in Action
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-12 lg:py-16" style={{ backgroundColor: '#F8F8F8' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{
                fontFamily: 'Inter, sans-serif',
                color: 'var(--text-900)'
              }}>
                Our Site Clearance Services
              </h2>
              <div className="w-24 h-1 mx-auto rounded-full" style={{
                background: 'var(--accent-emerald)'
              }} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div 
                    key={service.id} 
                    className="p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    style={{ backgroundColor: '#FFFFFF' }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-shrink-0 p-4 rounded-full" style={{
                        background: 'linear-gradient(135deg, #2D5F3F 0%, #1e4028 100%)'
                      }}>
                        <IconComponent size={28} color="white" />
                      </div>
                      <h3 className="text-2xl font-semibold" style={{
                        fontFamily: 'Inter, sans-serif',
                        color: 'var(--text-900)'
                      }}>
                        {service.title}
                      </h3>
                    </div>
                    
                    <p className="text-base leading-relaxed" style={{
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--text-700)'
                    }}>
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-12 lg:py-16" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{
                fontFamily: 'Inter, sans-serif',
                color: 'var(--text-900)'
              }}>
                Why Choose Reeves for Commercial Site Clearance
              </h2>
              <div className="w-24 h-1 mx-auto rounded-full" style={{
                background: 'var(--accent-emerald)'
              }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div 
                    key={index}
                    className="flex items-center gap-4 p-6 rounded-lg"
                    style={{ backgroundColor: '#F8F8F8' }}
                  >
                    <div className="flex-shrink-0 p-3 rounded-full" style={{
                      background: 'linear-gradient(135deg, #2D5F3F 0%, #1e4028 100%)'
                    }}>
                      <IconComponent size={24} color="white" />
                    </div>
                    <p className="font-medium" style={{
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--text-900)'
                    }}>
                      {benefit.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-12 lg:py-16" style={{ backgroundColor: '#F8F8F8' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RelatedServices currentService="site-clearance" category="commercial" />
          </div>
        </section>

        {/* Internal Link Suggestions */}
        <section className="py-12 lg:py-16" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InternalLinkSuggestions currentPage="site-clearance" category="commercial" />
          </div>
        </section>

        {/* CTA Section */}
        <CTASection />
      </main>

      <Footer />
      <MobileStickyCTA />
    </div>
  );
};

export default CommercialSiteClearance;
