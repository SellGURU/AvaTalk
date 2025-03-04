/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Tooltip } from 'react-tooltip';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface TooltipTextProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  tooltipValue: string;
  children: ReactElement;
}

const TooltipText: React.FC<TooltipTextProps> = ({
  tooltipValue,
  children,
  ...props
}) => {
  const textRef = useRef<any>(null);
  const [isEllipsized, setIsEllipsized] = useState(true);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  // const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible && textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      setPosition({ top: rect.top - 30, left: rect.left + rect.width / 2 });
    }
  }, [visible]);  
  useEffect(() => {
    if (textRef.current) {
      const { offsetWidth, scrollWidth } = textRef.current;
      setIsEllipsized(scrollWidth > offsetWidth);
    }
  }, [tooltipValue]);
  return (
    <>
      <span
        ref={textRef}
        data-tooltip-id={isEllipsized ? "tooltip"+tooltipValue : ''}
        data-tooltip-content={tooltipValue+""}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        {...props}
        style={{
          textWrap: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {children}
      </span>
      {/* {isEllipsized && <Tooltip variant='light'  positionStrategy='fixed' style={{width:'300px',wordBreak:'break-word',zIndex:'9999 !important'}} id={"tooltip"+tooltipValue}></Tooltip>} */}
        {isEllipsized && visible && createPortal(
          <div
          className='shadow-sm'
            style={{
              position: "fixed",
              top: `${position.top}px`,
              left: `${position.left}px`,
              transform: "translateX(-50%)",
              backgroundColor: "white",
              color: "black",
              padding: "5px 10px",
              maxWidth:'60%',
              borderRadius: "5px",
              whiteSpace: "nowrap",
              zIndex: 99999, // Ensures tooltip appears above all layers
            }}
          >
            <>
              {tooltipValue}
            </>
          </div>,
          document.body
        )}
    </>
  );
};

export default TooltipText;
