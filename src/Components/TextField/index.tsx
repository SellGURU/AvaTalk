import React, {InputHTMLAttributes, useEffect, useState } from "react";

import Countries from './Countries.json';

interface PhoneCountry {
  codeName : string;
  codePhone: string
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  theme?: string;
  label?: string;
  required?:boolean
  name: string;
  value: string;
  placeholder?: string;
  phoneCountry?:PhoneCountry;
  setPhoneCountry?: (phone:PhoneCountry) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: "text" | "password" | "email" | "phone";
  inValid: boolean | string;
  errorMessage?: string;
  setValue?: (value:string) => void
}



function inputId(): string {
  return "textfield" + Math.floor(Math.random() * 100000).toString();
}

const TextField: React.FC<InputProps> = ({
  theme,
  label,
  name,
  type,
  placeholder,
  onChange,
  onBlur,
  value,
  inValid,
  errorMessage,
  required,
  phoneCountry,
  setPhoneCountry,
  setValue,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [ShowDropDown,setShowDropDown] = useState(false)
  const togglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [langList,_setLangList] = useState(Countries)

  useEffect(() => {
    let code ='+44'
    if(type == 'phone'){
      if(value){
        code = value.split(' ')[0]
      }
      // console.log(code)
      // console.log(langList.filter(item => item.codePhone == code))
      const lists = langList.filter(item => item.codePhone == code)[0]
      if(lists && setPhoneCountry){
        setPhoneCountry(lists)
      }
    }
  },[type, value])
  const getInputType = () => {
    if (type === "password" && showPassword) {
      return "text";
    }
    return type;
  };
  return (
    <div className={`${theme}-TextField-container w-[100%]`}>
      <label className={`${theme}-TextField-label`} htmlFor={inputId()}>
        {label}
        <>
        {required ? 
            <span className={`${theme}-TextField-label-required`} >*</span>
        :undefined
        }
        </>
      </label>
      <div
        data-testid="input-container"
        deta-selectBox={ShowDropDown?'true': 'false'}
        className={` w-[100%]  ${
          inValid && `${theme}-TextField-inValid`
        } ${theme}-TextField-box `}
      >
        {
            type === 'phone' ?
              <>
                  <div onClick={() => setShowDropDown(!ShowDropDown)}  className={`${theme}-TextField-selectPhone-container`}>
                        <img style={{}} src={`https://flagcdn.com/w20/${phoneCountry?.codeName}.png`}></img>
                        <img className={`${theme}-TextField-selectPhone-container-icon`}  src="./Carbon/bottomVector.svg" alt="" />
                  </div>
                  {
                    ShowDropDown ?
                      <div className={`${theme}-TextField-dropDown-container`} >
                         {
                          langList.map((item,index) => {
                            return (
                              <div onClick={() => {
                                if(setPhoneCountry){
                                  setPhoneCountry(item)
                                  const number =  value.split(' ')[1] ? value.split(' ')[1] : ''
                                  if(setValue){
                                    setValue(item.codePhone+' '+ number)
                                  }
                                }
                                setShowDropDown(false)
                              }} key={index} className={`${theme}-TextField-dropDown-item`}>
                                 <img width={24} src={`https://flagcdn.com/${item.codeName}.svg`} alt="" />
                                <div className={`${theme}-TextField-dropDown-item-text`}>{item.codePhone}</div>
                              </div>
                            )
                          })
                         }
                                                 
                      </div>
                    :undefined
                  }
              </>
            :
            undefined
        }
        <input
          data-testid="input-id"
          deta-selectBox="true"
          {...props}
          className={`${theme}-TextField-input`}
          type={getInputType()}
          id={props.id?props.id:inputId()}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        />
        {type === "password" && (
          <div
            data-testid="toggle-password"
            className={`${theme}-TextField-togglePassword `}
            onClick={togglePassword}
          >
            {showPassword ? (
              // <AiOutlineEyeInvisible size="20px" />
              <div className={`${theme}-TextField-icon-eyeOff`} />
            ) : (
              // <AiOutlineEye size="20px" />
              <div className={`${theme}-TextField-icon-eye`} />
            )}
          </div>
        )}
      </div>
      {inValid && (
        <div className={`${theme}-TextField-error`}>{errorMessage}</div>
      )}
    </div>
  );
};

TextField.defaultProps = {
  theme: "Acord",
};

export default TextField;
