import { Skeleton } from "@/components/ui/skeleton";

const RouteLoadingFallback = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-20 w-32" />
            <div className="hidden md:flex gap-6">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <main className="pt-24">
        {/* Hero Section Skeleton */}
        <div className="container mx-auto px-4 py-16">
          <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
          <div className="flex justify-center gap-4">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-32" />
          </div>
        </div>

        {/* Content Blocks Skeleton */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer Skeleton */}
      <div className="border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteLoadingFallback;
