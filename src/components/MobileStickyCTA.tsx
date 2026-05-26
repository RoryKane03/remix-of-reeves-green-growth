import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FileText, ArrowRight } from 'lucide-react';

const MobileStickyCTA = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  
  // Don't show on contact page - user is already there
  if (location.pathname === '/contact') return null;

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky button only after scrolling past 85% of viewport height (hero section)
      const heroHeight = window.innerHeight * 0.85;
      setIsVisible(window.scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    navigate('/contact');
  };

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 border-t shadow-lg" style={{ 
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)'
    }}>
      <button
        onClick={scrollToContact}
        className="w-full flex items-center justify-center gap-2 rounded-lg font-medium text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        style={{
          backgroundColor: '#2D5F3F',
          color: 'white',
          minHeight: '48px',
          padding: '12px 24px',
          boxShadow: '0 4px 12px rgba(45, 95, 63, 0.3)'
        }}
      >
        <FileText className="h-5 w-5" />
        <span>Get Free Quote</span>
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default MobileStickyCTA;
