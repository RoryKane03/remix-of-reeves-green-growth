import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LightboxImage {
  id: number;
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  currentImageId: number;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

const Lightbox = ({ images, currentImageId, onClose, onNavigate }: LightboxProps) => {
  const currentImage = images.find(img => img.id === currentImageId);
  const currentIndex = images.findIndex(img => img.id === currentImageId);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onNavigate('prev');
          break;
        case 'ArrowRight':
          onNavigate('next');
          break;
      }
    };

    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onNavigate]);

  if (!currentImage) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10 text-white hover:bg-white/20 rounded-full"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('prev');
            }}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('next');
            }}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Image container */}
      <div 
        className="relative w-[90vw] max-w-7xl h-[80vh] md:h-[85vh] flex items-center justify-center px-12 md:px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="w-full h-full object-contain rounded-lg shadow-2xl"
        />
        
        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Touch/swipe instructions */}
      <div className="absolute bottom-4 left-4 text-white/70 text-sm hidden md:block">
        Use arrow keys or click arrows to navigate • ESC to close
      </div>
    </div>
  );
};

export default Lightbox;