/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState} from "react";

interface  Props{
    bodyText:string;
    component?:() => JSX.Element
    title:string;
}
export const Accordion=({bodyText,title,component}:Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };
    return(
        <>
            <div className={"bg-[#F3F4F6] boxShadow-Gray borderBox-Gray rounded-3xl mb-5"} id="accordion-collapse" data-accordion="collapse">
                <h2 id="accordion-collapse-heading-1" className={"text-[#374151] font-medium text-[14px]"}>
                    <button
                        type="button"
                        className={`flex items-center justify-between w-full px-5 pt-1 font-medium gap-3 ${isOpen ? 'rounded-t-xl ' : 'rounded-xl pb-1'}`}
                        onClick={toggleAccordion}
                        aria-expanded={isOpen}
                        aria-controls="accordion-collapse-body-1"
                    >
                        <span>{title}</span>
                        {isOpen ? 
                         <div className="Carbon-Card-Vector -rotate-90 w-[14px]"></div>
                        :
                        <div className="Carbon-Card-Vector rotate-90 w-[14px]"></div>
                        }
                    </button>
                </h2>
                <div
                    id="accordion-collapse-body-1"
                    className={`${isOpen ? 'block' : 'hidden'}`}
                    aria-labelledby="accordion-collapse-heading-1"
                >
                    <div className="p-5">
                        {component? component():undefined}
                        <p className="mb-2 text-[#6B7280] font-normal text-[12px]">{bodyText}</p>
                    </div>
                </div>
            </div>

</>
    )
}