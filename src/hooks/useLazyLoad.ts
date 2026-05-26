import { useState, useEffect, useRef } from 'react';

interface UseLazyLoadOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
}

export const useLazyLoad = (options: UseLazyLoadOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '50px 0px',
    delay = 0
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentElement = elementRef.current;
    console.log('useLazyLoad: Element ref:', !!currentElement);
    
    if (!currentElement) {
      console.log('useLazyLoad: No element ref, showing immediately');
      setIsVisible(true);
      return;
    }

    // Check if IntersectionObserver is supported
    if (!window.IntersectionObserver) {
      console.log('useLazyLoad: IntersectionObserver not supported, showing immediately');
      setIsVisible(true);
      return;
    }

    console.log('useLazyLoad: Setting up observer with threshold:', threshold, 'rootMargin:', rootMargin);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log('useLazyLoad: Intersection entry:', entry.isIntersecting, entry.intersectionRatio);
          if (entry.isIntersecting) {
            console.log('useLazyLoad: Element is intersecting, showing content');
            if (delay > 0) {
              setTimeout(() => {
                setIsVisible(true);
              }, delay);
            } else {
              setIsVisible(true);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin, delay]);

  return { elementRef, isVisible };
};