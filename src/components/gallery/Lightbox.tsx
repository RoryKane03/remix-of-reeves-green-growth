import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

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

  const navButtonClass =
    'absolute top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:h-14 md:w-14';

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black/95"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onClick={onClose}
    >
      {/* Close button — fixed to the corner, above everything */}
      <button
        type="button"
        aria-label="Close image viewer"
        className="absolute top-3 right-3 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:top-5 md:right-5 md:h-12 md:w-12"
        style={{ top: 'max(12px, env(safe-area-inset-top))', right: 'max(12px, env(safe-area-inset-right))' }}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <X className="h-6 w-6" strokeWidth={2.5} />
      </button>

      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            className={`${navButtonClass} left-2 md:left-4`}
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('prev');
            }}
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          <button
            type="button"
            aria-label="Next image"
            className={`${navButtonClass} right-2 md:right-4`}
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('next');
            }}
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </>
      )}

      {/* Image area — leaves room for buttons and the counter */}
      <div
        className="flex min-h-0 flex-1 items-center justify-center px-16 py-14 md:px-20 md:py-16"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
        />
      </div>

      {/* Counter */}
      {images.length > 1 && (
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-sm text-white">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Touch/swipe instructions */}
      <div className="pointer-events-none absolute bottom-4 left-4 hidden text-sm text-white/70 md:block">
        Use arrow keys or click arrows to navigate • ESC to close
      </div>
    </div>,
    document.body
  );
};

export default Lightbox;
