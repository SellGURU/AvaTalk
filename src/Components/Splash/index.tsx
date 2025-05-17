/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect } from 'react';

interface SplashProps {
  theme?: string;
}

const Splash: React.FC<SplashProps> = ({ theme }) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const fadeOutTimeout = setTimeout(() => {
      setShowSplash(false);
    }, 4000);

    return () => {
      clearTimeout(fadeOutTimeout);
    };
  }, []);

  return (
    <div className={`${theme}-Splash-fade ${showSplash ? `${theme}-Splash-show` : `${theme}-Splash-hide`}`}>
      <div className={`${theme}-Splash-Container`}>
        <img 
          // @ts-ignore
          fetchpriority="high"
          className={`${theme}-Splash-SplashIcon`} width={266} height={103}  src="/Carbon/splashImage.svg" alt="" />
      </div>
    </div>
  );
};

export default Splash;
