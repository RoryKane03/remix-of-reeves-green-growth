
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const workImages = [
  {
    id: 1,
    src: "/lovable-uploads/tree-work-large-removal.jpg",
    alt: "Reeves Tree Surgeons completing large oak removal in West Midlands"
  },
  {
    id: 2,
    src: "/lovable-uploads/stump-grinding-residential-1.jpg",
    alt: "Professional stump grinding service for garden clearance by expert arborists"
  },
  {
    id: 3,
    src: "/lovable-uploads/tree-work-equipment-transport.jpg",
    alt: "Professional tree surgery team managing site clearance and emergency tree work"
  }
];

const WorkInAction = () => {
  return (
    <section id="work" className="py-20 bg-background">
      <div className="container mx-auto max-w-7xl px-4 lg:px-6">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 leading-tight">
            Our Work in Action
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto mb-3">
            Discover the expertise and precision that set Reeves Tree Surgeons apart. Our professional tree surgery team delivers safe, efficient, and high-quality results across the West Midlands — from large oak removals and stump grinding to site clearance and emergency tree work.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
            Explore our recent projects to see the skill, equipment, and care we bring to every job.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {workImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-video">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 px-8 py-6 text-base md:text-lg font-semibold w-full sm:w-auto"
          >
            <Link to="/our-work">
              View More of Our Work
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WorkInAction;
