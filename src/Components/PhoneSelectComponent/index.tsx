import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './PhoneNumberInput.scss'; // Import custom styles

interface PhoneNumberInputProps {
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  invalid?:boolean
  errorMessage?:string
  required?:boolean
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ label,required,invalid,errorMessage, value, onChange }) => {
  const [phoneNumber, setPhoneNumber] = useState(value || '');

  const handlePhoneChange = (phone: string) => {
    setPhoneNumber(phone);
    onChange(phone);
  };
  useEffect(() => {
    console.log(value)
    setPhoneNumber(value as string)

  },[value])
  return (
    <div className="phone-number-input-container">
      {label && <label className="Carbon-TextField-label ">{label}
        {required ? 
            <span className={`Carbon-TextField-label-required`} >*</span>
        :undefined
        }
        </label>}
      <div className='mt-1'>
        <PhoneInput
            placeholder='Enter your phone number ...'
            country={'us'} // Default country code (can be changed)
            value={phoneNumber}
            onChange={handlePhoneChange}
            isValid={!invalid}
            inputProps={{
                "data-mode":invalid?"invalid":"",
            }}
            inputClass="Carbon-TextField-input"
            containerClass="Carbon-TextField-box " 
            

        />
        {invalid && (
            <div className={`Carbon-TextField-error`}>{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default PhoneNumberInput;