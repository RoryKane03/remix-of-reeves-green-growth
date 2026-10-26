import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { DomesticFAQs } from '@/components/EnhancedFAQs';
import { TreePine, Scissors, Shovel, CheckCircle, Star, Phone, FileText } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileStickyCTA from '@/components/MobileStickyCTA';

import SEO from '@/components/SEO';
import InternalLinkSuggestions from '@/components/InternalLinkSuggestions';
import CTASection from '@/components/CTASection';
import BeforeAfterComparison from '@/components/BeforeAfterComparison';
import { getServiceData } from '@/utils/structuredData';
import beforeImg from '@/assets/before-after/hedge-cutting-before.jpg';
import afterImg from '@/assets/before-after/hedge-cutting-after.jpg';
import { handlePhoneClick } from '@/utils/phoneTracking';
const services = [{
  id: 'tree-work',
  icon: TreePine,
  title: "Tree Work",
  description: "Safe, professional tree pruning, removal, and emergency callouts to keep your garden healthy.",
  route: '/tree-work',
  cta: "Learn More About Tree Work"
}, {
  id: 'hedge-cutting',
  icon: Scissors,
  title: "Hedge Cutting & Maintenance",
  description: "Expert hedge trimming and upkeep to keep your boundaries neat and secure.",
  route: '/hedge-cutting',
  cta: "Learn More About Hedge Cutting"
}, {
  id: 'stump-grinding',
  icon: Shovel,
  title: "Stump Grinding & Removal",
  description: "Fast and efficient stump removal to clear space for new planting or landscaping.",
  route: '/stump-grinding',
  cta: "Learn More About Stump Grinding"
}];
const whyChooseUsPoints = ["ARB Approved & Accredited Contractor", "Over 20 years' experience in domestic tree surgery", "1,000+ satisfied local customers", "Fully insured, qualified, and safety-certified staff"];
const testimonials = [{
  quote: "Reeves Tree Surgeons transformed our garden. Professional, tidy, and efficient service — highly recommend for any homeowner needing reliable tree work.",
  author: "Sarah",
  location: "West Midlands"
}, {
  quote: "Quick response for an emergency tree removal. Friendly team and excellent service.",
  author: "Mark",
  location: "Birmingham"
}];
const faqs = [{
  question: "Do I need permission to remove a tree from my garden?",
  answer: "If your tree is protected by a Tree Preservation Order (TPO) or you live in a conservation area, you'll need council approval. We can advise you before carrying out any work."
}, {
  question: "How much does domestic tree surgery cost?",
  answer: "Prices vary depending on the size and complexity of the job. We provide free, no-obligation quotes so you know exactly what to expect."
}, {
  question: "Can you handle emergency tree work?",
  answer: "Yes. Our team is available for emergency callouts across the West Midlands to deal with storm damage, fallen trees, or urgent safety concerns."
}, {
  question: "How quickly can you start work?",
  answer: "We aim to provide quotes within 24 hours and complete most domestic jobs within 7–10 days, depending on demand."
}];
const DomesticServices = () => {
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
    handlePhoneClick('01527874143');
  };
  return <div className="min-h-screen bg-white">
      <SEO title="Domestic Tree Services in West Midlands | Reeves Tree Surgeons" description="Trusted local tree surgeons for safe, reliable home and garden care since 2002. Professional tree work, hedge cutting & stump grinding services." keywords="domestic tree services, West Midlands tree surgeons, residential tree work, home garden tree care, ARB approved contractor" url="/domestic-services" structuredData={getServiceData("Domestic Tree Services", "Professional domestic tree services for homeowners in West Midlands", "/domestic-services")} breadcrumbs={[{
      label: 'Home',
      href: '/'
    }, {
      label: 'Domestic Services',
      href: '/domestic-services',
      current: true
    }]} />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight" style={{ color: '#2B2B2B' }}>
                Domestic Tree Services in West Midlands
              </h1>
              
              <p className="text-lg md:text-xl leading-relaxed mb-8" style={{ color: '#6B7280' }}>
                Trusted local tree surgeons since 2002, offering safe and reliable garden care across the West Midlands.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
              {services.map((service, index) => {
              const IconComponent = service.icon;
              return <div 
                key={service.id} 
                className="group bg-white border-none shadow-md hover:shadow-lg transition-all duration-300 rounded-lg pt-8 pb-8 px-6 cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleServiceClick(service.route)}
              >
                    {/* Icon Circle */}
                    <div className="flex justify-center mb-6">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300"
                        style={{ backgroundColor: 'rgba(45, 95, 63, 0.1)' }}
                      >
                        <IconComponent className="h-8 w-8" style={{ color: '#2D5F3F' }} />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 text-center" style={{ color: '#2B2B2B' }}>
                      {service.title}
                    </h3>
                    
                    <p className="text-base leading-relaxed mb-6 text-center" style={{ color: '#6B7280' }}>
                      {service.description}
                    </p>
                    
                    <div className="text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleServiceClick(service.route);
                        }}
                        className="font-medium text-sm inline-flex items-center gap-1 transition-colors duration-300"
                        style={{ color: '#2D5F3F' }}
                      >
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
              <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#6B7280' }}>
                Reeves Tree Surgeons provides trusted domestic tree care across the West Midlands, including tree work, hedge cutting, and stump removal. Since 2002, our team (ARB Approved since 2020) has delivered safe, reliable, and affordable services for homeowners.
              </p>
              
              <div className="w-16 h-0.5 mx-auto mt-8 mb-8 rounded-full" style={{ backgroundColor: '#2D5F3F' }} />
              
              <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#6B7280' }}>
                Our domestic services are tailored to homeowners across the West Midlands, from routine pruning to urgent tree removals. We combine decades of experience with the latest equipment to keep your garden safe, attractive, and well-maintained.
              </p>
              
              <div className="mt-8 flex items-center justify-center gap-2 text-base" style={{ color: '#6B7280' }}>
                <span>👉 Looking for larger projects? See our</span>
                <button onClick={() => navigate('/commercial-services')} className="underline hover:no-underline transition-all duration-200 font-medium" style={{ color: '#2D5F3F' }}>
                  Commercial Tree Services
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Link Suggestions */}
        <InternalLinkSuggestions currentPage="domestic-services" category="domestic" />

        {/* Why Choose Us Section */}
        <section className="py-20" style={{ backgroundColor: '#F8F8F8' }}>
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{ color: '#2B2B2B' }}>
                Why Choose Reeves Tree Surgeons?
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                {whyChooseUsPoints.map((point, index) => <div key={index} className="flex items-start gap-4 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(45, 95, 63, 0.1)' }}>
                        <CheckCircle className="h-6 w-6" style={{ color: '#2D5F3F' }} />
                      </div>
                    </div>
                    <p className="text-lg leading-relaxed pt-2" style={{ color: '#2B2B2B' }}>
                      {point}
                    </p>
                  </div>)}
              </div>
            </div>
          </div>
        </section>

        {/* Customer Testimonials */}
        <section className="py-20 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{ color: '#2B2B2B' }}>
                Customer Testimonials
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
              {testimonials.map((testimonial, index) => <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-8">
                    <div className="flex mb-4 gap-1">
                      {[...Array(5)].map((_, i) => <Star key={i} size={20} className="fill-current" style={{ color: '#D4AF37' }} />)}
                    </div>
                    <blockquote className="text-lg italic mb-6 leading-relaxed" style={{ color: '#6B7280' }}>
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="font-semibold" style={{ color: '#2B2B2B' }}>
                      – {testimonial.author}, {testimonial.location}
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </section>

        <DomesticFAQs />

        {/* Final CTA Banner */}
        <CTASection 
          heading="Ready to Improve Your Garden?"
          subheading="Get a free quote from ARB Approved tree surgeons today."
          buttonText="Get a Free Quote"
        />
      </main>

      <Footer />
      <MobileStickyCTA />
    </div>;
};
export default DomesticServices;