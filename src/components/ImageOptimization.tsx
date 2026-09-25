import { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
  objectFit?: 'cover' | 'contain' | 'fill';
  objectPosition?: string;
  style?: React.CSSProperties;
  decoding?: 'async' | 'sync' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
}

const OptimizedImage = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  width,
  height,
  objectFit = 'cover',
  objectPosition = 'center',
  style = {},
  decoding = 'async',
  fetchPriority = 'auto'
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  // Create optimized style object
  const optimizedStyle = {
    objectFit,
    objectPosition,
    transition: 'opacity 0.3s ease-in-out',
    opacity: isLoaded ? 1 : 0.8,
    ...style
  };

  if (hasError) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 ${className}`}
        style={{ 
          width: width ? `${width}px` : '100%', 
          height: height ? `${height}px` : '100%',
          ...style 
        }}
      >
        <div className="text-gray-400 text-sm text-center">
          <p>Image unavailable</p>
          <p className="text-xs">{alt}</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      width={width}
      height={height}
      style={optimizedStyle}
      onLoad={handleLoad}
      onError={handleError}
      {...(fetchPriority !== 'auto' && { fetchpriority: fetchPriority })}
    />
  );
};

export default OptimizedImage;