import { Button } from '@/components/ui/button';
import { Phone, ArrowRight } from 'lucide-react';
import { handlePhoneClick } from '@/utils/phoneTracking';

const GalleryCTA = () => {
  const scrollToContact = () => {
    window.location.href = '/contact';
  };

  const callNow = () => {
    handlePhoneClick('01527874143');
  };

  return (
    <section className="py-16 md:py-20 relative overflow-hidden bg-gradient-brand">
      {/* Subtle pattern overlay matching homepage */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto max-w-4xl px-6 relative z-10">
        <div className="text-center space-y-6">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Ready to Transform Your Outdoor Space?
          </h2>
          
          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Get a free, no-obligation quote from West Midlands' most trusted tree surgeons. Professional service since 2002.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button
            onClick={scrollToContact}
            size="lg"
            className="font-semibold px-8 py-6 text-lg w-full sm:w-auto shadow-md hover:shadow-lg transition-all duration-200"
            style={{ backgroundColor: '#D4AF37', color: '#2D5F3F' }}
          >
            Get Free Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
            
            <Button
              onClick={callNow}
              size="lg"
              variant="outline"
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary font-semibold px-8 py-6 text-lg w-full sm:w-auto transition-all duration-300 hover:scale-105"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Us Now
            </Button>
          </div>

          {/* Trust indicator */}
          <p className="text-sm text-white/70 pt-2">
            ✓ Free quotes ✓ Fully insured ✓ NPTC qualified ✓ Available 24/7
          </p>
        </div>
      </div>
    </section>
  );
};

export default GalleryCTA;