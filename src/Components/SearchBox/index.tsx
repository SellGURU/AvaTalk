import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  theme?: string;
  value: string;
  placeholder?: string;

  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox: React.FC<InputProps> = ({ theme, name, placeholder, onChange, value, ...props }) => {
  return (
    <div className={`${theme}-SearchBox-container w-[100%]`}>
      <div data-testid="input-container" className={` w-[100%]  ${theme}-SearchBox-box `}>
        <input data-testid="input-id" deta-selectBox="true" {...props} className={`${theme}-SearchBox-input`} placeholder={placeholder} name={name} onChange={onChange} value={value} />
        <img className={`${theme}-SearchBox-searchIcon ${theme}-SearchBox-ActiveIcon`} src="../../../Acord/search-normal.png" alt="" />
      </div>
    </div>
  );
};

SearchBox.defaultProps = {
  theme: "Acord",
};

export default SearchBox;
