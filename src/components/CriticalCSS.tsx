import { Helmet } from 'react-helmet-async';

const CriticalCSS = () => {
  return (
    <Helmet>
      <style type="text/css">{`
        /* Critical above-the-fold styles for instant rendering */
        
        /* Reset and base */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { }
        body {
          font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          line-height: 1.6; 
          color: #2D3A34;
          background-color: #F8FAF7;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Critical layout containers */
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        
        /* Header critical styles */
        header { 
          position: fixed; 
          top: 0; 
          width: 100%; 
          z-index: 50; 
          background: rgba(14, 45, 35, 0.95);
          backdrop-filter: blur(8px);
          height: 80px;
        }
        
        /* Hero critical styles for LCP optimization */
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding-top: 80px;
        }
        
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.25) 100%);
        }
        
        .hero-content {
          position: relative;
          z-index: 20;
          text-align: center;
          color: white;
          max-width: 700px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .hero-title {
          font-size: clamp(34px, 6vw, 58px);
          font-weight: 800;
          line-height: 1.1;
          text-shadow: 0 4px 16px rgba(0,0,0,0.7);
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
        }
        
        .hero-subtitle {
          font-size: clamp(17px, 2.5vw, 20px);
          font-weight: 500;
          line-height: 1.5;
          text-shadow: 0 3px 12px rgba(0,0,0,0.7);
          letter-spacing: 0.3px;
          margin-bottom: 2rem;
        }
        
        .hero-location {
          color: #39B25F;
          filter: brightness(1.1);
        }
        
        /* Button critical styles */
        .btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          font-size: 1.125rem;
          font-weight: 700;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          min-width: 280px;
          height: 64px;
        }
        
        .btn-green {
          background: linear-gradient(180deg, #2A6D4B 0%, #1F5B3E 100%);
          color: white;
          box-shadow: 0 4px 16px rgba(42, 109, 75, 0.4);
        }
        
        .btn-gold {
          background: linear-gradient(180deg, #D7BC60 0%, #C6A848 100%);
          color: #1A1A1A;
          box-shadow: 0 4px 16px rgba(215, 188, 96, 0.4);
        }
        
        .btn-primary:hover {
          transform: translateY(-1px);
          filter: brightness(1.05);
        }
        
        /* Loading states */
        .loading-skeleton {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }
        
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .hero-section { padding: 1rem; }
          .btn-primary { min-width: 100%; margin-bottom: 0.75rem; }
          header { height: 70px; }
        }
        
        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </Helmet>
  );
};

export default CriticalCSS;