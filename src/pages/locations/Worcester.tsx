import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Shield, Building, TreePine, Scissors, Wrench, Users, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import RelatedServices from '@/components/RelatedServices';
import LocationHero from '@/components/LocationHero';
import { getLocalBusinessData } from '@/utils/structuredData';
import { handlePhoneClick } from '@/utils/phoneTracking';

const Worcester = () => {
  const navigate = useNavigate();
  
  const scrollToContact = () => {
    navigate('/contact');
  };

  const localBusinessData = {
    ...getLocalBusinessData(),
    name: 'Reeves Tree Surgeons - Worcester Tree Surgery Services',
    areaServed: 'Worcester, Bromsgrove, Worcestershire, West Midlands',
    description: 'Professional tree surgery services in Worcester and Bromsgrove. Expert tree removal, pruning, hedge cutting and commercial tree services. Based in Bromsgrove, covering all Worcester areas including city centre, Malvern, Redditch, Droitwich, and surrounding villages.'
  };

  return (
    <>
      <Helmet>
        <title>Tree Surgeons Worcester | Reeves Tree Surgeons</title>
        <meta name="description" content="Tree surgeons covering Worcester, Droitwich & Worcestershire from our Bromsgrove base. ARB Approved, 24/7 emergencies. Free quotes: 01527 874143." />
        <meta name="keywords" content="tree surgeons Worcester, tree surgeons Bromsgrove, tree removal Worcester, tree surgery Worcestershire, arborists Worcester, commercial tree services Bromsgrove, hedge cutting Worcestershire" />
        <link rel="canonical" href="https://www.reevestreesurgeons.co.uk/locations/worcester" />
        <script type="application/ld+json">
          {JSON.stringify(localBusinessData)}
        </script>
      </Helmet>

      <Header />

      <main>
        <LocationHero
          locationName="Worcester"
          locationBadge="Worcester & Worcestershire"
          title="Expert Tree Surgeons in"
          titleAccent="Worcester"
          description="Professional tree surgery services throughout Worcester and Worcestershire. Based in Bromsgrove, serving residential and commercial clients from the city centre to surrounding towns including Redditch, Droitwich, and Malvern with expert arboricultural care."
          backgroundImage="/lovable-uploads/hedge-cutting-hero-new.jpg"
          objectPosition="center 45%"
          trustBadges={[
            { icon: Shield, text: 'Fully Insured & Certified' },
            { icon: Building, text: 'Commercial Expertise' },
            { icon: Clock, text: 'Commercial Specialists' },
          ]}
        />

        {/* Worcester Areas Coverage */}
        <section className="section-padding bg-neutral-050">
          <div className="container-premium">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Worcester & Worcestershire Areas We Serve</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Complete tree surgery coverage across Worcester city and surrounding Worcestershire towns - Based in Bromsgrove
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
              {[
                { area: 'Bromsgrove', landmarks: 'Town Centre, Sanders Park, Lickey Hills', speciality: 'Local base - Residential & commercial', highlight: true },
                { area: 'Worcester City Centre', landmarks: 'Cathedral, Guildhall, River Severn', speciality: 'Urban tree management' },
                { area: 'Redditch', landmarks: 'Abbey Stadium, Arrow Valley Park', speciality: 'Estate tree maintenance' },
                { area: 'Droitwich Spa', landmarks: 'Lido Park, Vines Park', speciality: 'Residential tree care' },
                { area: 'Malvern & Malvern Hills', landmarks: 'Great Malvern, Worcestershire Beacon', speciality: 'Rural tree management' },
                { area: 'Surrounding Villages', landmarks: 'Alvechurch, Catshill, Rubery, Hagley', speciality: 'Village & rural tree services' }
              ].map((area, index) => (
                <Card key={index} className={`card-premium ${area.highlight ? 'ring-2 ring-gold' : ''}`}>
                  <CardHeader className="pb-3 p-4 sm:p-5 lg:p-6">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MapPin className={area.highlight ? 'text-gold' : 'text-forest-600'} size={18} />
                      {area.area}
                      {area.highlight && <Badge className="bg-gold text-forest-900 text-xs ml-auto">Our Base</Badge>}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {area.landmarks}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 sm:p-5 sm:pt-0 lg:p-6 lg:pt-0">
                    <div className="flex items-center gap-2 text-sm text-forest-600 font-medium">
                      <TreePine size={16} />
                      <span>Focus: {area.speciality}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Commercial Tree Services Focus */}
        <section className="section-padding">
          <div className="container-premium">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Commercial Tree Services Worcester & Bromsgrove</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Specialist commercial arboricultural services for businesses, schools, and public spaces across Worcestershire
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
              {[
                {
                  icon: Building,
                  title: 'Business Premises',
                  description: 'Professional tree management for offices, retail parks, and industrial estates across Worcester and Bromsgrove.',
                  features: ['Scheduled maintenance', 'Health & safety compliance', 'Insurance documentation', 'Out-of-hours service']
                },
                {
                  icon: Users,
                  title: 'Educational Facilities',
                  description: 'Safe tree care for schools, colleges and educational campuses throughout Worcestershire.',
                  features: ['Child-safe practices', 'Term-time scheduling', 'Risk assessments', 'Educational value preservation']
                },
                {
                  icon: TreePine,
                  title: 'Public Spaces',
                  description: 'Council-approved tree surgery for parks, car parks, and public amenities in Worcester and Bromsgrove.',
                  features: ['Public liability covered', 'Traffic management', 'Minimal disruption', 'Community consultation']
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

        {/* Local Expertise */}
        <section className="section-padding bg-neutral-050">
          <div className="container-premium">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">Worcester & Bromsgrove Tree Surgery Expertise</h2>
                <p className="text-xl text-muted-foreground">
                  Understanding Worcestershire's trees and local regulations - Based in Bromsgrove
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-10 lg:gap-12 items-start">
                <div className="space-y-6">
                  <Card className="card-premium">
                    <CardHeader className="p-4 sm:p-5 lg:p-6">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <TreePine className="text-forest-600" size={20} />
                        Local Tree Species Knowledge
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 p-4 pt-0 sm:p-5 sm:pt-0 lg:p-6 lg:pt-0">
                      <p className="text-muted-foreground">
                        Expert knowledge of tree species common to Worcester and Worcestershire, including:
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>• English Oak</div>
                        <div>• Sycamore</div>
                        <div>• Beech</div>
                        <div>• Horse Chestnut</div>
                        <div>• Silver Birch</div>
                        <div>• Ash Trees</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-premium">
                    <CardHeader className="p-4 sm:p-5 lg:p-6">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Shield className="text-forest-600" size={20} />
                        Council Regulations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 sm:p-5 sm:pt-0 lg:p-6 lg:pt-0">
                      <p className="text-muted-foreground">
                        Full understanding of Worcester City Council and Bromsgrove District Council tree preservation orders, 
                        conservation area requirements, and planning applications for tree work.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-4">
                  <Card className="card-premium bg-forest-50 border-forest-200">
                    <CardHeader className="text-center p-4 sm:p-5 lg:p-6">
                      <CardTitle className="text-xl text-forest-600">Emergency Response Areas</CardTitle>
                      <CardDescription className="text-sm">Bromsgrove-based rapid response</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 sm:p-5 sm:pt-0 lg:p-6 lg:pt-0">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Bromsgrove</span>
                          <Badge className="bg-red-100 text-red-700">Priority 1</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Worcester Centre</span>
                          <Badge className="bg-red-100 text-red-700">Priority 1</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Redditch & Droitwich</span>
                          <Badge className="bg-amber-100 text-amber-700">Priority 2</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Commercial Sites</span>
                          <Badge className="bg-blue-100 text-blue-700">Same Day</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Rural Areas</span>
                          <Badge className="bg-green-100 text-green-700">24-48hrs</Badge>
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <Button onClick={() => handlePhoneClick('01527874143')} className="btn-primary-green w-full">
                          Emergency Call Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        <RelatedServices currentService="worcester-tree-surgery" category="commercial" />
        <CTASection />
      </main>

      <Footer />
    </>
  );
};

export default Worcester;
