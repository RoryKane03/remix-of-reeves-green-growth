import { Button } from '@/components/ui/button';
import { TreePine, Scissors, Drill, Phone, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ServicesSnapshot = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: TreePine,
      title: "Tree Removal & Felling",
      description: "Safe and efficient removal of hazardous or unwanted trees",
      link: "/tree-work"
    },
    {
      icon: Scissors,
      title: "Crown Raising & Pruning",
      description: "Expert pruning to maintain healthy, beautiful trees",
      link: "/tree-work"
    },
    {
      icon: Drill,
      title: "Stump Grinding",
      description: "Complete stump removal for a clean, usable landscape",
      link: "/stump-grinding"
    },
    {
      icon: Phone,
      title: "Emergency Tree Work",
      description: "24/7 rapid response for storm damage and urgent tree hazards",
      link: "/commercial-services"
    }
  ];

  return (
    <section className="py-20" style={{ backgroundColor: '#F8F8F8' }}>
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{ color: '#2B2B2B' }}>
            Our Services
          </h2>
          <p className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto" style={{ color: '#6B7280' }}>
            Professional tree surgery solutions for every need
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group bg-white border-none shadow-md hover:shadow-lg transition-all duration-300 rounded-lg pt-8 pb-8 px-6 cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => navigate(service.link)}
              >
                {/* Icon Circle */}
                <div className="flex justify-center mb-6">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300"
                    style={{ 
                      backgroundColor: 'rgba(45, 95, 63, 0.1)',
                    }}
                  >
                    <IconComponent className="h-8 w-8" style={{ color: '#2D5F3F' }} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 text-center" style={{ color: '#2B2B2B' }}>
                  {service.title}
                </h3>
                <p className="leading-relaxed mb-4 text-center" style={{ color: '#6B7280' }}>
                  {service.description}
                </p>

                {/* Learn More Link */}
                <div className="text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(service.link);
                    }}
                    className="font-medium text-sm inline-flex items-center gap-1 transition-colors duration-300"
                    style={{ color: '#2D5F3F' }}
                  >
                    Learn more 
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSnapshot;
