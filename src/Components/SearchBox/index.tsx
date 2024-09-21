import React, { InputHTMLAttributes } from "react";

function inputId(): string {
  return "textfield" + Math.floor(Math.random() * 100000).toString();
}
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  theme?: string;
  value: string;
  inputHeight?: string;
  placeholder?: string;
  label?: string;

  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox: React.FC<InputProps> = ({ theme, name, placeholder, onChange, inputHeight, value, label, ...props }) => {
  return (
    <div className={`${theme}-SearchBox-container w-[100%]`}>
      <label className={`${theme}-TextField-label`} htmlFor={inputId()}>
        {label}
      </label>
      <div data-testid="input-container" className={` w-[100%]  ${theme}-SearchBox-box `}>
        <input
          style={{ height: inputHeight }}
          id={inputId()}
          data-testid="input-id"
          deta-selectBox="true"
          {...props}
          className={`${theme}-SearchBox-input`}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          value={value}
        />
        <img className={`${theme}-SearchBox-searchIcon ${theme}-SearchBox-ActiveIcon`} src="../../../Carbon/search-normal.png" alt="" />
      </div>
    </div>
  );
};

SearchBox.defaultProps = {
  theme: "Acord",
};

export default SearchBox;
