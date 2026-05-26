import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TreePine, Scissors, Shovel, Building2, ChevronRight, LucideIcon } from 'lucide-react';

interface RelatedService {
  id: string;
  title: string;
  description: string;
  route: string;
  icon: LucideIcon;
  category: 'domestic' | 'commercial';
}

interface RelatedServicesProps {
  currentService: string;
  category?: 'domestic' | 'commercial';
}

const RelatedServices = ({ currentService, category = 'domestic' }: RelatedServicesProps) => {
  const navigate = useNavigate();

  const allServices: RelatedService[] = [
    {
      id: 'tree-work',
      title: 'Tree Work',
      description: 'Professional tree pruning, removal, and emergency care',
      route: '/tree-work',
      icon: TreePine,
      category: 'domestic'
    },
    {
      id: 'hedge-cutting',
      title: 'Hedge Cutting',
      description: 'Expert hedge trimming, shaping, and maintenance',
      route: '/hedge-cutting',
      icon: Scissors,
      category: 'domestic'
    },
    {
      id: 'stump-grinding',
      title: 'Stump Grinding',
      description: 'Fast, eco-friendly stump removal services',
      route: '/stump-grinding',
      icon: Shovel,
      category: 'domestic'
    },
    {
      id: 'commercial-tree-work',
      title: 'Commercial Tree Work',
      description: 'Professional tree services for businesses',
      route: '/commercial/tree-work',
      icon: TreePine,
      category: 'commercial'
    },
    {
      id: 'commercial-hedge-cutting',
      title: 'Commercial Hedge Cutting',
      description: 'Large-scale hedge maintenance services',
      route: '/commercial/hedge-cutting',
      icon: Scissors,
      category: 'commercial'
    },
    {
      id: 'commercial-stump-grinding',
      title: 'Commercial Stump Grinding',
      description: 'Industrial stump removal solutions',
      route: '/commercial/stump-grinding',
      icon: Shovel,
      category: 'commercial'
    },
    {
      id: 'site-clearance',
      title: 'Site Clearance',
      description: 'Complete land clearance for development',
      route: '/services/commercial/site-clearance',
      icon: Building2,
      category: 'commercial'
    }
  ];

  // Filter out current service and show related services from same category first
  const relatedServices = allServices
    .filter(service => service.id !== currentService)
    .sort((a, b) => {
      // Prioritize same category
      if (a.category === category && b.category !== category) return -1;
      if (b.category === category && a.category !== category) return 1;
      return 0;
    })
    .slice(0, 3); // Show max 3 related services

  if (relatedServices.length === 0) return null;

  const handleServiceClick = (route: string) => {
    navigate(route);
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--neutral-050)' }}>
      <div className="container-premium">
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{
            fontFamily: 'Inter, sans-serif',
            color: 'var(--text-900)'
          }}>
            Related Services
          </h2>
          <p className="text-lg mb-6" style={{
            fontFamily: 'Inter, sans-serif',
            color: 'var(--text-700)'
          }}>
            Explore our other professional tree and landscaping services
          </p>
          <div className="w-24 h-1 mx-auto rounded-full" style={{
            background: 'var(--accent-emerald)'
          }} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {relatedServices.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                style={{ backgroundColor: 'white' }}
                onClick={() => handleServiceClick(service.route)}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 p-3 rounded-full" style={{
                    background: 'linear-gradient(135deg, var(--accent-emerald) 0%, #2F6F5A 100%)'
                  }}>
                    <IconComponent size={24} className="text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2" style={{
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--text-900)'
                    }}>
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-4" style={{
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--text-700)'
                    }}>
                      {service.description}
                    </p>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  className="w-full inline-flex items-center justify-center gap-2 hover:bg-opacity-10 transition-all duration-200"
                  style={{
                    borderColor: 'var(--accent-emerald)',
                    color: 'var(--accent-emerald)',
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  Learn More
                  <ChevronRight size={16} />
                </Button>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <Button
            onClick={() => navigate(category === 'commercial' ? '/commercial-services' : '/domestic-services')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            style={{
              background: '#1F5A3B',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            View All {category === 'commercial' ? 'Commercial' : 'Domestic'} Services
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RelatedServices;