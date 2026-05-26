import React, { useState, useEffect, Suspense } from 'react';
import { useLazyLoad } from '@/hooks/useLazyLoad';
import { SectionSkeleton } from '@/components/skeletons/SectionSkeleton';

const ContactFormLazy = React.lazy(() => import('@/components/ContactForm'));

interface BotProtectedFormProps {
  id?: string;
  className?: string;
}

export const BotProtectedForm: React.FC<BotProtectedFormProps> = ({ 
  id = 'contact', 
  className = '' 
}) => {
  const [isFormReady, setIsFormReady] = useState(false);
  const [honeypotValue, setHoneypotValue] = useState('');
  
  const { elementRef, isVisible } = useLazyLoad({
    threshold: 0.3,
    rootMargin: '50px 0px',
    delay: 800 // Increased delay for bot protection
  });

  useEffect(() => {
    if (isVisible) {
      // Additional delay before showing the actual form
      const timer = setTimeout(() => {
        setIsFormReady(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Honeypot field that should remain empty
  const handleHoneypotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHoneypotValue(e.target.value);
  };

  return (
    <div ref={elementRef} id={id} className={className}>
      {/* Honeypot field - hidden from users but visible to bots */}
      <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
        <input
          type="text"
          name="website"
          value={honeypotValue}
          onChange={handleHoneypotChange}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
      </div>

      {isVisible && isFormReady ? (
        <Suspense fallback={<SectionSkeleton type="contact" />}>
          <div className="transition-opacity duration-700 ease-in-out animate-fade-in">
            <ContactFormLazy />
          </div>
        </Suspense>
      ) : (
        <SectionSkeleton type="contact" />
      )}
    </div>
  );
};