import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Tag } from 'lucide-react';

const DiscountPopup = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (dismissed) return;

    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, [dismissed]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDismissed(true);
    setVisible(false);
  };

  const handleClick = () => {
    navigate('/contact?discount=MARCH20');
  };

  if (!visible) return null;

  return (
    <div
      onClick={handleClick}
      className="fixed bottom-20 right-4 z-40 w-72 cursor-pointer rounded-lg border-l-4 bg-card shadow-xl transition-all duration-500 animate-fade-in-up"
      style={{ borderLeftColor: 'hsl(var(--primary))' }}
      role="button"
      aria-label="Get 20% off your quote - click to go to contact page"
    >
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        aria-label="Dismiss discount popup"
      >
        <X size={16} />
      </button>

      <div className="p-4">
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold" style={{ backgroundColor: 'hsl(var(--gold))', color: 'hsl(var(--gold-foreground))' }}>
          <Tag size={12} />
          20% OFF
        </div>

        <h4 className="mb-1 text-base font-semibold text-foreground" style={{ fontSize: '16px' }}>
          Get 20% Off Your Quote
        </h4>

        <p className="mb-3 text-sm text-muted-foreground" style={{ marginBottom: '0.75rem' }}>
          Use code{' '}
          <span className="font-bold rounded px-1.5 py-0.5" style={{ backgroundColor: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' }}>
            MARCH20
          </span>{' '}
          at checkout
        </p>

        <span className="inline-block rounded-md px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors" style={{ backgroundColor: 'hsl(var(--primary))' }}>
          Claim Discount →
        </span>
      </div>
    </div>
  );
};

export default DiscountPopup;
