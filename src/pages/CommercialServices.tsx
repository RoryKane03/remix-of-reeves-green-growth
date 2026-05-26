import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CommercialFAQs } from '@/components/EnhancedFAQs';
import { TreePine, Scissors, Shovel, HardHat, CheckCircle, Star, Phone, FileText, Building, Users, Shield, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileStickyCTA from '@/components/MobileStickyCTA';
import SEO from '@/components/SEO';
import InternalLinkSuggestions from '@/components/InternalLinkSuggestions';
import CTASection from '@/components/CTASection';
import { getServiceData } from '@/utils/structuredData';
const services = [{
  id: 'site-clearance',
  icon: HardHat,
  title: "Site Clearance",
  description: "Professional site clearance for commercial developments, schools, and business properties.",
  route: '/services/commercial/site-clearance',
  cta: "Learn More About Site Clearance"
}, {
  id: 'commercial-tree-work',
  icon: TreePine,
  title: "Commercial Tree Work",
  description: "Large-scale tree management, pruning, and removal for businesses and institutions.",
  route: '/commercial/tree-work',
  cta: "Learn More About Tree Work"
}, {
  id: 'commercial-hedge-cutting',
  icon: Scissors,
  title: "Hedge Cutting & Maintenance",
  description: "Regular commercial hedge maintenance for office complexes, schools, and retail parks.",
  route: '/commercial/hedge-cutting',
  cta: "Learn More About Hedge Cutting"
}, {
  id: 'commercial-stump-grinding',
  icon: Shovel,
  title: "Stump Grinding",
  description: "Efficient commercial stump removal with site-ready finish for development projects.",
  route: '/commercial/stump-grinding',
  cta: "Learn More About Stump Grinding"
}];
const whyChooseUsPoints = ["ARB Approved Contractor with commercial insurance", "Over 20 years serving West Midlands businesses", "Health & safety certified for commercial work", "Flexible scheduling around business operations"];
const testimonials = [{
  quote: "Reeves Tree Surgeons handled our office complex grounds professionally. Minimal disruption to operations and excellent results.",
  author: "David Thompson",
  location: "Facilities Manager, Birmingham"
}, {
  quote: "Reliable commercial tree service. They completed our school's hedge cutting during holidays with great attention to safety.",
  author: "Sarah Mitchell",
  location: "Head Teacher, West Midlands"
}];
const faqs = [{
  question: "Do you provide commercial quotes and contracts?",
  answer: "Yes, we provide detailed commercial quotes with transparent pricing and can establish ongoing maintenance contracts for regular grounds care."
}, {
  question: "Can you work around our business hours?",
  answer: "Absolutely. We schedule commercial work to minimize disruption, including early morning, evening, or weekend appointments when required."
}, {
  question: "Are you insured for commercial work?",
  answer: "Yes, we carry comprehensive commercial insurance including public liability coverage up to £6 million, suitable for all business environments."
}, {
  question: "How do you handle large commercial projects?",
  answer: "We assess each commercial project individually, providing detailed project plans, timeline estimates, and dedicated project management for larger developments."
}];
const CommercialServices = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleServiceClick = (route: string) => {
    navigate(route);
  };
  const scrollToContact = () => {
    navigate('/contact');
  };
  const handleCall = () => {
    window.location.href = 'tel:01527874143';
  };
  return <div className="min-h-screen bg-white">
      <SEO title="Commercial Tree Surgery Services | Reeves Tree Surgeons" description="Professional commercial tree services in West Midlands. ARB approved contractor for businesses, schools & commercial properties. Site clearance, tree work & hedge cutting." keywords="commercial tree services, business tree surgery, commercial tree work, commercial hedge cutting, commercial stump grinding, site clearance, West Midlands, ARB approved contractor" url="/commercial-services" structuredData={getServiceData("Commercial Tree Services", "Professional commercial tree services for businesses and institutions in West Midlands", "/commercial-services")} breadcrumbs={[{
      label: 'Home',
      href: '/'
    }, {
      label: 'Commercial Services',
      href: '/commercial-services',
      current: true
    }]} />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight" style={{
              color: '#2B2B2B'
            }}>
                Commercial Tree Services in West Midlands
              </h1>
              
              <p className="text-lg md:text-xl leading-relaxed mb-8" style={{
              color: '#6B7280'
            }}>
                ARB approved contractor providing professional tree services for businesses, schools, and commercial properties since 2002.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20" style={{
        backgroundColor: '#F8F8F8'
      }}>
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
              {services.map((service, index) => {
              const IconComponent = service.icon;
              return <div key={service.id} className="group bg-white border-none shadow-md hover:shadow-lg transition-all duration-300 rounded-lg pt-8 pb-8 px-6 cursor-pointer animate-fade-in-up" style={{
                animationDelay: `${index * 100}ms`
              }} onClick={() => handleServiceClick(service.route)}>
                    {/* Icon Circle */}
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300" style={{
                    backgroundColor: 'rgba(45, 95, 63, 0.1)'
                  }}>
                        <IconComponent className="h-8 w-8" style={{
                      color: '#2D5F3F'
                    }} />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 text-center" style={{
                  color: '#2B2B2B'
                }}>
                      {service.title}
                    </h3>
                    
                    <p className="text-base leading-relaxed mb-6 text-center" style={{
                  color: '#6B7280'
                }}>
                      {service.description}
                    </p>
                    
                    <div className="text-center">
                      <button onClick={e => {
                    e.stopPropagation();
                    handleServiceClick(service.route);
                  }} className="font-medium text-sm inline-flex items-center gap-1 transition-colors duration-300" style={{
                    color: '#2D5F3F'
                  }}>
                        {service.cta} →
                      </button>
                    </div>
                  </div>;
            })}
            </div>
          </div>
        </section>

        {/* Extended Description Section */}
        <section className="py-20 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg md:text-xl leading-relaxed" style={{
              color: '#6B7280'
            }}>Reeves Tree Surgeons provides comprehensive commercial tree services across the West Midlands, specialising in large-scale projects for businesses, schools, retail parks, and commercial developments. Our ARB-approved team delivers professional, insured services with minimal disruption to your operations.</p>
              
              <div className="w-16 h-0.5 mx-auto mt-8 mb-8 rounded-full" style={{
              backgroundColor: '#2D5F3F'
            }} />
              
              <p className="text-lg md:text-xl leading-relaxed" style={{
              color: '#6B7280'
            }}>
                From routine grounds maintenance to large-scale site clearance, we understand the unique demands of commercial tree work. Our experienced team uses professional-grade equipment and follows strict safety protocols to deliver exceptional results on time and within budget.
              </p>
              
              <div className="mt-8 flex items-center justify-center gap-2 text-base" style={{
              color: '#6B7280'
            }}>
                <span>👉 Need residential services? See our</span>
                <button onClick={() => navigate('/domestic-services')} className="underline hover:no-underline transition-all duration-200 font-medium" style={{
                color: '#2D5F3F'
              }}>
                  Domestic Tree Services
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Link Suggestions */}
        <InternalLinkSuggestions currentPage="commercial-services" category="commercial" />

        {/* Why Choose Us Section */}
        <section className="py-20" style={{
        backgroundColor: '#F8F8F8'
      }}>
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{
              color: '#2B2B2B'
            }}>
                Why Choose Reeves for Commercial Work?
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                {whyChooseUsPoints.map((point, index) => <div key={index} className="flex items-start gap-4 animate-fade-in-up" style={{
                animationDelay: `${index * 100}ms`
              }}>
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{
                    backgroundColor: 'rgba(45, 95, 63, 0.1)'
                  }}>
                        <CheckCircle className="h-6 w-6" style={{
                      color: '#2D5F3F'
                    }} />
                      </div>
                    </div>
                    <p className="text-lg leading-relaxed pt-2" style={{
                  color: '#2B2B2B'
                }}>
                      {point}
                    </p>
                  </div>)}
              </div>
            </div>
          </div>
        </section>

        {/* Client Testimonials */}
        <section className="py-20 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{
              color: '#2B2B2B'
            }}>
                Client Testimonials
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
              {testimonials.map((testimonial, index) => <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white animate-fade-in-up" style={{
              animationDelay: `${index * 100}ms`
            }}>
                  <CardContent className="p-8">
                    <div className="flex mb-4 gap-1">
                      {[...Array(5)].map((_, i) => <Star key={i} size={20} className="fill-current" style={{
                    color: '#D4AF37'
                  }} />)}
                    </div>
                    <blockquote className="text-lg italic mb-6 leading-relaxed" style={{
                  color: '#6B7280'
                }}>
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="font-semibold" style={{
                  color: '#2B2B2B'
                }}>
                      – {testimonial.author}, {testimonial.location}
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </section>

        <CommercialFAQs />

        {/* Final CTA Banner */}
        <CTASection 
          heading="Ready to Enhance Your Commercial Property?"
          subheading="Get a professional quote from ARB approved commercial tree specialists."
          buttonText="Get a Commercial Quote"
        />
      </main>

      <Footer />
      <MobileStickyCTA />
    </div>;
};
export default CommercialServices;