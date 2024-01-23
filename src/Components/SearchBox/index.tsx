import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  theme?: string;
  label?: string;
  required?: boolean;
  //   name: string;
  value: string;
  placeholder?: string;

  //   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  //   onBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  //   type: "text" | "password" | "email" | "phone";
  //   inValid: boolean | string;
  //   errorMessage?: string;
}

function inputId(): string {
  return "SearchBox" + Math.floor(Math.random() * 100000).toString();
}

const SearchBox: React.FC<InputProps> = ({ theme, label, name, placeholder, onChange, onBlur, value, required, ...props }) => {
  return (
    <div className={`${theme}-SearchBox-container w-[100%]`}>
      <label className={`${theme}-SearchBox-label`} htmlFor={inputId()}>
        {label}
        <>{required ? <span className={`${theme}-SearchBox-label-required`}>*</span> : undefined}</>
      </label>
      <div data-testid="input-container" className={` w-[100%]  ${theme}-SearchBox-box `}>
        <input
          data-testid="input-id"
          deta-selectBox="true"
          {...props}
          className={`${theme}-SearchBox-input`}
          //   type={getInputType()}
          id={inputId()}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        />
        <img className={`${theme}-SearchBox-FooterIcon ${theme}-SearchBox-ActiveIcon`} src="../../../public/search-normal.svg" alt="" />
      </div>
    </div>
  );
};

SearchBox.defaultProps = {
  theme: "Acord",
};

export default SearchBox;
