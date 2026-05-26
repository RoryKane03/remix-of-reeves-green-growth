import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TreePine, Building2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Services = () => {
  const navigate = useNavigate();
  const scrollToContact = () => {
    navigate('/contact');
  };
  const handleDomesticServicesClick = () => {
    navigate('/domestic-services');
  };
  const handleCommercialServicesClick = () => {
    navigate('/commercial-services');
  };
  return <section id="services" className="pt-12 md:pt-16 lg:pt-20 pb-20 bg-neutral-050">
      <div className="container-premium">
        <div className="text-center mb-12 lg:mb-16">
          <h2 style={{
          fontFamily: 'Inter, sans-serif',
          color: 'var(--text-900)'
        }}>
            Our Services
          </h2>
          <div className="w-24 h-1 mx-auto mt-6 rounded-full" style={{
          background: 'var(--accent-emerald)'
        }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 max-w-4xl mx-auto">
          {/* Domestic Services Card */}
          <Card className="card-premium h-full reveal-fade-up cursor-pointer transition-all duration-300 lg:hover:scale-[1.02] flex flex-col" onClick={handleDomesticServicesClick}>
            <CardHeader className="text-center pb-6">
              <div className="mx-auto icon-premium mb-6">
                <TreePine size={32} />
              </div>
              <CardTitle className="text-xl lg:text-2xl leading-tight" style={{
              fontFamily: 'Inter, sans-serif',
              color: 'var(--text-900)',
              fontWeight: '600'
            }}>
                Domestic Services
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center flex-1 flex flex-col">
              <CardDescription className="text-base lg:text-lg leading-relaxed mb-8" style={{
              fontFamily: 'Inter, sans-serif',
              color: 'var(--text-700)',
              fontWeight: '400'
            }}>
                Tree work, hedge cutting, and stump grinding for homeowners.
              </CardDescription>
              
              <div className="mt-auto">
                <Button onClick={e => {
                e.stopPropagation();
                handleDomesticServicesClick();
              }} className="btn-outline-green focus-premium group" style={{
                fontFamily: 'Inter, sans-serif'
              }}>
                  View Domestic Services
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Commercial Services Card */}
          <Card className="card-premium h-full reveal-fade-up cursor-pointer transition-all duration-300 lg:hover:scale-[1.02] flex flex-col" onClick={handleCommercialServicesClick}>
            <CardHeader className="text-center pb-6">
              <div className="mx-auto icon-premium mb-6">
                <Building2 size={32} />
              </div>
              <CardTitle className="text-xl lg:text-2xl leading-tight" style={{
              fontFamily: 'Inter, sans-serif',
              color: 'var(--text-900)',
              fontWeight: '600'
            }}>
                Commercial Services
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center flex-1 flex flex-col">
              <CardDescription className="text-base lg:text-lg leading-relaxed mb-8" style={{
              fontFamily: 'Inter, sans-serif',
              color: 'var(--text-700)',
              fontWeight: '400'
            }}>
                Tree work, hedge cutting, stump grinding, and site clearance for businesses and public spaces.
              </CardDescription>
              
              <div className="mt-auto">
                <Button onClick={e => {
                e.stopPropagation();
                handleCommercialServicesClick();
              }} className="btn-outline-green focus-premium group" style={{
                fontFamily: 'Inter, sans-serif'
              }}>
                  View Commercial Services
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Request Consultation CTA */}
        
      </div>
    </section>;
};
export default Services;