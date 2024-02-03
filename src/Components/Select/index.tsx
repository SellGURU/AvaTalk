import { HtmlHTMLAttributes, useEffect, useState } from "react";

interface SelectProps extends HtmlHTMLAttributes<HTMLDivElement> {
  theme?: string;
  label?: string;
  valueElement: React.ReactNode;
  placeholder?: string;
  dropDownHeight?: string;
}
function inputId(): string {
  return "Select" + Math.floor(Math.random() * 100000).toString();
}

const Select: React.FC<SelectProps> = ({ children, theme, dropDownHeight, label, valueElement, placeholder, ...props }) => {
  const [showSelect, setShowSelect] = useState(false);
  const [updatedValueElement, setUpdatedValueElement] = useState(valueElement);

  useEffect(() => {
    setShowSelect(false);
    setUpdatedValueElement(valueElement);
  }, [valueElement]);

  const handleCrossIconClick = () => {
    if (updatedValueElement && updatedValueElement.exhibition) {
      const newValueElement = { ...updatedValueElement, exhibition: false };
      setUpdatedValueElement(newValueElement);
    }
  };

  return (
    <>
      <div className={`${theme}-Select-container w-[100%]`}>
        <label className={`${theme}-Select-label`} htmlFor={inputId()}>
          {label}
        </label>
        <div data-testid="input-container" data-showSelect={showSelect ? "true" : "false"} className={` w-[100%] ${theme}-Select-box `}>
          <div data-testid="input-id" data-showSelect={showSelect ? "true" : "false"} deta-selectBox="true" {...props} className={`${theme}-Select-input flex items-center`} id={inputId()}>
            {updatedValueElement?.exhibition ? (
              <div className="flex z-[100] exhibitionBoxShadows items-center justify-center w-[108px] space-x-[2px] h-8 rounded-[47px] bg-amber-400 ">
                <p className="text-gray-700 leading-[20px] text-[14px] font-[500] tracking-tight">Exhibition</p>
                <div onClick={handleCrossIconClick} className={` ${theme}-ContactDetails-crossIcon  `}></div>
              </div>
            ) : (
              <span className={`${theme}-Select-placeHolder`}>{placeholder}</span>
            )}
          </div>
          <div
            onClick={() => {
              setShowSelect(!showSelect);
            }}
            className={`${theme}-Select-icon cursor-pointer`}
            style={{ rotate: showSelect === true ? "180deg" : "0deg" }}
          ></div>
        </div>
        {showSelect && (
          <div style={{ height: dropDownHeight }} className={`${theme}-Select-dropDown-container`}>
            {children}
          </div>
        )}
      </div>
    </>
  );
};

export default Select;
