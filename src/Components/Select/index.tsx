import { HtmlHTMLAttributes, useEffect, useState } from "react";

interface SelectProps extends HtmlHTMLAttributes<HTMLDivElement> {
  theme?: string;
  label?: string;
  valueElement: React.ReactNode; // Make valueElement optional
  placeholder?: string;
}

function inputId(): string {
  return "Select" + Math.floor(Math.random() * 100000).toString();
}

const Select: React.FC<SelectProps> = ({ children, theme, label, valueElement, placeholder, ...props }) => {
  const [showSelect, setShowSelect] = useState(false);

  useEffect(() => {
    setShowSelect(false);
  }, [valueElement]);

  return (
    <>
      <div className={`${theme}-Select-container w-[100%]`}>
        <label className={`${theme}-Select-label`} htmlFor={inputId()}>
          {label}
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
            {valueElement ? valueElement : <span className={`${theme}-Select-placeHolder`}>{placeholder}</span>}
          </div>
          <div className={`${theme}-Select-icon`} style={{ rotate: showSelect === true ? "180deg" : "0deg" }}></div>
        </div>
        {showSelect && <div className={`${theme}-Select-dropDown-container`}>{children}</div>}
      </div>
    </>
  );
};

export default Select;

/*
import { HtmlHTMLAttributes, useEffect, useState } from "react";

interface SelectProps extends HtmlHTMLAttributes<HTMLDivElement> {
  theme?: string;
  label?: string;
  valueElement: React.ReactNode;
  placeholder?: string;
}
function inputId(): string {
  return "Select" + Math.floor(Math.random() * 100000).toString();
}

const Select: React.FC<SelectProps> = ({ children, theme, label, valueElement, ...props }) => {
  const [showSelect, setShowSelect] = useState(false);
  useEffect(() => {
    setShowSelect(false);
  }, [valueElement]);
  return (
    <>
      <div className={`${theme}-Select-container w-[100%]`}>
        <label className={`${theme}-Select-label`} htmlFor={inputId()}>
          {label}
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
            {valueElement}
          </div>
          <div className={`${theme}-Select-icon `} style={{ rotate: showSelect == true ? "180deg" : "0deg" }}></div>
        </div>
        {showSelect && <div className={`${theme}-Select-dropDown-container`}>{children}</div>}
      </div>
    </>
  );
};

export default Select;
*/
