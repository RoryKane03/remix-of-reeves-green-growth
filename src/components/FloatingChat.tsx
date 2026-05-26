import { MessageCircle, Phone } from 'lucide-react';
import { useState } from 'react';

const FloatingChat = () => {
  const [showOptions, setShowOptions] = useState(false);

  const handleWhatsApp = () => {
    window.open('https://wa.me/447527123456?text=Hi, I need help with tree surgery services', '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:01527874143';
  };

  return (
    <div className="fixed right-4 z-45 md:bottom-6" style={{ bottom: 'max(88px, calc(env(safe-area-inset-bottom) + 72px))' }}>
      <div className="flex flex-col items-end gap-3">
        {showOptions && (
          <div className="flex flex-col gap-2 animate-fade-up">
            <button
              onClick={handleCall}
              className="flex items-center gap-2 bg-trust text-trust-foreground px-4 py-3 rounded-xl shadow-nature hover:scale-105 transition-all duration-200"
            >
              <Phone size={18} />
              <span className="font-medium">Call Now</span>
            </button>
            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-2 bg-success text-success-foreground px-4 py-3 rounded-xl shadow-nature hover:scale-105 transition-all duration-200"
            >
              <MessageCircle size={18} />
              <span className="font-medium">WhatsApp</span>
            </button>
          </div>
        )}
        
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="bg-primary text-primary-foreground p-4 rounded-full shadow-hero hover:scale-110 transition-all duration-200 animate-nature-glow"
        >
          <MessageCircle size={24} />
        </button>
      </div>
    </div>
  );
};

export default FloatingChat;
