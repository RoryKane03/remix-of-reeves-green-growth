import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Shield, Star, TreePine, Scissors, Wrench, Users, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import RelatedServices from '@/components/RelatedServices';
import LocationHero from '@/components/LocationHero';
import { getLocalBusinessData } from '@/utils/structuredData';

const Birmingham = () => {
  const navigate = useNavigate();
  
  const scrollToContact = () => {
    navigate('/contact');
  };

  const localBusinessData = {
    ...getLocalBusinessData(),
    name: 'Reeves Tree Surgeons - Birmingham Tree Surgery Services',
    areaServed: 'Birmingham, West Midlands',
    description: 'Professional tree surgery services in Birmingham. Expert tree removal, pruning, hedge cutting and emergency tree services. Covering all Birmingham areas including Edgbaston, Moseley, Kings Heath, Harborne and surrounding districts.'
  };

  return (
    <>
      <Helmet>
        <title>Tree Surgeons Birmingham | Professional Tree Surgery Services West Midlands</title>
        <meta name="description" content="Expert tree surgeons in Birmingham. Professional tree removal, pruning, hedge cutting & emergency services. Covering Edgbaston, Moseley, Kings Heath, Harborne. Free quotes." />
        <meta name="keywords" content="tree surgeons Birmingham, tree removal Birmingham, tree surgery Birmingham, arborists Birmingham, emergency tree services Birmingham, hedge cutting Birmingham" />
        <link rel="canonical" href="https://reevestreesurgeons.uk/locations/birmingham" />
        <script type="application/ld+json">
          {JSON.stringify(localBusinessData)}
        </script>
      </Helmet>

      <Header />

      <main>
        <LocationHero
          locationName="Birmingham"
          locationBadge="Birmingham Area"
          title="Professional Tree Surgeons in"
          titleAccent="Birmingham"
          description="Expert tree surgery services across Birmingham and surrounding areas. From Edgbaston to Kings Heath, Moseley to Harborne - we provide professional, insured tree care for domestic and commercial clients."
          backgroundImage="/lovable-uploads/tree-work-hero-new.jpg"
          objectPosition="center 40%"
          trustBadges={[
            { icon: Shield, text: 'Fully Insured & ARB Certified' },
            { icon: Star, text: 'Trusted by Birmingham Residents' },
            { icon: Clock, text: '24/7 Emergency Response' },
          ]}
        />

        {/* Birmingham Areas Coverage */}
        <section className="section-padding bg-neutral-050">
          <div className="container-premium">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Birmingham Areas We Cover</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive tree surgery services across all Birmingham districts and surrounding areas
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
              {[
                { area: 'Edgbaston & University Area', landmarks: 'University of Birmingham, Botanical Gardens', speciality: 'Heritage tree preservation' },
                { area: 'Kings Heath & Moseley', landmarks: 'Highbury Park, Kings Heath Park', speciality: 'Residential tree care' },
                { area: 'Harborne & Quinton', landmarks: 'Harborne High Street, University Golf Course', speciality: 'Garden tree management' },
                { area: 'Selly Oak & Bournville', landmarks: 'Cadbury factory, Selly Oak Park', speciality: 'Commercial tree services' },
                { area: 'Northfield & Longbridge', landmarks: 'Longbridge Technology Park', speciality: 'Large tree removal' },
                { area: 'City Centre & Jewellery Quarter', landmarks: 'Bullring, Birmingham Cathedral', speciality: 'Urban tree solutions' }
              ].map((area, index) => (
                <Card key={index} className="card-premium">
                  <CardHeader className="pb-3 p-4 sm:p-5 lg:p-6">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MapPin className="text-forest-600" size={18} />
                      {area.area}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {area.landmarks}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 sm:p-5 sm:pt-0 lg:p-6 lg:pt-0">
                    <div className="flex items-center gap-2 text-sm text-forest-600 font-medium">
                      <TreePine size={16} />
                      <span>Speciality: {area.speciality}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Birmingham Tree Services */}
        <section className="section-padding">
          <div className="container-premium">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Tree Surgery Services in Birmingham</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From emergency storm damage to routine maintenance - professional arboricultural services for Birmingham properties
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
              {[
                {
                  icon: TreePine,
                  title: 'Tree Removal Birmingham',
                  description: 'Safe removal of dangerous, diseased or unwanted trees across Birmingham. Specialist equipment for confined spaces in urban areas.',
                  features: ['Confined space specialists', 'Crane-assisted removal', 'Root grinding included', 'Site clearance']
                },
                {
                  icon: Scissors,
                  title: 'Birmingham Tree Pruning',
                  description: 'Professional crown reduction, deadwood removal and formative pruning to maintain healthy, attractive trees.',
                  features: ['Crown reduction', 'Deadwood removal', 'Canopy lifting', 'Vista pruning']
                },
                {
                  icon: Wrench,
                  title: 'Emergency Tree Services',
                  description: '24/7 emergency response for storm damage, fallen trees and urgent tree hazards across Birmingham.',
                  features: ['24/7 availability', 'Insurance work', 'Road clearance', 'Emergency make-safe']
                }
              ].map((service, index) => (
                <Card key={index} className="card-premium h-full">
                  <CardHeader className="p-4 sm:p-5 lg:p-6">
                    <div className="icon-premium mb-4">
                      <service.icon className="text-white" size={24} />
                    </div>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 sm:p-5 sm:pt-0 lg:p-6 lg:pt-0">
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-forest-600" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us for Birmingham */}
        <section className="section-padding bg-neutral-050">
          <div className="container-premium">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Birmingham Residents Choose Reeves</h2>
                <p className="text-xl text-muted-foreground">
                  Local expertise, professional standards, and emergency availability
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  {[
                    {
                      icon: Users,
                      title: 'Birmingham Local Knowledge',
                      description: 'Deep understanding of Birmingham\'s urban environment, local tree species, and council requirements for tree work permissions.'
                    },
                    {
                      icon: Shield,
                      title: 'Fully Qualified Team',
                      description: 'NPTC qualified arborists with extensive experience in urban tree surgery. Fully insured for residential and commercial work.'
                    },
                    {
                      icon: Clock,
                      title: 'Rapid Birmingham Response',
                      description: 'Fast response times across all Birmingham areas. Emergency callouts available 24/7 for urgent tree hazards.'
                    }
                  ].map((benefit, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-forest-600 rounded-lg flex items-center justify-center">
                          <benefit.icon className="text-white" size={20} />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <Card className="card-premium">
                    <CardHeader className="text-center p-4 sm:p-5 lg:p-6">
                      <CardTitle className="text-xl text-forest-600">Birmingham Coverage Map</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 sm:p-5 sm:pt-0 lg:p-6 lg:pt-0">
                      <div className="bg-forest-50 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>✓ City Centre</div>
                          <div>✓ Edgbaston</div>
                          <div>✓ Kings Heath</div>
                          <div>✓ Moseley</div>
                          <div>✓ Harborne</div>
                          <div>✓ Selly Oak</div>
                          <div>✓ Bournville</div>
                          <div>✓ Quinton</div>
                          <div>✓ Northfield</div>
                          <div>✓ Longbridge</div>
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <Button onClick={scrollToContact} className="btn-outline-green">
                          Check Your Area
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        <RelatedServices currentService="birmingham-tree-surgery" category="domestic" />
        <CTASection />
      </main>

      <Footer />
    </>
  );
};

export default Birmingham;