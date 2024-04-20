import { HtmlHTMLAttributes, useEffect, useState } from "react";

interface SelectProps extends HtmlHTMLAttributes<HTMLDivElement> {
  theme?: string;
  label?: string;
  valueElement: React.ReactNode;
  placeholder?: string;
  required?:boolean
}
function inputId(): string {
  return "Select" + Math.floor(Math.random() * 100000).toString();
}

const Select: React.FC<SelectProps> = ({ children, required,theme, label, placeholder, valueElement, ...props }) => {
  const [showSelect, setShowSelect] = useState(false);
  useEffect(() => {
    setShowSelect(false);
  }, [valueElement]);
  return (
    <>
      <div className={`${theme}-Select-container w-[100%]`}>
        <label className={`${theme}-Select-label text-left`} htmlFor={inputId()}>
          {label}
          {required ? 
              <span className={`${theme}-TextField-label-required`} >*</span>
          :undefined
          }          
        </label>
        <div
          data-testid="input-container"
          data-showSelect={showSelect ? "true" : "false"}
          onClick={() => {
            setShowSelect(!showSelect);
          }}
          className={` w-[100%] ${theme}-Select-box `}
        >
          <div data-testid="input-id" data-showSelect={showSelect ? "true" : "false"} deta-selectBox="true" {...props} className={`${theme}-Select-input`} id={inputId()}>
            {valueElement ? (
              <div className="flex   ">
                <p className="text-gray-700 leading-[20px] text-[14px] font-[500] tracking-tight">{valueElement}</p>
              </div>
            ) : (
              <span className="leading-[27.25px]  text-[13px]  font-[300]     text-gray-400 flex justify-start">{placeholder}</span>
            )}
          </div>
          <div className={`${theme}-Select-icon `} style={{ rotate: showSelect == true ? "180deg" : "0deg" }}></div>
        </div>
        {showSelect && <div className={`${theme}-Select-dropDown-container`}>{children}</div>}
      </div>
    </>
  );
};

export default Select;
