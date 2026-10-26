import { useNavigate } from 'react-router-dom';
import { cdnImage, cdnSrcSet } from '@/utils/netlifyImage';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, LucideIcon } from 'lucide-react';
import { handlePhoneClick } from '@/utils/phoneTracking';

interface LocationHeroProps {
  locationName: string;
  locationBadge: string;
  title: string;
  titleAccent: string;
  description: string;
  backgroundImage: string;
  objectPosition?: string;
  trustBadges: {
    icon: LucideIcon;
    text: string;
  }[];
}

const LocationHero = ({
  locationName,
  locationBadge,
  title,
  titleAccent,
  description,
  backgroundImage,
  objectPosition = 'center 40%',
  trustBadges,
}: LocationHeroProps) => {
  const navigate = useNavigate();

  const scrollToContact = () => {
    navigate('/contact');
  };

  return (
    <section className="relative min-h-[85vh] md:min-h-[80vh] lg:min-h-[75vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={cdnImage(backgroundImage, 1600)}
          srcSet={cdnSrcSet(backgroundImage, [640, 1024, 1600])}
          sizes="100vw"
          alt={`Professional tree surgery services in ${locationName}`}
          className="w-full h-full object-cover"
          style={{
            objectPosition,
            filter: 'saturate(1.1) contrast(1.05)',
          }}
          loading="eager"
          {...({ fetchpriority: 'high' } as Record<string, string>)}
          decoding="async"
          width="1920"
          height="1080"
        />
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(14, 45, 35, 0.3) 0%, rgba(14, 45, 35, 0.85) 40%, rgba(14, 45, 35, 0.90) 60%, rgba(14, 45, 35, 0.85) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative w-full">
        <div className="container-premium py-24 md:py-28 lg:py-32">
          <div className="max-w-4xl mx-auto">
            {/* Location Badge */}
            <div className="flex items-center gap-2 mb-6 md:mb-8">
              <MapPin className="text-gold" size={20} />
              <Badge className="bg-gold/95 backdrop-blur-md text-forest-900 font-semibold px-4 py-2 md:px-5 md:py-2.5 text-sm md:text-base shadow-lg">
                {locationBadge}
              </Badge>
            </div>

            {/* Title */}
            <h1
              className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
            >
              {title} <span className="text-gold">{titleAccent}</span>
            </h1>

            {/* Description */}
            <p
              className="text-lg md:text-xl text-white/95 mb-8 md:mb-10 leading-relaxed max-w-3xl"
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
            >
              {description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-10">
              <Button
                onClick={scrollToContact}
                size="lg"
                className="bg-gold hover:bg-gold/90 text-forest-900 font-semibold px-6 md:px-8 py-5 md:py-6 text-base md:text-lg w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Get Free {locationName} Quote
              </Button>
              <Button
                onClick={() => handlePhoneClick('01527874143')}
                size="lg"
                className="bg-forest-800 hover:bg-forest-900 text-white border-2 border-white/30 font-semibold px-6 md:px-8 py-5 md:py-6 text-base md:text-lg w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Phone className="mr-2" size={20} />
                Call Us Now
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-white/90">
              {trustBadges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <div key={index} className="flex items-center gap-2">
                    <Icon size={18} className="text-gold flex-shrink-0" />
                    <span className="text-sm md:text-base font-medium" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
                      {badge.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationHero;
