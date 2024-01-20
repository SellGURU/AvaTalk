import React, { InputHTMLAttributes, useState } from "react";

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
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [ShowDropDown,setShowDropDown] = useState(false)
  const togglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [langList,_setLangList] = useState([
    {
      "codeName": "us",
      "codePhone": "+1"
    },
    {
      "codeName": "gb",
      "codePhone": "+44"
    },
    {
      "codeName": "ca",
      "codePhone": "+1"
    },
    {
      "codeName": "au",
      "codePhone": "+61"
    },
    {
      "codeName": "in",
      "codePhone": "+91"
    },
    {
      "codeName": "de",
      "codePhone": "+49"
    },
    {
      "codeName": "fr",
      "codePhone": "+33"
    },
    {
      "codeName": "br",
      "codePhone": "+55"
    },
    {
      "codeName": "jp",
      "codePhone": "+81"
    },
    {
      "codeName": "cn",
      "codePhone": "+86"
    },
    {
      "codeName": "kr",
      "codePhone": "+82"
    },
    {
      "codeName": "mx",
      "codePhone": "+52"
    },
    {
      "codeName": "es",
      "codePhone": "+34"
    },
    {
      "codeName": "it",
      "codePhone": "+39"
    },
    {
      "codeName": "nl",
      "codePhone": "+31"
    },
    {
      "codeName": "za",
      "codePhone": "+27"
    },
    {
      "codeName": "sg",
      "codePhone": "+65"
    },
    {
      "codeName": "ru",
      "codePhone": "+7"
    },
    {
      "codeName": "tr",
      "codePhone": "+90"
    },
    {
      "codeName": "ar",
      "codePhone": "+54"
    },
    {
      "codeName": "se",
      "codePhone": "+46"
    },
    {
      "codeName": "ch",
      "codePhone": "+41"
    },
    {
      "codeName": "no",
      "codePhone": "+47"
    },
    {
      "codeName": "nz",
      "codePhone": "+64"
    },
    {
      "codeName": "ie",
      "codePhone": "+353"
    },
    {
      "codeName": "pl",
      "codePhone": "+48"
    },
    {
      "codeName": "at",
      "codePhone": "+43"
    },
    {
      "codeName": "be",
      "codePhone": "+32"
    },
    {
      "codeName": "dk",
      "codePhone": "+45"
    },
    {
      "codeName": "fi",
      "codePhone": "+358"
    },
    {
      "codeName": "gr",
      "codePhone": "+30"
    },
    {
      "codeName": "pt",
      "codePhone": "+351"
    },
    {
      "codeName": "th",
      "codePhone": "+66"
    },
    {
      "codeName": "ae",
      "codePhone": "+971"
    },
  {
    "codeName": "ae",
    "codePhone": "+971"
  },
  {
    "codeName": "cl",
    "codePhone": "+56"
  },
  {
    "codeName": "co",
    "codePhone": "+57"
  },
  {
    "codeName": "pe",
    "codePhone": "+51"
  },
  {
    "codeName": "ve",
    "codePhone": "+58"
  },
  {
    "codeName": "my",
    "codePhone": "+60"
  },
  {
    "codeName": "id",
    "codePhone": "+62"
  },
  {
    "codeName": "ph",
    "codePhone": "+63"
  },
  {
    "codeName": "vn",
    "codePhone": "+84"
  },
  {
    "codeName": "il",
    "codePhone": "+972"
  },
  {
    "codeName": "qa",
    "codePhone": "+974"
  },
  {
    "codeName": "bh",
    "codePhone": "+973"
  },
  {
    "codeName": "kw",
    "codePhone": "+965"
  },
  {
    "codeName": "om",
    "codePhone": "+968"
  },
  {
    "codeName": "pk",
    "codePhone": "+92"
  },
  {
    "codeName": "bd",
    "codePhone": "+880"
  },
  {
    "codeName": "lk",
    "codePhone": "+94"
  },
  {
    "codeName": "mm",
    "codePhone": "+95"
  },
  {
    "codeName": "np",
    "codePhone": "+977"
  },
  {
    "codeName": "lk",
    "codePhone": "+94"
  },
  {
    "codeName": "cz",
    "codePhone": "+420"
  },
  {
    "codeName": "sk",
    "codePhone": "+421"
  },
  {
    "codeName": "hu",
    "codePhone": "+36"
  },
  {
    "codeName": "ro",
    "codePhone": "+40"
  },
  {
    "codeName": "bg",
    "codePhone": "+359"
  },
  {
    "codeName": "ua",
    "codePhone": "+380"
  },
  {
    "codeName": "by",
    "codePhone": "+375"
  },
  {
    "codeName": "md",
    "codePhone": "+373"
  },
  {
    "codeName": "am",
    "codePhone": "+374"
  },
  {
    "codeName": "ge",
    "codePhone": "+995"
  },
  {
    "codeName": "az",
    "codePhone": "+994"
  },
  {
    "codeName": "kz",
    "codePhone": "+7"
  },
  {
    "codeName": "uz",
    "codePhone": "+998"
  },
  {
    "codeName": "tm",
    "codePhone": "+993"
  },
  {
    "codeName": "tj",
    "codePhone": "+992"
  },
  {
    "codeName": "kg",
    "codePhone": "+996"
  },
  {
    "codeName": "mn",
    "codePhone": "+976"
  },
  {
    "codeName": "is",
    "codePhone": "+354"
  },
  {
    "codeName": "ar",
    "codePhone": "+54"
  },
  {
    "codeName": "bo",
    "codePhone": "+591"
  },
  {
    "codeName": "py",
    "codePhone": "+595"
  },
  {
    "codeName": "uy",
    "codePhone": "+598"
  },
  {
    "codeName": "eg",
    "codePhone": "+20"
  },
  {
    "codeName": "ma",
    "codePhone": "+212"
  },
  {
    "codeName": "dz",
    "codePhone": "+213"
  },
  {
    "codeName": "tn",
    "codePhone": "+216"
  },
  {
    "codeName": "ly",
    "codePhone": "+218"
  },
  {
    "codeName": "gm",
    "codePhone": "+220"
  },
  {
    "codeName": "sn",
    "codePhone": "+221"
  },
  {
    "codeName": "mr",
    "codePhone": "+222"
  },
  {
    "codeName": "ml",
    "codePhone": "+223"
  },
  {
    "codeName": "gn",
    "codePhone": "+224"
  },
  {
    "codeName": "ci",
    "codePhone": "+225"
  },
  {
    "codeName": "bf",
    "codePhone": "+226"
  },
  {
    "codeName": "ne",
    "codePhone": "+227"
  },
  {
    "codeName": "tg",
    "codePhone": "+228"
  },        
  ])
  // const [country,setCountry] = useState<phoneCountry>({
  //     codeName:'us',
  //     codePhone:'+1'
  // })

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
                        <img className={`${theme}-TextField-selectPhone-container-icon`}  src="./src/assets/Carbon/bottomVector.svg" alt="" />
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
          id={inputId()}
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
