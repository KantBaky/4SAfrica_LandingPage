import { useState, useEffect } from 'react';

export function useLowBandwidth() {
  const [isLowBandwidth, setIsLowBandwidth] = useState(false);

  useEffect(() => {
    // Check for saved preference
    const saved = localStorage.getItem('low-bandwidth-mode');
    if (saved) {
      setIsLowBandwidth(JSON.parse(saved));
    }

    // Check connection speed if available
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection && connection.effectiveType) {
        const slowConnections = ['slow-2g', '2g', '3g'];
        if (slowConnections.includes(connection.effectiveType)) {
          setIsLowBandwidth(true);
        }
      }
    }
  }, []);

  const toggleLowBandwidth = () => {
    const newValue = !isLowBandwidth;
    setIsLowBandwidth(newValue);
    localStorage.setItem('low-bandwidth-mode', JSON.stringify(newValue));
    
    // Apply/remove class to body
    if (newValue) {
      document.body.classList.add('low-bandwidth');
    } else {
      document.body.classList.remove('low-bandwidth');
    }
  };

  useEffect(() => {
    if (isLowBandwidth) {
      document.body.classList.add('low-bandwidth');
    } else {
      document.body.classList.remove('low-bandwidth');
    }
  }, [isLowBandwidth]);

  return { isLowBandwidth, toggleLowBandwidth };
}
