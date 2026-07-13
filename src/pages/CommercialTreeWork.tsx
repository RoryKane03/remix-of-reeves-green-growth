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
import treeBeforeImg from '@/assets/before-after/tree-work-before.jpg';
import treeAfterImg from '@/assets/before-after/tree-work-after.jpg';
import { 
  TreePine, 
  BadgeCheck, 
  Award, 
  Shield, 
  Clock, 
  CircleDollarSign, 
  FileText,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { handlePhoneClick } from '@/utils/phoneTracking';

const CommercialTreeWork = () => {
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
      id: 'pruning',
      icon: TreePine,
      title: 'Tree Pruning',
      description: 'Professional commercial tree pruning services including crown reduction, crown thinning, and deadwood removal for business properties. Our certified arborists follow BS 3998:2010 standards to maintain healthy, safe, and attractive trees across commercial landscapes. We work with businesses, schools, councils, and property managers to provide scheduled maintenance that minimizes disruption. Whether you need routine care or corrective pruning for risk management, we deliver expert tree care tailored to your commercial requirements.'
    },
    {
      id: 'removal',
      icon: TreePine,
      title: 'Tree Removal',
      description: 'Safe and efficient tree removal for commercial properties, handling unwanted, diseased, or hazardous trees with minimal business disruption. Using advanced rigging techniques and specialist equipment, we dismantle trees with precision and protect your property, staff, and visitors. Our team manages everything from small site trees to large specimens, ensuring complete clearance, waste removal, and site restoration. We work flexibly around your business hours and can provide out-of-hours services when required.'
    },
    {
      id: 'emergency',
      icon: TreePine,
      title: 'Emergency Tree Care',
      description: '24/7 emergency tree services for commercial properties facing storm damage, fallen trees, or urgent safety hazards. Our rapid response team mobilizes quickly to handle dangerous situations safely, protecting your business operations and liability. We provide immediate risk assessments, emergency tree removal, and site securing across the West Midlands. With full insurance and certified expertise, we help businesses manage tree emergencies efficiently and professionally.'
    },
    {
      id: 'cabling',
      icon: TreePine,
      title: 'Cabling & Bracing',
      description: 'Specialist structural support systems to strengthen weak or damaged trees on commercial properties, reducing liability risks and extending tree lifespan. Our arborists install professional cabling and bracing systems that provide long-term stability while maintaining aesthetic value. This proactive approach helps businesses preserve valuable mature trees, comply with planning requirements, and demonstrate environmental responsibility. We provide full risk assessments and maintenance schedules for ongoing peace of mind.'
    }
  ];

  const benefits = [
    { icon: BadgeCheck, text: 'ARB Approved Contractors' },
    { icon: Award, text: 'NPTC Certified Arborists' },
    { icon: Shield, text: '£10 Million Public Liability Insurance' },
    { icon: Clock, text: 'Over 20 Years Commercial Experience' },
    { icon: CircleDollarSign, text: 'Free Commercial Quotes' },
    { icon: FileText, text: 'Risk Assessments & Method Statements' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Commercial Tree Work Services | Professional Tree Surgery"
        description="Expert commercial tree services for businesses, schools, and councils. ARB approved, NPTC certified arborists providing professional tree care across the West Midlands."
        keywords="commercial tree work, business tree surgery, commercial tree services, professional tree care, commercial arborists, West Midlands"
        url="/commercial/tree-work"
      />
      <Header />

      <main>
        <ServiceHero
          category="Commercial Services"
          icon={TreePine}
          title="Commercial Tree Work"
          description="Professional tree surgery services for businesses, schools, and councils across the West Midlands"
          backgroundImage="/lovable-uploads/tree-work-hero-new.jpg"
          objectPosition="center 60%"
          showCTA={true}
          ctaText="Get a Free Quote"
        />

        {/* Introduction Section - SEO Content */}
        <section className="py-20 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              
              {/* LEFT COLUMN - Text Content */}
              <div className="order-2 lg:order-1 flex flex-col justify-center">
                <div className="space-y-6 text-lg" style={{ color: '#2B2B2B' }}>
                  <p>
                    At Reeves Tree Surgeons, we are commercial tree care specialists serving businesses, educational institutions, local councils, and commercial property managers throughout the West Midlands. As ARB Approved Contractors with NPTC certified arborists, we deliver professional tree surgery that protects your assets, enhances your premises, and ensures compliance with health and safety obligations. With over 20 years of experience managing commercial tree portfolios, we understand the unique challenges businesses face—from minimizing operational disruption to meeting stringent insurance requirements and maintaining professional site aesthetics.
                  </p>
                  <p>
                    Our comprehensive commercial tree work services include crown reduction and thinning, complete tree removal, emergency storm response, deadwood removal, and specialist cabling and bracing systems. Every project follows BS 3998:2010 standards and is backed by £10 million public liability insurance, giving you complete confidence in our work. We provide detailed risk assessments, method statements (RAMS), and site-specific safety plans before commencing work, ensuring your business meets its duty of care responsibilities. Our team works efficiently to minimize disruption, offering flexible scheduling including out-of-hours and weekend services to suit your operational requirements.
                  </p>
                  <p>
                    Whether you need scheduled tree maintenance programs, urgent emergency response, or one-off tree surgery projects, Reeves delivers reliable, professional service that commercial clients depend on. We manage tree care for retail parks, industrial estates, schools and colleges, healthcare facilities, office complexes, and local authority sites across Birmingham, Coventry, Wolverhampton, and the wider West Midlands. Our commercial approach combines technical expertise with practical understanding of business needs—completing work on time, on budget, and to the highest arboricultural standards. Contact us today for a free commercial consultation and discover why leading organizations trust Reeves Tree Surgeons for their tree care requirements.
                  </p>
                </div>
              </div>

              {/* RIGHT COLUMN - Video and Before/After */}
              <div className="order-1 lg:order-2 space-y-8">
                {/* Video */}
                <div>
                  <div className="rounded-lg overflow-hidden shadow-lg bg-gray-900">
                    <video 
                      className="w-full h-auto"
                      controls
                      preload="auto"
                      playsInline
                      style={{ minHeight: '300px' }}
                    >
                      <source src="/lovable-uploads/tree-work-action.mov" type="video/mp4" />
                      <source src="/lovable-uploads/tree-work-action.mov" type="video/quicktime" />
                      <p className="text-white p-4">Your browser does not support the video tag. Please try viewing in Safari or Chrome.</p>
                    </video>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className="text-sm font-medium" style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#2B2B2B'
                    }}>
                      Watch Our Expert Tree Surgeons in Action
                    </p>
                    <p className="text-xs mt-1" style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#6B7280'
                    }}>
                      Professional tree removal with precision and care
                    </p>
                  </div>
                </div>

                {/* Before/After Comparison */}
                <div>
                  <BeforeAfterComparison
                    beforeImage={treeBeforeImg}
                    afterImage={treeAfterImg}
                    beforeAlt="Overgrown cedar tree before professional pruning by Reeves Tree Surgeons"
                    afterAlt="Safely pruned and shaped cedar tree after expert tree work in West Midlands"
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
                Our Commercial Tree Work Services
              </h2>
              <p className="text-xl" style={{ color: '#6B7280' }}>
                Professional tree care solutions for commercial properties
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
                Why Choose Reeves for Commercial Tree Work?
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
          <RelatedServices currentService="tree-work" category="commercial" />
        </section>

        {/* Internal Link Suggestions */}
        <section className="py-20 bg-white">
          <InternalLinkSuggestions currentPage="tree-work" category="commercial" />
        </section>

        {/* CTA Section */}
        <CTASection />
      </main>

      <Footer />
      <MobileStickyCTA />
    </div>
  );
};

export default CommercialTreeWork;
