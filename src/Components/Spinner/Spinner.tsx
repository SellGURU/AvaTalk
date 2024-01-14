import  { useState, useEffect } from 'react';
import './Spinner.css';

const Spinner = () => {
  const [mode, setMode] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMode((prevMode) => (prevMode + 1) % 4);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`spinner mode-${mode}`}>
      <div className={`circle ${mode === 0 || mode === 2 ? 'top' : 'top'}`}></div>
      <div className={`circle ${mode === 1 || mode === 3 ? 'middle' : 'middle'}`}></div>
      {mode === 0 || mode === 2 ? <div className="circle bottom"></div> : null}
    </div>
  );
};

export default Spinner;
