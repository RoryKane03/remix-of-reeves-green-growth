import { useState } from 'react';
import OptimizedImage from './ImageOptimization';

interface BeforeAfterComparisonProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
}

const BeforeAfterComparison = ({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt
}: BeforeAfterComparisonProps) => {
  return (
    <div 
      className="relative bg-white rounded-lg shadow-md border border-primary p-3 transition-all duration-300 hover:shadow-lg"
    >
      <div className="grid grid-cols-2 gap-3">
        {/* Before Image */}
        <div className="relative group overflow-hidden rounded-md">
          <OptimizedImage
            src={beforeImage}
            alt={beforeAlt}
            className="w-full h-64 object-cover"
            loading="lazy"
            width={200}
            height={256}
          />
          <div className="absolute top-0 left-0 bg-primary/90 text-white px-3 py-1.5 rounded-br-lg font-bold text-xs uppercase tracking-wide">
            Before
          </div>
        </div>

        {/* After Image */}
        <div className="relative group overflow-hidden rounded-md">
          <OptimizedImage
            src={afterImage}
            alt={afterAlt}
            className="w-full h-64 object-cover"
            loading="lazy"
            width={200}
            height={256}
          />
          <div className="absolute top-0 left-0 bg-primary/90 text-white px-3 py-1.5 rounded-br-lg font-bold text-xs uppercase tracking-wide">
            After
          </div>
        </div>
      </div>

      {/* Trust Badge Below */}
      <div className="mt-3 pt-3 border-t border-gray-200 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          ARB Approved
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Fully Insured
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          20+ Years Experience
        </span>
      </div>
    </div>
  );
};

export default BeforeAfterComparison;
