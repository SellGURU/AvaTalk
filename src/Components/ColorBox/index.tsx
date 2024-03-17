import { useState } from "react";
// import styles from "./ColorBox.module.css";
interface ColorBoxProps {
  resolveColor:(color:string) => void
}
const ColorBox = (props:ColorBoxProps) => {
  const [selectedColor, setSelectedColor] = useState("");

  const colors = ["#DC2626", "#F97316", "#FACC15", "#84CC16", "#16A34A", "#14B8A6", "#67E8F9", "#0284C7", "#1D4ED8", "#8B5CF6", "#9333EA", "#A21CAF", "#DB2777", "#A1A1AA", "#000000"];

  const handleCircleClick = (color: string) => {
    setSelectedColor(color);
    props.resolveColor(color)
  };

  return (
    <div>
      <p className="leading-[20px] text-[13px] mb-[4px]  ml-6 font-medium text-gray-700">Color</p>
      <div className={`flex flex-wrap justify-center rounded-[27px] borderBox-Gray boxsInnerShadows w-full`}>
        <div className="py-[21px] px-3">
          {/* First Row */}
          <div className="flex gap-[6px]">
            {colors.slice(0, 8).map((color, index) => (
              <div key={index} className={`relative w-8 h-8 mb-2 rounded-full cursor-pointer `} style={{ backgroundColor: color }} onClick={() => handleCircleClick(color)}>
                {selectedColor === color && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src="../../../public/Carbon/checkMark.svg" alt="" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div className="flex gap-[6px]">
            {colors.slice(8).map((color, index) => (
              <div key={index} className={`relative w-8 h-8  rounded-full cursor-pointer `} style={{ backgroundColor: color }} onClick={() => handleCircleClick(color)}>
                {selectedColor === color && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src="../../../public/Carbon/checkMark.svg" alt="" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorBox;
