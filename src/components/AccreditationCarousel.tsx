import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import trustmarkLogo from '@/assets/accreditations/trustmark.png';
import safecontractorLogo from '@/assets/accreditations/safecontractor.png';
import nptcLogo from '@/assets/accreditations/nptc.png';
import lantraLogo from '@/assets/accreditations/lantra.png';
import cityGuildsLogo from '@/assets/accreditations/city-guilds.png';
import ipafLogo from '@/assets/accreditations/ipaf.png';
import swqrLogo from '@/assets/accreditations/swqr.png';
import forestryEnglandLogo from '@/assets/accreditations/forestry-england.png';
import cscsLogo from '@/assets/accreditations/cscs.png';
import nporsLogo from '@/assets/accreditations/npors.png';
import citbSmstsLogo from '@/assets/accreditations/citb-smsts.png';

const accreditations = [
  {
    id: 'trustmark',
    name: 'TrustMark Government Endorsed Quality',
    image: trustmarkLogo,
    alt: 'TrustMark Government Endorsed Quality certification'
  },
  {
    id: 'safecontractor',
    name: 'SafeContractor Approved',
    image: safecontractorLogo,
    alt: 'SafeContractor Approved certification badge'
  },
  {
    id: 'nptc',
    name: 'NPTC Qualified Workforce',
    image: nptcLogo,
    alt: 'NPTC Qualified Workforce certification'
  },
  {
    id: 'lantra',
    name: 'Lantra Awards Approved',
    image: lantraLogo,
    alt: 'Lantra Awards Approved certification'
  },
  {
    id: 'city-guilds',
    name: 'City & Guilds Qualified',
    image: cityGuildsLogo,
    alt: 'City & Guilds qualification certification'
  },
  {
    id: 'ipaf',
    name: 'IPAF Certified',
    image: ipafLogo,
    alt: 'IPAF certification for powered access'
  },
  {
    id: 'swqr',
    name: 'SWQR Registered',
    image: swqrLogo,
    alt: 'SWQR (Sustainable Waste Quality Register) certification'
  },
  {
    id: 'forestry-england',
    name: 'Forestry England Approved',
    image: forestryEnglandLogo,
    alt: 'Forestry England approved contractor'
  },
  {
    id: 'cscs',
    name: 'CSCS Certified',
    image: cscsLogo,
    alt: 'CSCS (Construction Skills Certification Scheme) certification'
  },
  {
    id: 'npors',
    name: 'NPORS Registered',
    image: nporsLogo,
    alt: 'NPORS (National Plant Operators Registration Scheme) registration'
  },
  {
    id: 'citb-smsts',
    name: 'CITB SMSTS Qualified',
    image: citbSmstsLogo,
    alt: 'CITB SMSTS (Site Management Safety Training Scheme) qualification'
  }
];

const AccreditationCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1); // Mobile: 1 logo per slide (like Our Clients)
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2); // Tablet: 2 logos per slide
      } else {
        setVisibleCount(3); // Desktop: 3 logos per slide
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const totalGroups = Math.ceil(accreditations.length / visibleCount);

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % totalGroups);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + totalGroups) % totalGroups);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToNext();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToPrevious();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;
    
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
  };

  const getCurrentBadges = () => {
    const startIdx = currentIndex * visibleCount;
    return accreditations.slice(startIdx, startIdx + visibleCount);
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-neutral-050">
      <div className="container mx-auto max-w-7xl px-4 lg:px-6">
        <div className="text-center mb-12 lg:mb-16">
          <h2 style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-900)' }}>
            Our accreditations & certifications
          </h2>
          <div 
            className="w-24 h-1 mx-auto mt-6 rounded-full"
            style={{ background: 'var(--accent-emerald)' }}
          />
        </div>
        
        <div className="relative flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            disabled={isTransitioning}
            className="absolute left-0 z-10 h-10 w-10 lg:h-11 lg:w-11 rounded-full bg-transparent border-2 border-forest-600 text-forest-600 hover:bg-forest-600 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed pointer-events-auto"
            aria-label="Previous accreditations"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div
            className="flex-1 max-w-4xl mx-12"
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="region"
            aria-label="Accreditation badges carousel"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex justify-center items-center gap-8 px-4">
              {getCurrentBadges().map((accreditation, index) => (
                <div
                  key={`${accreditation.id}-${currentIndex}-${index}`}
                  className="flex-1 max-w-[300px] px-4"
                >
                  <div className="h-32 sm:h-36 lg:h-40 flex items-center justify-center transition-all duration-200 ease-in-out hover:scale-105 hover:drop-shadow-md">
                    <img
                      src={accreditation.image}
                      alt={accreditation.alt}
                      className="max-h-full max-w-full object-contain transition-all duration-200"
                      style={{ 
                        maxHeight: '128px', 
                        height: 'auto',
                        width: 'auto'
                      }}
                      width="128"
                      height="128"
                      loading={currentIndex === 0 && index < visibleCount ? 'eager' : 'lazy'}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            disabled={isTransitioning}
            className="absolute right-0 z-10 h-10 w-10 lg:h-11 lg:w-11 rounded-full bg-transparent border-2 border-forest-600 text-forest-600 hover:bg-forest-600 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed pointer-events-auto"
            aria-label="Next accreditations"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalGroups }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsTransitioning(false), 300);
                }
              }}
              disabled={isTransitioning}
              className={`w-3 h-3 rounded-full transition-colors duration-200 disabled:cursor-not-allowed ${
                index === currentIndex ? 'bg-forest-600' : 'bg-muted'
              }`}
              aria-label={`Go to accreditation group ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccreditationCarousel;
