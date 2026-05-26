
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm">
      <Link 
        to="/" 
        className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
        style={{ color: 'var(--text-500)' }}
      >
        <Home size={16} />
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight size={16} style={{ color: 'var(--text-500)' }} />
          {item.current ? (
            <span 
              className="font-medium"
              style={{ color: 'var(--text-900)' }}
            >
              {item.label}
            </span>
          ) : (
            <Link 
              to={item.href} 
              className="hover:underline transition-colors"
              style={{ color: 'var(--text-500)' }}
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
