import { useState, useEffect } from 'react';

const useWindowHeight = () => {
  const [remainingHeight, setRemainingHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateHeight = () => {
      const windowHeight = window.innerHeight;
      const element = document.getElementById('2');
      const elementHeight = element ? element.getBoundingClientRect().height : 0;
      
      setRemainingHeight(windowHeight - elementHeight);
    };

    // Initial calculation
    updateHeight();

    // Update height on window resize
    window.addEventListener('resize', updateHeight);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return remainingHeight;
};


export default useWindowHeight;