import  React, { useState, useEffect } from 'react';

interface SpinnersProps {
  theme?: string;
}
const Spinners: React.FC<SpinnersProps> = ({theme}) => {
  const [mode, setMode] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMode((prevMode) => (prevMode + 1) % 4);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${theme}-Spinner-Container ${theme}-Spinner-Mode-${mode}`}>
      <div className={`${theme}-Spinner-Circle ${mode === 0 || mode === 2 ? 'top' : 'top'}`}></div>
      <div className={`${theme}-Spinner-Circle ${mode === 1 || mode === 3 ? `${theme}-Spinner-Circle-Middle` : `${theme}-Spinner-Circle-Middle`}`}></div>
      {mode === 0 || mode === 2 ? <div className={`${theme}-Spinner-Circle bottom`}></div> : null}
    </div>
  );
};

export default Spinners;
