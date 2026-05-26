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

const Warwick = () => {
  const navigate = useNavigate();
  
  const scrollToContact = () => {
    navigate('/contact');
  };

  const localBusinessData = {
    ...getLocalBusinessData(),
    name: 'Reeves Tree Surgeons - Warwick Tree Surgery Services',
    areaServed: 'Warwick, Leamington Spa, Kenilworth, Warwickshire',
    description: 'Professional tree surgery services in Warwick and Warwickshire. Expert tree removal, pruning, hedge cutting and emergency tree services. Covering Warwick, Royal Leamington Spa, Kenilworth, Stratford-upon-Avon and surrounding Warwickshire villages.'
  };

  return (
    <>
      <Helmet>
        <title>Tree Surgeons Warwick | Professional Tree Surgery Services Warwickshire</title>
        <meta name="description" content="Expert tree surgeons in Warwick. Professional tree removal, pruning, hedge cutting & emergency services. Covering Warwick, Leamington Spa, Kenilworth, Stratford-upon-Avon. Free quotes." />
        <meta name="keywords" content="tree surgeons Warwick, tree removal Warwick, tree surgery Warwickshire, arborists Warwick, emergency tree services Warwick, hedge cutting Warwickshire, tree surgeon Leamington Spa, tree surgeon Kenilworth" />
        <link rel="canonical" href="https://www.reevestreesurgeons.co.uk/locations/warwick" />
        <script type="application/ld+json">
          {JSON.stringify(localBusinessData)}
        </script>
      </Helmet>

      <Header />

      <main>
        <LocationHero
          locationName="Warwick"
          locationBadge="Warwick & Warwickshire"
          title="Professional Tree Surgeons in"
          titleAccent="Warwick"
          description="Expert tree surgery services across Warwick and Warwickshire. From historic Warwick town to Royal Leamington Spa, Kenilworth to Stratford-upon-Avon - we provide heritage-conscious tree care for period properties and modern estates."
          backgroundImage="/lovable-uploads/tree-work-large-removal.jpg"
          objectPosition="center 40%"
          trustBadges={[
            { icon: Shield, text: 'Heritage Property Specialists' },
            { icon: Star, text: 'Trusted in Warwickshire' },
            { icon: Clock, text: 'Rapid Local Response' },
          ]}
        />

        {/* Warwick Areas Coverage */}
        <section className="section-padding bg-neutral-050">
          <div className="container-premium">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Warwickshire Areas We Cover</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive tree surgery services across Warwick, Leamington Spa, Kenilworth and surrounding Warwickshire villages
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
              {[
                { area: 'Warwick Town Centre & Castle Precinct', landmarks: 'Warwick Castle, St Mary\'s Church, Market Place', speciality: 'Heritage tree preservation' },
                { area: 'Royal Leamington Spa', landmarks: 'Jephson Gardens, Royal Pump Rooms, The Parade', speciality: 'Victorian garden maintenance' },
                { area: 'Kenilworth', landmarks: 'Kenilworth Castle, Abbey Fields', speciality: 'Conservation area tree work' },
                { area: 'Stratford-upon-Avon', landmarks: 'Shakespeare\'s Birthplace, River Avon', speciality: 'Historic property trees' },
                { area: 'Warwick University Area', landmarks: 'Campus grounds, Westwood Heath', speciality: 'Educational facility tree care' },
                { area: 'Surrounding Villages', landmarks: 'Barford, Hampton Magna, Budbrooke, Hatton', speciality: 'Rural estate management' }
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

        {/* Warwick Tree Services */}
        <section className="section-padding">
          <div className="container-premium">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Tree Surgery Services in Warwick</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Professional arboricultural services for historic properties, conservation areas and modern estates across Warwickshire
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
              {[
                {
                  icon: TreePine,
                  title: 'Tree Removal Warwick',
                  description: 'Safe removal of trees near historic properties, conservation areas and listed buildings. Specialist expertise working around Warwick Castle grounds and period properties.',
                  features: ['Heritage-sensitive work', 'Conservation area approved', 'Close-proximity specialists', 'Castle grounds experience']
                },
                {
                  icon: Scissors,
                  title: 'Warwick Tree Pruning & Maintenance',
                  description: 'Professional crown work for period properties and mature trees in historic Warwickshire estates. Victorian garden tree expertise.',
                  features: ['Victorian tree expertise', 'Crown thinning', 'Heritage pruning', 'View preservation']
                },
                {
                  icon: Wrench,
                  title: 'Emergency Tree Services',
                  description: '24/7 emergency response for storm damage across Warwick and surrounding Warwickshire areas. Listed building experience.',
                  features: ['24/7 availability', 'Insurance documentation', 'Heritage property safe', 'Rapid response']
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

        {/* Why Choose Us for Warwick */}
        <section className="section-padding bg-neutral-050">
          <div className="container-premium">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Warwick Residents Choose Reeves</h2>
                <p className="text-xl text-muted-foreground">
                  Heritage expertise, conservation area knowledge, and rapid Warwickshire coverage
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  {[
                    {
                      icon: Users,
                      title: 'Warwick Local Expertise',
                      description: 'Deep understanding of historic town requirements, conservation area regulations, and TPO requirements common across Warwick District.'
                    },
                    {
                      icon: Shield,
                      title: 'Heritage Property Experience',
                      description: 'Specialist knowledge working near Warwick Castle, listed buildings, and period properties throughout Warwickshire. Conservation area approved.'
                    },
                    {
                      icon: Clock,
                      title: 'Warwickshire Coverage',
                      description: 'Strategic location for rapid response to Warwick, Leamington Spa, Kenilworth, Stratford-upon-Avon and rural Warwickshire villages.'
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
                      <CardTitle className="text-xl text-forest-600">Warwickshire Coverage Map</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 sm:p-5 sm:pt-0 lg:p-6 lg:pt-0">
                      <div className="bg-forest-50 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>✓ Warwick Town</div>
                          <div>✓ Leamington Spa</div>
                          <div>✓ Kenilworth</div>
                          <div>✓ Stratford-upon-Avon</div>
                          <div>✓ Warwick University</div>
                          <div>✓ Barford</div>
                          <div>✓ Hampton Magna</div>
                          <div>✓ Hatton</div>
                          <div>✓ Budbrooke</div>
                          <div>✓ Surrounding Villages</div>
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

        <RelatedServices currentService="warwick-tree-surgery" category="domestic" />
        <CTASection />
      </main>

      <Footer />
    </>
  );
};

export default Warwick;
