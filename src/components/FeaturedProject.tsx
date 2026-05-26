import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeaturedProject = () => {
  const navigate = useNavigate();

  const projects = [
    {
      id: 1,
      image: "/lovable-uploads/f3ae2a98-d484-4b4f-8320-2236d94d3904.png",
      title: "Large Oak Removal",
      description: "Professional removal using crane equipment"
    },
    {
      id: 2,
      image: "/lovable-uploads/e4587469-be1f-4959-a258-62dd2b8a8834.png",
      title: "Stump Grinding",
      description: "Complete stump removal and site clearance"
    },
    {
      id: 3,
      image: "/lovable-uploads/56fdf6b5-eb05-4c88-a572-ff26ba94815d.png",
      title: "Team Tree Work",
      description: "Coordinated large-scale tree surgery"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{ color: '#2B2B2B' }}>
            Our Work in Action
          </h2>
          <p className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto" style={{ color: '#6B7280' }}>
            See the quality and professionalism we bring to every project
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => navigate('/our-work')}
            >
              <div className="aspect-video relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            onClick={() => navigate('/our-work')}
            size="lg"
            className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            style={{ 
              backgroundColor: '#2D5F3F',
              color: 'white',
              minHeight: '48px'
            }}
          >
            View More of Our Work
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProject;
