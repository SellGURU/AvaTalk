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
        <img className={`${theme}-Splash-SplashIcon`} src="./splash.svg" alt="" />
      </div>
    </div>
  );
};

export default Splash;
