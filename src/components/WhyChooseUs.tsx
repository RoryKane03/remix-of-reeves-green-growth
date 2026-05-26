
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Award, Shield } from 'lucide-react';
import AccreditationCarousel from './AccreditationCarousel';

const topReasons = [
  {
    icon: Shield,
    title: "Fully Qualified Tree Surgeons",
    description: "NPTC- and Lantra-qualified team trained for safe, professional tree surgery across the West Midlands.",
    proof: "NPTC, Lantra, CSCS, IPAF certified."
  },
  {
    icon: CheckCircle,
    title: "20+ Years Local Experience",
    description: "Over two decades helping homeowners and businesses with tree removal, pruning, hedge cutting and stump grinding.",
    proof: "40,000+ local jobs completed since 2002."
  }
];

const WhyChooseUs = () => {
  return (
    <section id="about" className="py-16 md:py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 lg:px-6">
        <div className="max-w-4xl mx-auto text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Why choose Reeves Tree Surgeons?
          </h2>
          
          <p className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-muted-foreground mt-8">
            As the West Midlands trusted tree care specialists, we combine professional expertise with 
            local knowledge to deliver exceptional results for every project.
          </p>
        </div>

        {/* Top Two Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 max-w-5xl mx-auto mb-16 mt-12">
          {topReasons.map((reason, index) => {
            const IconComponent = reason.icon;
            return (
              <Card
                key={index}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 lg:p-8">
                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                      <IconComponent size={28} className="text-primary" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-semibold mb-4 leading-tight text-foreground">
                    {reason.title}
                  </h3>
                  
                  <p className="text-base leading-relaxed mb-4 text-muted-foreground">
                    {reason.description}
                  </p>
                  
                  <p className="text-sm text-muted-foreground/80">
                    {reason.proof}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* ARB Accreditation Highlight Section */}
        <div className="max-w-4xl mx-auto text-center p-8 lg:p-12 rounded-lg bg-card border border-border shadow-sm animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <h3 className="text-2xl md:text-3xl font-semibold mb-8 leading-tight text-foreground">
            ARB Approved & Accredited
          </h3>
          
          <div className="mb-8">
            <img 
              src="/lovable-uploads/9d4ff5d5-8c94-41e7-8f0d-cbe87753fa83.png" 
              alt="ARB Approved Contractor logo"
              className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain mx-auto hover:scale-105 transition-transform duration-200"
              loading="lazy"
            />
          </div>
          
          <p className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-muted-foreground">
            We are proud to be an ARB Approved Contractor, fully accredited since 2020 and certified with TrustMark and SafeContractor. This recognition demonstrates our commitment to safe, professional, and high-quality tree surgery services across the West Midlands. Choosing an ARB Approved contractor ensures your tree work meets the highest standards of safety and industry best practice.
          </p>
        </div>
      </div>
      
      <div className="mt-8 lg:mt-12">
        <AccreditationCarousel />
      </div>
    </section>
  );
};

export default WhyChooseUs;
