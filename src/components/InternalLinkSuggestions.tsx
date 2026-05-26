import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, TreePine, Building2, Scissors, Shovel } from 'lucide-react';

interface InternalLinkSuggestionsProps {
  currentPage: string;
  category?: 'domestic' | 'commercial';
}

const InternalLinkSuggestions = ({ currentPage, category = 'domestic' }: InternalLinkSuggestionsProps) => {
  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    navigate(route);
    window.scrollTo(0, 0);
  };

  const getSuggestedLinks = () => {
    const links = [];
    
    // Add main service pages
    if (currentPage !== 'domestic-services') {
      links.push({
        title: 'All Domestic Services',
        description: 'Explore our complete range of residential tree care services',
        route: '/domestic-services',
        icon: TreePine
      });
    }
    
    if (currentPage !== 'commercial-services') {
      links.push({
        title: 'Commercial Tree Services',
        description: 'Professional tree care solutions for businesses and developers',
        route: '/commercial-services',
        icon: Building2
      });
    }

    // Add specific service suggestions based on current page
    if (currentPage !== 'tree-work' && category === 'domestic') {
      links.push({
        title: 'Tree Pruning & Removal',
        description: 'Expert tree work including pruning, removal, and emergency care',
        route: '/tree-work',
        icon: TreePine
      });
    }

    if (currentPage !== 'hedge-cutting' && category === 'domestic') {
      links.push({
        title: 'Hedge Cutting Services',
        description: 'Professional hedge trimming and maintenance for your property',
        route: '/hedge-cutting',
        icon: Scissors
      });
    }

    if (currentPage !== 'stump-grinding' && category === 'domestic') {
      links.push({
        title: 'Stump Grinding & Removal',
        description: 'Eco-friendly stump removal with specialist equipment',
        route: '/stump-grinding',
        icon: Shovel
      });
    }

    // Add Our Work gallery
    if (currentPage !== 'our-work') {
      links.push({
        title: 'View Our Work Gallery',
        description: 'See examples of our recent tree surgery projects',
        route: '/our-work',
        icon: TreePine
      });
    }

    return links.slice(0, 3); // Limit to 3 suggestions
  };

  const suggestedLinks = getSuggestedLinks();

  if (suggestedLinks.length === 0) return null;

  return (
    <section className="py-8 lg:py-12" style={{ backgroundColor: 'var(--neutral-025)' }}>
      <div className="container-premium">
        <div className="text-center mb-8">
          <h3 className="text-xl lg:text-2xl font-semibold mb-2" style={{
            fontFamily: 'Inter, sans-serif',
            color: 'var(--text-900)'
          }}>
            You Might Also Be Interested In
          </h3>
          <div className="w-16 h-0.5 mx-auto rounded-full" style={{
            background: 'var(--accent-emerald)'
          }} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {suggestedLinks.map((link, index) => {
            const IconComponent = link.icon;
            return (
              <div
                key={index}
                className="p-4 rounded-lg border cursor-pointer hover:shadow-md transition-all duration-200"
                style={{ 
                  backgroundColor: 'white',
                  borderColor: 'var(--neutral-200)'
                }}
                onClick={() => handleNavigation(link.route)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 p-2 rounded-full" style={{
                    background: 'linear-gradient(135deg, var(--accent-emerald) 0%, #2F6F5A 100%)'
                  }}>
                    <IconComponent size={18} className="text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm mb-1" style={{
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--text-900)'
                    }}>
                      {link.title}
                    </h4>
                    <p className="text-xs leading-relaxed" style={{
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--text-600)'
                    }}>
                      {link.description}
                    </p>
                  </div>
                  
                  <ChevronRight size={14} style={{ color: 'var(--text-400)' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InternalLinkSuggestions;