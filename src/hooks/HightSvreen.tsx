import { useState, useEffect } from 'react';

const useWindowHeight = () => {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateHeight = () => {
      setHeight(window.innerHeight);
    };

    // Add event listener on mount
    window.addEventListener('resize', updateHeight);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return height;
};

export default useWindowHeight;