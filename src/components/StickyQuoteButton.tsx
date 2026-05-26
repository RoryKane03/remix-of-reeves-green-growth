import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { useState, useEffect } from 'react';

const StickyQuoteButton = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Cache layout readings to prevent multiple forced reflows
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          
          setIsVisible(
            scrollY > windowHeight * 0.5 && 
            scrollY < documentHeight - windowHeight - 200
          );
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    navigate('/contact');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 lg:hidden">
      <Button 
        onClick={scrollToContact}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-xl shadow-lg animate-pulse max-w-screen-sm mx-auto"
        size="lg"
      >
        <FileText className="mr-2" size={20} />
        Get FREE Quote Now
      </Button>
    </div>
  );
};

export default StickyQuoteButton;
