import { LucideIcon } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

interface ServiceHeroProps {
  category: string;
  icon: LucideIcon;
  title: string;
  description: string;
  backgroundImage: string;
  objectPosition?: string;
  showCTA?: boolean;
  ctaText?: string;
}

const ServiceHero = ({ category, icon: Icon, title, description, backgroundImage, objectPosition, showCTA = false, ctaText = "Get a Free Quote" }: ServiceHeroProps) => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-neutral-050">
      {/* Hero Image with Gradient Overlay */}
      <div className="relative h-[50vh] lg:h-[60vh] max-h-[500px]">
        <img 
          src={backgroundImage}
          alt={`Professional ${title} service in action`}
          className="w-full h-full object-cover"
          style={{
            objectPosition: objectPosition || 'center',
            filter: 'saturate(1.1) contrast(1.05)'
          }}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        {/* Enhanced gradient overlay for better contrast */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'linear-gradient(to top, rgba(14, 45, 35, 0.92) 0%, rgba(14, 45, 35, 0.75) 25%, rgba(22, 58, 43, 0.5) 50%, rgba(0,0,0,0.2) 75%, transparent 100%)'
          }} 
        />
        
        {/* Hero Content - Positioned in lower third with professional spacing */}
        <div className="absolute inset-x-0 bottom-0">
          <div className="container mx-auto max-w-7xl px-4 lg:px-6 pb-28 lg:pb-36 pt-20">
            <div className="max-w-3xl animate-fade-in-up">
              <p 
                className="text-sm font-semibold tracking-wide mb-4 text-white/90 uppercase flex items-center gap-2"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
              >
                {category}
                <Icon className="w-4 h-4" />
              </p>
              <h1 
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
              >
                {title}
              </h1>
              <p 
                className="text-base md:text-lg text-white/95 leading-relaxed max-w-xl mb-8"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
              >
                {description}
              </p>
              {showCTA && (
                <Button 
                  size="lg"
                  onClick={() => navigate('/contact')}
                  className="shadow-lg hover:shadow-xl transition-all mb-12"
                >
                  {ctaText}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
