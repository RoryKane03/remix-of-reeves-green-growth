import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const clientLogos = [
  {
    id: 'mcdonalds',
    name: 'McDonalds',
    image: '/lovable-uploads/1f336b50-c32d-4518-ac84-c6ed91fa2ec2.png',
    alt: 'McDonalds logo'
  },
  {
    id: 'bromsgrove-council',
    name: 'Bromsgrove District Council & Redditch Borough Council',
    image: '/lovable-uploads/76abd4d3-d2f7-4975-98db-37c5adcf2dac.png',
    alt: 'Bromsgrove District Council and Redditch Borough Council logos'
  },
  {
    id: 'ringway',
    name: 'Ringway',
    image: '/lovable-uploads/c8664b0d-0cc4-4276-b5eb-e437fd2426bc.png',
    alt: 'Ringway logo'
  },
  {
    id: 'mitchells-butlers',
    name: 'Mitchells & Butlers',
    image: '/lovable-uploads/6e0555a8-6ca9-4bfa-8530-b78b8ffdef20.png',
    alt: 'Mitchells & Butlers logo'
  },
  {
    id: 'nurture',
    name: 'Nurture',
    image: '/lovable-uploads/92b1d3e8-4575-402d-a660-68aef18ed91b.png',
    alt: 'Nurture logo'
  },
  {
    id: 'eurovia',
    name: 'Eurovia',
    image: '/lovable-uploads/2b2e8c61-0508-4d41-8deb-f14d4497c63d.png',
    alt: 'Eurovia logo'
  },
  {
    id: 'bellway',
    name: 'Bellway',
    image: '/lovable-uploads/8583cd8c-82ce-46cb-947e-136a5f8e9ebe.png',
    alt: 'Bellway logo'
  },
  {
    id: 'dodd-group',
    name: 'Dodd Group',
    image: '/lovable-uploads/b9a73f38-42e9-4d80-9ae6-7f833548d992.png',
    alt: 'Dodd Group logo'
  }
];

const OurClients = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1); // Mobile: 1 logo per slide
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

  const totalGroups = Math.ceil(clientLogos.length / visibleCount);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalGroups);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalGroups) % totalGroups);
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

  const getCurrentLogos = () => {
    const startIdx = currentIndex * visibleCount;
    return clientLogos.slice(startIdx, startIdx + visibleCount);
  };

  const scrollToQuote = () => {
    const quoteSection = document.getElementById('quote-form');
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-4 lg:px-6">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
            Our Clients
          </h2>
        </div>
        
        <div className="relative flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-0 z-10 h-10 w-10 lg:h-11 lg:w-11 rounded-full bg-transparent border-2 border-forest-600 text-forest-600 hover:bg-forest-600 hover:text-white transition-colors duration-200 active:scale-100 active:translate-y-0"
            aria-label="Previous clients"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div
            className="flex-1 max-w-4xl mx-12"
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="region"
            aria-label="Client logos carousel"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex justify-center items-center gap-8 px-4">
              {getCurrentLogos().map((client, index) => (
                <div
                  key={`${client.id}-${currentIndex}-${index}`}
                  className="flex-1 max-w-[300px] px-4"
                >
                  <div className="h-32 sm:h-36 lg:h-40 flex items-center justify-center transition-all duration-200 ease-in-out hover:scale-105 hover:drop-shadow-md">
                    <img
                      src={client.image}
                      alt={client.alt}
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
            className="absolute right-0 z-10 h-10 w-10 lg:h-11 lg:w-11 rounded-full bg-transparent border-2 border-forest-600 text-forest-600 hover:bg-forest-600 hover:text-white transition-colors duration-200 active:scale-100 active:translate-y-0"
            aria-label="Next clients"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalGroups }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentIndex ? 'bg-forest-600' : 'bg-muted'
              }`}
              aria-label={`Go to client group ${index + 1}`}
            />
          ))}
        </div>

        <div className="text-center mt-12 lg:mt-16">
          <Button
            onClick={scrollToQuote}
            size="lg"
            className="shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            Request Free Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OurClients;
