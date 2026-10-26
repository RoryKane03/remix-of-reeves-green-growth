import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import ServiceHero from '@/components/ServiceHero';
import MobileStickyCTA from '@/components/MobileStickyCTA';
import RelatedServices from '@/components/RelatedServices';
import InternalLinkSuggestions from '@/components/InternalLinkSuggestions';
import CTASection from '@/components/CTASection';
import BeforeAfterComparison from '@/components/BeforeAfterComparison';
import beforeImg from '@/assets/before-after/hedge-cutting-before.jpg';
import afterImg from '@/assets/before-after/hedge-cutting-after.jpg';
import { 
  Scissors, 
  BadgeCheck, 
  Clock, 
  Award, 
  Shield, 
  CircleDollarSign, 
  Trash2,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { handlePhoneClick } from '@/utils/phoneTracking';

const CommercialHedgeCutting = () => {
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
      id: 'trimming',
      icon: Scissors,
      title: 'Regular Trimming',
      description: 'Maintain the professional appearance of your commercial property with our scheduled hedge trimming service. We work with businesses, schools, and property managers to keep hedges shaped, dense, and attractive throughout the year. Our team delivers consistent results that enhance your premises while minimizing disruption to operations. From formal boundary hedges to natural screening, we provide reliable maintenance that reflects your business\'s professional standards.'
    },
    {
      id: 'reduction',
      icon: Scissors,
      title: 'Height Reduction',
      description: 'Safely reduce overgrown commercial hedges that obstruct sight lines, block signage, or interfere with buildings and utilities. Our careful reduction techniques maintain hedge health while achieving your required specifications. We use specialist equipment to work safely at height on commercial sites, ensuring clean cuts that promote recovery. Perfect for bringing neglected hedges back under control or adapting to new site requirements with minimal business impact.'
    },
    {
      id: 'shaping',
      icon: Scissors,
      title: 'Thinning & Shaping',
      description: 'Expert commercial hedge thinning and shaping services to enhance structure, density, and visual appeal for business properties. We carefully remove selected growth to improve airflow, light penetration, and overall plant health across commercial landscapes. Our skilled team creates formal shapes, restores symmetry, or maintains natural forms to complement your site\'s character. Professional hedge management that supports your property\'s appearance and asset value.'
    },
    {
      id: 'restoration',
      icon: Scissors,
      title: 'Hedge Restoration',
      description: 'Rejuvenate neglected or overgrown commercial hedges with our specialist restoration service. We assess hedge condition and implement tailored recovery plans, often involving gradual reduction and selective pruning over multiple seasons. This approach encourages healthy new growth from the base, transforming sparse or damaged commercial hedges into dense, attractive boundaries. We work with property managers and businesses to develop maintenance schedules that sustain long-term results.'
    }
  ];

  const benefits = [
    { icon: BadgeCheck, text: 'Professional Equipment & Expertise' },
    { icon: Trash2, text: 'All Waste Removed & Disposed' },
    { icon: Clock, text: 'Flexible Scheduling & Out-of-Hours Work' },
    { icon: Award, text: 'Scheduled Maintenance Programs' },
    { icon: CircleDollarSign, text: 'Competitive Commercial Rates' },
    { icon: Shield, text: 'Full Insurance & Safety Compliance' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Commercial Hedge Cutting | Reeves Tree Surgeons"
        description="Scheduled and one-off hedge cutting for business premises across the West Midlands, with flexible timing to suit you. Free quotes: 01527 874143."
        keywords="commercial hedge cutting, business hedge trimming, commercial hedge maintenance, professional hedge services, West Midlands"
        url="/commercial/hedge-cutting"
      />
      <Header />

      <main>
        <ServiceHero
          category="Commercial Services"
          icon={Scissors}
          title="Commercial Hedge Cutting & Maintenance"
          description="Professional hedge maintenance services for businesses, schools, and commercial properties"
          backgroundImage="/lovable-uploads/hedge-cutting-hero-new.jpg"
          objectPosition="center 65%"
          showCTA={true}
          ctaText="Get a Free Quote"
        />

        {/* Introduction Section - SEO Content */}
        <section className="py-20 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Text Content */}
              <div className="order-2 lg:order-1 flex flex-col justify-center">
                <p className="text-lg leading-relaxed mb-6" style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#2B2B2B'
                }}>
                  Well-maintained hedges are essential for commercial properties, creating professional boundaries, enhancing security, and maintaining the attractive appearance that reflects your business standards. At Reeves Tree Surgeons, we provide comprehensive commercial hedge cutting and maintenance services to businesses, educational facilities, retail parks, industrial estates, and local authorities throughout the West Midlands. Our experienced team understands the unique requirements of commercial hedge care—from maintaining formal appearances to managing extensive boundary hedging while minimizing disruption to your operations and visitors.
                </p>
                <p className="text-lg leading-relaxed" style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#2B2B2B'
                }}>
                  Our commercial hedge maintenance programs include regular trimming and shaping, height reduction for overgrown hedges, specialist restoration for neglected hedging, and precision work around utilities, buildings, and signage. We use professional-grade equipment that delivers clean, precise cuts promoting healthy regrowth, and we always remove and dispose of all hedge trimmings, leaving your site clean and presentable. Whether you need scheduled seasonal maintenance or one-off reduction projects, we work flexibly around your business requirements, offering out-of-hours and weekend services to avoid disrupting your commercial operations.
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
                    beforeAlt="Commercial hedge before professional cutting by Reeves Tree Surgeons"
                    afterAlt="Commercial hedge after professional maintenance by Reeves Tree Surgeons"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Cards Section */}
        <section className="py-20" style={{ backgroundColor: '#F8F8F8' }}>
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4" style={{ color: '#2B2B2B' }}>
                Our Commercial Hedge Services
              </h2>
              <p className="text-xl" style={{ color: '#6B7280' }}>
                Professional hedge care solutions for commercial properties
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                      style={{ backgroundColor: '#2D5F3F' }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4" style={{ color: '#2B2B2B' }}>
                      {service.title}
                    </h3>
                    <p className="text-base leading-relaxed" style={{ color: '#6B7280' }}>
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4" style={{ color: '#2B2B2B' }}>
                Why Choose Reeves for Commercial Hedge Cutting?
              </h2>
              <p className="text-xl" style={{ color: '#6B7280' }}>
                Professional credentials and reliable service
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#2D5F3F' }}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold" style={{ color: '#2B2B2B' }}>
                        {benefit.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-20" style={{ backgroundColor: '#F8F8F8' }}>
          <RelatedServices currentService="hedge-cutting" category="commercial" />
        </section>

        {/* Internal Link Suggestions */}
        <section className="py-20 bg-white">
          <InternalLinkSuggestions currentPage="hedge-cutting" category="commercial" />
        </section>

        {/* CTA Section */}
        <CTASection />
      </main>

      <Footer />
      <MobileStickyCTA />
    </div>
  );
};

export default CommercialHedgeCutting;
