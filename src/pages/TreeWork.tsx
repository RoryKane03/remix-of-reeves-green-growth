import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TreePine, Shield, Wrench, Zap, Phone, FileText, CheckCircle, Award, Clock, Trash2, BadgeCheck, CircleDollarSign } from 'lucide-react';
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
import treeBeforeImg from '@/assets/before-after/tree-work-before.jpg';
import treeAfterImg from '@/assets/before-after/tree-work-after.jpg';
const TreeWork = () => {
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
  const services = [{
    id: 'pruning',
    icon: TreePine,
    title: 'Tree Pruning',
    description: 'Professional tree pruning services including crown reduction, crown thinning, and deadwood removal. Our certified arborists follow BS 3998:2010 standards to ensure healthy, safe, and attractive trees across the West Midlands. Whether you need routine maintenance or corrective pruning, we provide expert care tailored to each species and situation.'
  }, {
    id: 'removal',
    icon: Shield,
    title: 'Tree Removal',
    description: 'Safe and efficient tree removal for unwanted, diseased, or hazardous trees in domestic gardens. Using advanced rigging techniques and specialist equipment, we dismantle trees with precision and minimal impact on your property. Our team handles everything from small garden trees to large oaks, ensuring complete site clearance and debris removal.'
  }, {
    id: 'emergency',
    icon: Zap,
    title: 'Emergency Tree Care',
    description: '24/7 emergency tree services for storm damage, fallen trees, and urgent safety hazards. Our rapid response team is equipped to handle dangerous situations quickly and safely, protecting your home and family. We provide immediate assessments and emergency tree removal across the West Midlands, ensuring peace of mind when you need it most.'
  }, {
    id: 'cabling-bracing',
    icon: Wrench,
    title: 'Cabling & Bracing',
    description: 'Specialist structural support systems to strengthen weak or damaged trees, extending their lifespan and reducing risk. Our arborists install professional cabling and bracing systems that provide long-term stability while maintaining the tree\'s natural growth. This proactive approach helps preserve valuable trees that might otherwise require removal.'
  }];
  const benefits = [{
    icon: BadgeCheck,
    text: 'ARB Approved Contractors'
  }, {
    icon: Award,
    text: 'NPTC Certified Arborists'
  }, {
    icon: Shield,
    text: '£10 Million Public Liability Insurance'
  }, {
    icon: Clock,
    text: 'Over 20 Years Experience'
  }, {
    icon: CircleDollarSign,
    text: 'Free, No-Obligation Quotes'
  }, {
    icon: Trash2,
    text: 'Complete Site Cleanup'
  }];
  return <div className="min-h-screen bg-white">
      <SEO title="Tree Surgery & Removal Bromsgrove | Reeves Tree Surgeons" description="Tree felling, pruning, crown reduction & emergency removal in Bromsgrove, Redditch, Birmingham & Solihull. ARB Approved, fully insured. 01527 874143." keywords="tree work, tree pruning, tree removal, emergency tree care, cabling bracing, arborists West Midlands" url="/tree-work" structuredData={getServiceData("Tree Work Services", "Professional tree pruning, removal, emergency care, and structural support services", "/tree-work")} breadcrumbs={[{
      label: 'Home',
      href: '/'
    }, {
      label: 'Domestic Services',
      href: '/domestic-services'
    }, {
      label: 'Tree Work',
      href: '/tree-work',
      current: true
    }]} />
      <Header />
      
      <main>
        {/* Hero Section */}
      <ServiceHero
        category="Domestic Services"
        icon={TreePine}
        title="Tree Work"
        description="Professional tree pruning, removal, emergency care, and structural support for residential properties"
        backgroundImage="/lovable-uploads/tree-work-hero-new.jpg"
        objectPosition="center 60%"
        showCTA={true}
        ctaText="Get a Free Quote"
      />

        {/* Introduction Section */}
        <section className="py-20 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              
              {/* LEFT COLUMN - Text Content */}
              <div className="order-2 lg:order-1 flex flex-col justify-center">
                <p className="text-lg leading-relaxed mb-6" style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#2B2B2B'
                }}>
                  Reeves Tree Surgeons are expert tree surgeons serving the West Midlands with professional tree work services tailored to domestic properties. As ARB approved contractors and NPTC certified arborists, we bring over 20 years of experience to every project, ensuring your trees receive the highest standard of care.
                </p>
                <p className="text-lg leading-relaxed" style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#2B2B2B'
                }}>
                  Our comprehensive services include precision pruning, safe tree removal, emergency tree care, and specialist cabling and bracing systems. All work is carried out to BS 3998:2010 standards, with full £10 million public liability insurance. From crown reduction to complete tree dismantling and emergency response, we approach every job with meticulous attention to safety, efficiency, and minimal impact on your property.
                </p>
                <p className="text-lg leading-relaxed mt-6" style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#2B2B2B'
                }}>
                  Whether you're in Birmingham, Worcester, or anywhere across the West Midlands, our residential tree work services are designed to enhance the safety, health, and beauty of your garden trees. We provide free, no-obligation consultations and detailed quotes, with flexible scheduling to suit your needs. Every project begins with a thorough site assessment to identify the best approach for your specific trees and property, ensuring work is completed efficiently with complete care for your garden and surroundings.
                </p>
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

        {/* Why Choose Section */}
        <section className="py-20 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{
              fontFamily: 'Inter, sans-serif',
              color: '#2B2B2B'
            }}>
                Why Choose Our Tree Work Services
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
            <RelatedServices currentService="tree-work" category="domestic" />
          </section>
        </LazySection>
        
        {/* Internal Link Suggestions - Lazy Loaded */}
        <LazySection threshold={0.1} rootMargin="300px">
          <section className="py-20 bg-white">
            <InternalLinkSuggestions currentPage="tree-work" category="domestic" />
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
export default TreeWork;