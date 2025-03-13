/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const TooltipCustom: React.FC<TooltipProps> = ({ text, children }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({ top: rect.top - 35, left: rect.left + rect.width / 2 });
    }
  }, [visible]);

  return (
    <div className="inline-block relative" ref={ref}>
      <div
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="truncate max-w-[150px] cursor-pointer"
      >
        {children}
      </div>
      {visible &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: `${position.top}px`,
              left: `${position.left}px`,
              transform: "translateX(-50%)",
              backgroundColor: "black",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
              whiteSpace: "nowrap",
              zIndex: 99999, // Ensures tooltip appears above all layers
            }}
          >
            {text}
          </div>,
          document.body
        )}
    </div>
  );
};

export default TooltipCustom