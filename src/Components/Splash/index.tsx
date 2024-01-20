import React, { useState, useEffect } from 'react';

interface SplashProps {
  theme?: string;
}

const Splash: React.FC<SplashProps> = ({ theme }) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => {
      clearTimeout(splashTimeout);
    };
  }, []);

  return (
    <>
      <div className={`${theme}-Splash-fade ${showSplash ? `${theme}-Splash-show` : `${theme}-Splash-hide`}`}>
        <div className={`${theme}-Splash-Container`}>
          <img className={`${theme}-Splash-SplashIcon`} src="../../public/splash.svg" alt="" />
        </div>
      </div>
    </>
  );
};

export default Splash;
