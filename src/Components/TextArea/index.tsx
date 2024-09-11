import React, { TextareaHTMLAttributes, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { Auth } from "../../Api";

// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  theme?: string;
  label?: string;
  name: string;
  value: string;
  textAreaHeight?: string;
  required?: boolean;
  isAnalyse?:boolean;
  placeholder?: string;
  analysedText?:string;
  setAnalysedText?:(value:string) => void;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  //   type: "text" | "password" | "email";
  inValid: boolean | string;
  errorMessage?: string;
  setShowSuggestion?:(action:boolean) => void
}

function inputId(): string {
  return "TextArea" + Math.floor(Math.random() * 10000).toString();
}

const TextArea: React.FC<InputProps> = ({
  theme,
  label,
  name,
  isAnalyse,
  //   type,
  placeholder,
  textAreaHeight,
  required,
  onChange,
  onBlur,
  value,
  inValid,
  setShowSuggestion,
  errorMessage,
  setAnalysedText,
  ...props
}) => {
  const [isAnalysing,setIsAnalysing] = useState(false)
  const [isCompleteAnalyse,setIsCompleteAnalyse] = useState(false)
  
  const analyseText = () => {
    setIsAnalysing(true)
    Auth.analyseAiSetting(value).then((res) => {
      console.log(res)
      if(res.data["AI suggestion"]){
        setIsCompleteAnalyse(true)      
        if(setAnalysedText){
          setAnalysedText(res.data["AI suggestion"])
        }
      }
      setIsAnalysing(false)
    }).catch(() => {
        setIsAnalysing(false)
    })

  }
  useEffect(() => {
    setIsAnalysing(false)
    setIsCompleteAnalyse(false)
  },[value])
  return (
    <div className={`${theme}-TextArea-container w-[100%]`}>
      <label className={`${theme}-TextArea-label`} htmlFor={inputId()}>
        {label}
        <>{required ? <span className={`${theme}-TextArea-label-required`}>*</span> : undefined}</>
      </label>
      <div data-testid="input-container" className={` w-[100%]  ${inValid && `${theme}-TextArea-inValid`} ${theme}-TextArea-box `}>
        <textarea
          data-testid="input-id"
          {...props}
          data-mode={isAnalyse?'analyse':''}
          // className={`${theme}-TextArea-input w-[100%] `}
          className={`${theme}-TextArea-input`}
          //   type={getInputType()}
          id={inputId()}
          style={{ height: textAreaHeight }}
          placeholder={placeholder}
          name={name}
          disabled={isAnalysing}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        />
        {isAnalyse && 
        <>  
          {isAnalysing &&
            <>
              <div className="absolute bottom-1 right-5">
                <BeatLoader color="#5B21B6" size={8}></BeatLoader>
              </div>
            </>
          }
          {
            !isAnalysing && !isCompleteAnalyse &&
              <div onClick={() => {
                analyseText()
              }} className="absolute bg-gray-100 flex py-2 px-1 justify-end items-center bottom-0 right-5">
                <img src="./Carbon/analyseStar.svg" alt="" />
                <div className="text-primary-color cursor-pointer ml-1 text-sm font-medium">
                  Analyze by AI
                </div>
              </div>
          }
          {
            isCompleteAnalyse && 
              <div onClick={() => {
                // analyseText()
                if(setShowSuggestion){
                  setShowSuggestion(true)
                }
              }} className="absolute bg-gray-100 flex py-2 px-1 justify-end items-center bottom-0 right-5">
                <img src="./Carbon/tick.svg" alt="" />
                <div className="text-primary-color cursor-pointer ml-1 text-sm font-medium">
                  Analyzed
                </div>
              </div>            
          }
        
        </>
        }
      </div>
      {inValid && <div className={`${theme}-TextArea-error`}>{errorMessage}</div>}
    </div>
  );
};

TextArea.defaultProps = {
  theme: "Acord",
};

export default TextArea;
