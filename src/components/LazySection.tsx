import React from 'react';
import { useLazyLoad } from '@/hooks/useLazyLoad';
import { Skeleton } from '@/components/ui/skeleton';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  className?: string;
  id?: string;
}

export const LazySection: React.FC<LazySectionProps> = ({
  children,
  fallback,
  threshold = 0.1,
  rootMargin = '50px 0px',
  delay = 0,
  className = '',
  id
}) => {
  const { elementRef, isVisible } = useLazyLoad({
    threshold,
    rootMargin,
    delay
  });

  const defaultFallback = (
    <div className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div ref={elementRef} className={className} id={id}>
      {isVisible ? (
        <div className="animate-fade-in">
          {children}
        </div>
      ) : (
        fallback || defaultFallback
      )}
    </div>
  );
};