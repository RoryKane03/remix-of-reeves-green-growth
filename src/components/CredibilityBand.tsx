import { useState, useEffect, useCallback } from "react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import mcdonaldsLogo from "@/assets/partners/mcdonalds-logo.png";
import mitchellsButlersLogo from "@/assets/partners/mitchells-butlers-logo.png";
import councilsLogo from "@/assets/partners/councils-logo.png";
import nurtureLogo from "@/assets/partners/nurture-logo.png";
import tescoLogo from "@/assets/partners/tesco-logo.png";
import ringwayLogo from "@/assets/partners/ringway-logo.png";
import bellwayLogo from "@/assets/partners/bellway-logo.png";
import euroviaLogo from "@/assets/partners/eurovia-logo.png";
import doddGroupLogo from "@/assets/partners/dodd-group-logo.png";
import davidLloydLogo from "@/assets/partners/david-lloyd-logo.png";
import lioncourtHomesLogo from "@/assets/partners/lioncourt-homes-logo.png";
import ngmLogo from "@/assets/partners/ngm-logo.png";
import harperLogo from "@/assets/partners/harper-logo.png";
import lhealyLogo from "@/assets/partners/lhealy-logo.png";
import chicLogo from "@/assets/partners/chic-logo.png";
import worcestershireCouncilLogo from "@/assets/partners/worcestershire-council-logo.png";
import crContractsLogo from "@/assets/partners/cr-contracts-logo.png";
const CredibilityBand = () => {
  const [mobileApi, setMobileApi] = useState<CarouselApi>();
  const [desktopApi, setDesktopApi] = useState<CarouselApi>();
  const [isMobileReady, setIsMobileReady] = useState(false);
  const [isDesktopReady, setIsDesktopReady] = useState(false);

  useEffect(() => {
    if (!mobileApi) return;
    
    const handleInit = () => setIsMobileReady(true);
    
    // Check if already initialized
    if (mobileApi.canScrollPrev() !== undefined) {
      setIsMobileReady(true);
    }
    
    mobileApi.on('init', handleInit);
    return () => {
      mobileApi.off('init', handleInit);
    };
  }, [mobileApi]);

  useEffect(() => {
    if (!desktopApi) return;
    
    const handleInit = () => setIsDesktopReady(true);
    
    // Check if already initialized
    if (desktopApi.canScrollPrev() !== undefined) {
      setIsDesktopReady(true);
    }
    
    desktopApi.on('init', handleInit);
    return () => {
      desktopApi.off('init', handleInit);
    };
  }, [desktopApi]);

  const scrollMobilePrev = useCallback(() => {
    if (mobileApi && isMobileReady) {
      mobileApi.scrollPrev();
    }
  }, [mobileApi, isMobileReady]);

  const scrollMobileNext = useCallback(() => {
    if (mobileApi && isMobileReady) {
      mobileApi.scrollNext();
    }
  }, [mobileApi, isMobileReady]);

  const scrollDesktopPrev = useCallback(() => {
    if (desktopApi && isDesktopReady) {
      desktopApi.scrollPrev();
    }
  }, [desktopApi, isDesktopReady]);

  const scrollDesktopNext = useCallback(() => {
    if (desktopApi && isDesktopReady) {
      desktopApi.scrollNext();
    }
  }, [desktopApi, isDesktopReady]);
  
  const partners = [{
    name: "McDonald's",
    logo: mcdonaldsLogo
  }, {
    name: "Mitchells & Butlers",
    logo: mitchellsButlersLogo
  }, {
    name: "Bromsgrove & Redditch Councils",
    logo: councilsLogo
  }, {
    name: "Nurture Landscapes",
    logo: nurtureLogo
  }, {
    name: "Tesco",
    logo: tescoLogo
  }, {
    name: "Ringway",
    logo: ringwayLogo
  }, {
    name: "Bellway Homes",
    logo: bellwayLogo
  }, {
    name: "Eurovia",
    logo: euroviaLogo
  }, {
    name: "Dodd Group",
    logo: doddGroupLogo
  }, {
    name: "David Lloyd Clubs",
    logo: davidLloydLogo
  }, {
    name: "Lioncourt Homes",
    logo: lioncourtHomesLogo
  }, {
    name: "NGM",
    logo: ngmLogo
  }, {
    name: "Harper",
    logo: harperLogo
  }, {
    name: "L.Healy Ltd",
    logo: lhealyLogo
  }, {
    name: "CHIC DPS Supplier",
    logo: chicLogo
  }, {
    name: "Worcestershire County Council",
    logo: worcestershireCouncilLogo
  }, {
    name: "C&R Contracts Ltd",
    logo: crContractsLogo
  }];

  // Group partners into slides of 2 for desktop, 1 for mobile
  const getGroupedPartners = (itemsPerSlide: number) => {
    const slides = [];
    for (let i = 0; i < partners.length; i += itemsPerSlide) {
      slides.push(partners.slice(i, i + itemsPerSlide));
    }
    return slides;
  };

  const desktopSlides = getGroupedPartners(3);
  const mobileSlides = partners.map(p => [p]); // 1 per slide on mobile

  return <section className="py-16 bg-white shadow-sm">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="space-y-12">
          {/* Heading */}
          <h2 className="text-center text-xs md:text-sm font-semibold uppercase tracking-wider" style={{
          color: '#777'
        }}>TRUSTED BY LEADING ORGANISATIONS ACROSS THE UNITED KINGDOM</h2>

          {/* Mobile Carousel - 1 logo per slide */}
          <div className="relative px-12 md:hidden">
            <Carousel 
              setApi={setMobileApi}
              opts={{
                align: "center",
                loop: true
              }} 
              className="w-full"
            >
              <CarouselContent>
                {mobileSlides.map((slide, slideIndex) => <CarouselItem key={slideIndex}>
                    <div className="flex items-center justify-center w-full h-52 py-10">
                      <img src={slide[0].logo} alt={`${slide[0].name} logo`} className="max-w-full max-h-full object-contain transition-all duration-300 hover:scale-110" loading="lazy" />
                    </div>
                  </CarouselItem>)}
              </CarouselContent>
              <Button
                variant="ghost"
                size="icon"
                onClick={scrollMobilePrev}
                disabled={!isMobileReady}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 lg:h-11 lg:w-11 rounded-full bg-transparent border-2 border-forest-600 text-forest-600 hover:bg-forest-600 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed pointer-events-auto"
                aria-label="Previous partners"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={scrollMobileNext}
                disabled={!isMobileReady}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 lg:h-11 lg:w-11 rounded-full bg-transparent border-2 border-forest-600 text-forest-600 hover:bg-forest-600 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed pointer-events-auto"
                aria-label="Next partners"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </Carousel>
          </div>

          {/* Desktop Carousel - 3 logos per slide */}
          <div className="relative px-12 hidden md:block">
            <Carousel 
              setApi={setDesktopApi}
              opts={{
                align: "center",
                loop: true
              }} 
              className="w-full"
            >
              <CarouselContent>
                {desktopSlides.map((slide, slideIndex) => <CarouselItem key={slideIndex}>
                    <div className="grid grid-cols-3 gap-10 items-center justify-items-center py-12 px-8">
                      {slide.map((partner, partnerIndex) => <div key={partnerIndex} className="flex items-center justify-center w-full h-60">
                          <img src={partner.logo} alt={`${partner.name} logo`} className="max-w-full max-h-full object-contain transition-all duration-300 hover:scale-110" loading="lazy" />
                        </div>)}
                    </div>
                  </CarouselItem>)}
              </CarouselContent>
              <Button
                variant="ghost"
                size="icon"
                onClick={scrollDesktopPrev}
                disabled={!isDesktopReady}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 lg:h-11 lg:w-11 rounded-full bg-transparent border-2 border-forest-600 text-forest-600 hover:bg-forest-600 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed pointer-events-auto"
                aria-label="Previous partners"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={scrollDesktopNext}
                disabled={!isDesktopReady}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 lg:h-11 lg:w-11 rounded-full bg-transparent border-2 border-forest-600 text-forest-600 hover:bg-forest-600 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed pointer-events-auto"
                aria-label="Next partners"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </Carousel>
          </div>
        </div>
      </div>
    </section>;
};
export default CredibilityBand;