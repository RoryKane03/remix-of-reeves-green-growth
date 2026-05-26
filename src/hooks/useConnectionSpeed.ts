import { useState, useEffect } from 'react';

export type ConnectionSpeed = 'slow-2g' | '2g' | '3g' | '4g' | 'fast' | 'unknown';

export const useConnectionSpeed = () => {
  const [speed, setSpeed] = useState<ConnectionSpeed>('unknown');
  const [saveData, setSaveData] = useState(false);

  useEffect(() => {
    // Check for Network Information API support
    if ('connection' in navigator) {
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      
      if (connection) {
        const updateConnectionInfo = () => {
          const effectiveType = connection.effectiveType;
          setSpeed(effectiveType as ConnectionSpeed);
          setSaveData(connection.saveData || false);
        };

        updateConnectionInfo();
        connection.addEventListener('change', updateConnectionInfo);

        return () => {
          connection.removeEventListener('change', updateConnectionInfo);
        };
      }
    }

    // Fallback: assume fast connection if API not available
    setSpeed('fast');
  }, []);

  const isSlowConnection = speed === 'slow-2g' || speed === '2g' || speed === '3g' || saveData;
  const shouldLoadVideo = !isSlowConnection;

  return { speed, saveData, isSlowConnection, shouldLoadVideo };
};
