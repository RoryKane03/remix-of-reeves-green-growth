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
import { 
  Wrench, 
  Shield, 
  CheckCircle, 
  Zap, 
  Award, 
  CircleDollarSign,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import BeforeAfterComparison from '@/components/BeforeAfterComparison';

const CommercialStumpGrinding = () => {
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

  const services = [
    {
      id: 'complete',
      icon: Wrench,
      title: 'Complete Removal',
      description: 'Professional stump grinding service removes stumps below surface level, eliminating trip hazards and obstacles from commercial sites. Using powerful grinding equipment, we reduce stumps to wood chips, creating a level, site-ready surface for development, landscaping, or paving. Grinding depth is tailored to your project requirements, typically 150-300mm below ground level. Fast, efficient clearance that keeps your commercial projects on schedule.'
    },
    {
      id: 'tailored',
      icon: Wrench,
      title: 'Tailored Service',
      description: 'Every commercial stump removal project is unique, from single stumps to large-scale site clearances. We assess each situation and provide solutions that fit your project timeline, budget, and specifications. Whether you\'re preparing sites for construction, enhancing business premises, or removing hazards for safety compliance, we deliver efficient stump grinding with minimal operational disruption. Flexible scheduling including out-of-hours work for commercial convenience.'
    },
    {
      id: 'low-impact',
      icon: Wrench,
      title: 'Low Impact',
      description: 'Our specialist stump grinding equipment accesses tight spaces on commercial sites while protecting surrounding property and infrastructure. We use compact grinders that navigate through standard access points and work in confined areas around buildings, utilities, and hardstanding. Ground protection measures minimize impact on paved areas, lawns, and established landscaping. Professional service that respects your commercial property\'s existing features and operations.'
    },
    {
      id: 'eco-friendly',
      icon: Wrench,
      title: 'Eco-Friendly',
      description: 'Commercial stump grinding is an environmentally responsible approach to site clearance. The process creates natural wood chip mulch that enriches soil as it decomposes, adding organic matter and nutrients to your commercial landscape. You can use the mulch in planting areas, remove it completely, or we can arrange disposal—the choice is yours. Sustainable site management that supports your business\'s environmental commitments.'
    },
    {
      id: 'fast',
      icon: Wrench,
      title: 'Fast & Efficient',
      description: 'Modern stump grinding equipment makes quick work of stumps on commercial projects. Most stumps can be ground in 30-90 minutes, keeping your project timeline on track with minimal downtime. We arrive fully equipped, complete the work efficiently, and leave your site clean, level, and ready for the next phase. Emergency and urgent stump removal services also available for critical business needs.'
    }
  ];

  const benefits = [
    { icon: Shield, text: 'No Root Damage to Surrounding Areas' },
    { icon: Wrench, text: 'Access-Friendly Equipment' },
    { icon: CheckCircle, text: 'Mulch Removal or Retention Options' },
    { icon: Zap, text: 'Same-Day & Emergency Services' },
    { icon: Award, text: 'All Stump Sizes & Site Types' },
    { icon: CircleDollarSign, text: 'Fixed-Price Commercial Quotes' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Commercial Stump Grinding Services | Professional Stump Removal"
        description="Professional commercial stump grinding and removal services for businesses across the West Midlands. Fast, efficient, and minimal disruption to your operations."
        keywords="commercial stump grinding, business stump removal, commercial stump services, professional stump grinding, West Midlands"
        url="/commercial/stump-grinding"
      />
      <Header />

      <main>
        <ServiceHero
          category="Commercial Services"
          icon={Wrench}
          title="Commercial Stump Grinding"
          description="Professional stump removal services for commercial properties across the West Midlands"
          backgroundImage="/lovable-uploads/stump-grinding-residential-1.jpg"
          showCTA={true}
          ctaText="Get a Free Quote"
        />

        {/* Introduction Section with Before/After */}
        <section className="py-20 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
              {/* LEFT COLUMN - Text Content */}
              <div className="lg:col-span-3 order-1">
                <p className="text-lg leading-relaxed mb-6" style={{ fontFamily: 'Inter, sans-serif', color: '#2B2B2B' }}>
                  Professional stump grinding is essential for commercial sites requiring clean, safe, and development-ready land. At Reeves Tree Surgeons, we provide efficient commercial stump removal services to businesses, developers, schools, councils, and property managers throughout the West Midlands. Tree stumps create trip hazards, obstruct development, harbor pests and diseases, and detract from your commercial property's professional appearance. Our modern stump grinding equipment removes stumps below ground level, transforming obstacles into usable space while keeping your projects on schedule and minimizing disruption to operations.
                </p>
                <p className="text-lg leading-relaxed mb-6" style={{ fontFamily: 'Inter, sans-serif', color: '#2B2B2B' }}>
                  Using specialist grinding machines, we reduce stumps to fine wood chips, removing them 150-300mm below surface level—sufficient for most landscaping, turfing, or paving projects. Our compact equipment accesses tight commercial spaces, navigating through standard gateways, doorways, and confined areas while protecting surrounding surfaces and infrastructure. Whether you need single stump removal for site safety, multiple stump clearance for landscaping projects, or large-scale site clearance for development, we deliver fast, efficient service with minimal mess. All wood chip waste can be removed, left as eco-friendly mulch, or spread across planting areas—your choice based on your project requirements.
                </p>
                <p className="text-lg leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', color: '#2B2B2B' }}>
                  From retail parks and industrial estates to school grounds, office complexes, and new development sites, we handle commercial stump grinding projects of all scales across Birmingham, Coventry, Wolverhampton, and the wider West Midlands. Our service includes site assessments, underground utility checks, and flexible scheduling including out-of-hours and weekend work to avoid disrupting your business operations. With full insurance, professional equipment, and a commitment to leaving sites clean and ready for your next project phase, Reeves Tree Surgeons is the commercial stump grinding specialist businesses trust. Contact us today for a free site assessment and fixed-price commercial quote.
                </p>
              </div>

              {/* RIGHT COLUMN - Before/After Comparison */}
              <div className="lg:col-span-2 order-2">
                <div className="lg:sticky lg:top-24">
                  <BeforeAfterComparison
                    beforeImage="/lovable-uploads/stump-grinding-before-commercial.jpg"
                    afterImage="/lovable-uploads/stump-grinding-after-commercial.jpg"
                    beforeAlt="Large tree stump with stump grinder and safety barriers in commercial car park setting"
                    afterAlt="Clean, level ground after professional stump grinding removal in commercial car park"
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
                Our Commercial Stump Grinding Services
              </h2>
              <p className="text-xl" style={{ color: '#6B7280' }}>
                Professional stump removal solutions for commercial properties
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
                Why Choose Reeves for Commercial Stump Grinding?
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
          <RelatedServices currentService="stump-grinding" category="commercial" />
        </section>

        {/* Internal Link Suggestions */}
        <section className="py-20 bg-white">
          <InternalLinkSuggestions currentPage="stump-grinding" category="commercial" />
        </section>

        {/* CTA Section */}
        <CTASection />
      </main>

      <Footer />
      <MobileStickyCTA />
    </div>
  );
};

export default CommercialStumpGrinding;
