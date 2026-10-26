import { Button } from "@/components/ui/button";
import { cdnImage, cdnSrcSet } from '@/utils/netlifyImage';
import { useNavigate } from "react-router-dom";

const TrustedSince = () => {
  const navigate = useNavigate();
  
  const handleLearnMore = () => {
    navigate('/about');
  };
  
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-muted/50">
      <div className="container mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
              Trusted Tree Surgeons in West Midlands Since 2002
            </h2>
            
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              As ARB Approved tree surgeons, we've provided expert tree surgery, hedge cutting, and stump grinding across the West Midlands for over 20 years. Homeowners and businesses trust us for safe, reliable, and affordable tree care.
            </p>

            <div>
              <Button 
                onClick={handleLearnMore} 
                size="lg"
                className="shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                Learn More About Us
              </Button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="order-first lg:order-last">
            <div className="aspect-[16/10] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img 
                src={cdnImage('/lovable-uploads/26fe9352-cca5-4102-aedb-6ba7f5c2de66.png', 1022)}
                srcSet={cdnSrcSet('/lovable-uploads/26fe9352-cca5-4102-aedb-6ba7f5c2de66.png', [480, 800, 1022])}
                sizes="(min-width: 1024px) 50vw, 100vw"
                alt="Reeves Tree Surgeons team - 20 fully qualified NPTC and Lantra certified arborists with 20+ years experience across Birmingham, Solihull, Worcester, and West Midlands" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                loading="lazy" 
                width="1022" 
                height="638" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedSince;
