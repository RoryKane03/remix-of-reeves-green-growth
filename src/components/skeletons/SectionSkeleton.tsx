import { Skeleton } from '@/components/ui/skeleton';

interface SectionSkeletonProps {
  type: 'services' | 'clients' | 'testimonials' | 'gallery' | 'contact' | 'default';
  className?: string;
}

export const SectionSkeleton = ({ type, className = '' }: SectionSkeletonProps) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'services':
        return (
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Skeleton className="h-10 w-80 mx-auto mb-4" />
              <Skeleton className="h-4 w-96 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          </div>
        );

      case 'clients':
        return (
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Skeleton className="h-8 w-48 mx-auto mb-4" />
              <Skeleton className="h-1 w-24 mx-auto" />
            </div>
            <div className="flex justify-center items-center gap-8">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-32" />
              ))}
            </div>
            <div className="flex justify-center mt-6 gap-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="w-2 h-2 rounded-full" />
              ))}
            </div>
          </div>
        );

      case 'testimonials':
        return (
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Skeleton className="h-10 w-64 mx-auto mb-4" />
              <Skeleton className="h-4 w-80 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-4 p-6 bg-white rounded-lg">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Skeleton key={j} className="w-4 h-4" />
                    ))}
                  </div>
                  <Skeleton className="h-20 w-full" />
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Skeleton className="h-10 w-48 mx-auto mb-4" />
              <Skeleton className="h-4 w-72 mx-auto" />
            </div>
            <div className="flex justify-center gap-4 mb-8">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-20 rounded-full" />
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-lg" />
              ))}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Skeleton className="h-10 w-64 mx-auto mb-4" />
              <Skeleton className="h-4 w-96 mx-auto" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="space-y-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-32 w-full" />
                </div>
                <Skeleton className="h-12 w-full" />
              </div>
              <div className="space-y-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="w-12 h-12 rounded-lg" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
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
        );
    }
  };

  return (
    <div className={`py-16 animate-pulse ${className}`}>
      {renderSkeleton()}
    </div>
  );
};