import { Button } from '@/components/ui/button';
import { ArrowRight, TreePine, Building2, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const ExploreServices = () => {
  const navigate = useNavigate();
  const serviceLinks = [{
    title: "Domestic Tree Services",
    description: "Professional tree work, hedge cutting, and stump grinding for homeowners across West Midlands",
    href: "/domestic-services",
    icon: TreePine
  }, {
    title: "Commercial Tree Services",
    description: "Comprehensive tree surgery and site clearance services for businesses and commercial properties",
    href: "/commercial-services",
    icon: Building2
  }];
  const scrollToContact = () => {
    navigate('/contact');
  };
  return <section id="services" className="py-16 md:py-20 lg:py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-4 lg:px-6">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 text-foreground">
            Explore Our Services
          </h2>
          <p className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-muted-foreground">
            Discover our comprehensive range of professional tree surgery services for domestic and commercial clients across the West Midlands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 max-w-5xl mx-auto mt-12">
          {serviceLinks.map((service, index) => {
          const IconComponent = service.icon;
          return <div 
                key={service.href} 
                className="bg-card border border-border rounded-lg shadow-sm p-6 lg:p-8 cursor-pointer transition-all duration-300 hover:shadow-lg lg:hover:scale-[1.02] group animate-fade-in-up" 
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => navigate(service.href)}
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 transition-transform duration-200 group-hover:scale-105">
                    <IconComponent size={32} className="text-primary" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed mb-6 text-muted-foreground">
                    {service.description}
                  </p>
                  <Button 
                    onClick={e => {
                      e.stopPropagation();
                      navigate(service.href);
                    }} 
                    variant="outline"
                    size="lg"
                    className="mt-2"
                  >
                    Learn More
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>;
        })}
        </div>

        
      </div>
    </section>;
};
export default ExploreServices;