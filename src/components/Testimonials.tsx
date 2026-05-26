import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [{
  name: "Sarah Johnson",
  location: "Bromsgrove",
  rating: 5,
  text: "Exceptional service from start to finish. The team removed a dangerous oak tree from our garden professionally and safely. Highly recommended.",
  service: "Tree removal"
}, {
  name: "Mike Thompson",
  location: "Redditch",
  rating: 5,
  text: "Called Reeves for an emergency after storm damage. They responded within 2 hours and had everything sorted the same day. Professional and efficient.",
  service: "Emergency response"
}, {
  name: "Lisa Davies",
  location: "Alvechurch",
  rating: 5,
  text: "Annual pruning service for our commercial property. The team is always punctual, professional, and leaves the site spotless. Been using them for 3 years now.",
  service: "Commercial maintenance"
}, {
  name: "Robert Smith",
  location: "Hagley",
  rating: 5,
  text: "Fantastic crown reduction work on our mature beech trees. The results look natural and the trees are much healthier. Great value for money.",
  service: "Crown reduction"
}, {
  name: "Amanda Wilson",
  location: "Droitwich",
  rating: 5,
  text: "Stump grinding service was quick and efficient. They cleaned up perfectly afterwards - you'd never know there was a tree there. Will definitely use again.",
  service: "Stump grinding"
}];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Auto-advance testimonials (slower on mobile for better readability)
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
    }, 8000); // Extended to 8 seconds for mobile reading

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      nextTestimonial();
    }
    if (isRightSwipe) {
      prevTestimonial();
    }
  };

  const handleGoogleReviewClick = () => {
    window.open('https://www.google.com/search?sca_esv=ec05130a92ea38b0&hl=en-GB&gl=uk&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s6Z6q0kL3aY0JhQ720YcQCwskCiZ7iYB2LhbaVCDl2o8JYkFaP8KTu58-XF9VK_65AJO392ezF4jgXd9B6z8kz7Fj8gpS6Z3B_ufUI9QctQ5YmZ5uA%3D%3D&q=Reeves+Tree+Surgeons+Ltd+Reviews&sa=X&ved=2ahUKEwiu7fWAw5SPAxXdVkEAHefTHHEQ0bkNegQIIhAE&biw=1440&bih=812&dpr=2&zx=1755525926140&no_sw_cr=1#lrd=0x4870950e53574707:0x6d1eee4edc468d15,3,,,,', '_blank');
  };

  const handleTrustATraderReviewClick = () => {
    window.open('https://www.trustatrader.com/traders/reeves-tree-surgeons-ltd-bromsgrove', '_blank');
  };

  return <section id="testimonials" className="py-16 md:py-20 lg:py-24 bg-background" aria-label="Customer testimonials">
      <div className="container mx-auto max-w-5xl px-4 lg:px-6">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 leading-tight">
            What our customers say
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Rated 5 stars by homeowners and businesses across the West Midlands
          </p>
        </div>

        <div className="relative">
          {/* Main Testimonial Card - Mobile Optimized */}
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            <CardContent className="p-6 sm:p-8 lg:p-12 text-center">
              <Quote className="mx-auto text-primary/30 mb-6" size={40} />
              
              <div className="flex justify-center mb-6 gap-1">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => 
                  <Star key={i} className="text-yellow-500 fill-current" size={20} />
                )}
              </div>

              <blockquote className="text-base md:text-lg lg:text-xl text-foreground mb-8 leading-relaxed">
                "{testimonials[currentIndex].text}"
              </blockquote>

              <div>
                <div className="font-semibold text-foreground text-lg lg:text-xl">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-muted-foreground mb-2">
                  {testimonials[currentIndex].location}
                </div>
                <div className="text-sm text-primary font-medium">
                  {testimonials[currentIndex].service}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons - Hidden on mobile, visible on desktop */}
          <Button 
            variant="outline" 
            size="icon" 
            onClick={prevTestimonial} 
            aria-label="View previous testimonial"
            className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow-nature hover:shadow-elevated rounded-xl border-accent/20 hover:border-accent/40 hover:scale-105 transition-all duration-200"
          >
            <ChevronLeft size={20} className="text-primary" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={nextTestimonial} 
            aria-label="View next testimonial"
            className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow-nature hover:shadow-elevated rounded-xl border-accent/20 hover:border-accent/40 hover:scale-105 transition-all duration-200"
          >
            <ChevronRight size={20} className="text-primary" />
          </Button>

          {/* Mobile Navigation Buttons */}
          <div className="flex lg:hidden justify-between mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={prevTestimonial} 
              aria-label="View previous testimonial"
              className="bg-white shadow-sm hover:shadow-md rounded-xl border-accent/20 hover:border-accent/40 transition-all duration-200"
            >
              <ChevronLeft size={16} className="text-primary" />
              <span className="ml-1">Previous</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={nextTestimonial} 
              aria-label="View next testimonial"
              className="bg-white shadow-sm hover:shadow-md rounded-xl border-accent/20 hover:border-accent/40 transition-all duration-200"
            >
              <span className="mr-1">Next</span>
              <ChevronRight size={16} className="text-primary" />
            </Button>
          </div>

          {/* Dots Indicator - Larger Touch Targets on Mobile */}
          <div className="flex justify-center gap-3 mt-6 lg:mt-8">
            {testimonials.map((_, index) => (
              <button 
                key={index} 
                onClick={() => goToTestimonial(index)} 
                aria-label={`View testimonial ${index + 1} from ${testimonials[index].name}`}
                className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <span 
                  className={`block w-3 h-3 rounded-full transition-all duration-200 ease-in-out ${index === currentIndex ? 'bg-primary scale-125 shadow-sm' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'}`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Review Buttons - Using design system */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto mt-12">
          <Button
            onClick={handleGoogleReviewClick}
            size="lg"
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            aria-label="Leave us a review on Google"
          >
            <Star className="mr-2 h-5 w-5 text-gold fill-current" />
            Review Us On Google
          </Button>

          <Button
            onClick={handleTrustATraderReviewClick}
            size="lg"
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            aria-label="Leave us a review on TrustATrader"
          >
            <Star className="mr-2 h-5 w-5 text-gold fill-current" />
            Review Us On TrustATrader
          </Button>
        </div>
      </div>
    </section>;
};

export default Testimonials;
