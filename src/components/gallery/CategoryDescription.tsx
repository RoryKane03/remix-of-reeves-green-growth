import { TreePine, Scissors, Disc, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

type CategoryType = 'tree-work' | 'hedge-cutting' | 'stump-grinding' | 'site-clearance';

interface CategoryDescriptionProps {
  category: CategoryType;
}

const categoryData = {
  'tree-work': {
    icon: TreePine,
    title: 'Professional Tree Work',
    description: 'Expert tree surgery including crown reduction, tree pruning, tree removal, sectional dismantling, and emergency tree services across the West Midlands. Our qualified arborists use specialist equipment to ensure safe, efficient tree work.',
    link: '/tree-work'
  },
  'hedge-cutting': {
    icon: Scissors,
    title: 'Expert Hedge Cutting',
    description: 'Professional hedge trimming and maintenance services for residential gardens and commercial properties. From formal topiary to boundary hedges, we deliver precise, clean results every time.',
    link: '/hedge-cutting'
  },
  'stump-grinding': {
    icon: Disc,
    title: 'Efficient Stump Grinding',
    description: 'Complete stump removal using specialist grinding equipment, suitable for gardens and sites of all sizes. We grind stumps below ground level, leaving your space ready for replanting or landscaping.',
    link: '/stump-grinding'
  },
  'site-clearance': {
    icon: Building2,
    title: 'Complete Site Clearance',
    description: 'Comprehensive site clearance and vegetation management for development projects, land reclamation, and commercial sites. We handle everything from tree removal to debris clearance with efficiency.',
    link: '/commercial-site-clearance'
  }
};

const CategoryDescription = ({ category }: CategoryDescriptionProps) => {
  const data = categoryData[category];
  const Icon = data.icon;

  return (
    <div className="mb-12 animate-fade-in">
      <div 
        className="rounded-2xl p-8 lg:p-10 shadow-lg"
        style={{ backgroundColor: 'var(--neutral-050)' }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div 
            className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: 'hsl(var(--primary))' }}
          >
            <Icon className="w-8 h-8 text-primary-foreground" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-2xl lg:text-3xl font-semibold text-foreground mb-3">
              {data.title}
            </h3>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-4">
              {data.description}
            </p>
            <Button 
              asChild 
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Link to={data.link}>
                Learn More About This Service
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDescription;