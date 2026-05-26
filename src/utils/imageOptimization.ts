/**
 * Image optimization utilities for better Core Web Vitals
 */

export interface OptimizedImageConfig {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
}

/**
 * Generate responsive image srcset for different screen sizes
 */
export const generateResponsiveImageSrcSet = (baseSrc: string, sizes: number[] = [640, 768, 1024, 1280, 1536]): string => {
  // For now, return the base image since we don't have image processing
  // In production, this would generate different sized versions
  return baseSrc;
};

/**
 * Calculate optimal image dimensions based on container and device
 */
export const calculateOptimalDimensions = (
  containerWidth: number,
  containerHeight: number,
  devicePixelRatio: number = window.devicePixelRatio || 1
) => {
  const optimalWidth = Math.ceil(containerWidth * devicePixelRatio);
  const optimalHeight = Math.ceil(containerHeight * devicePixelRatio);
  
  return {
    width: optimalWidth,
    height: optimalHeight,
    // Cap at reasonable maximums to avoid huge images
    cappedWidth: Math.min(optimalWidth, 2048),
    cappedHeight: Math.min(optimalHeight, 2048)
  };
};

/**
 * Preload critical images for better LCP
 */
export const preloadCriticalImages = (images: string[]) => {
  images.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  });
};

/**
 * Lazy load images with intersection observer
 */
export const setupLazyLoading = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('loading');
            observer.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px'
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

/**
 * Check if image format is supported
 */
export const supportsWebP = (): Promise<boolean> => {
  return new Promise(resolve => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

/**
 * Get optimal image format based on browser support
 */
export const getOptimalImageFormat = async (originalSrc: string): Promise<string> => {
  const isWebPSupported = await supportsWebP();
  
  if (isWebPSupported && originalSrc.includes('.jpg') || originalSrc.includes('.png')) {
    // In a real implementation, you'd return a WebP version
    // For now, return original
    return originalSrc;
  }
  
  return originalSrc;
};