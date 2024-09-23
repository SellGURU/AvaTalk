import React from "react"
import { useNavigate } from "react-router-dom"
import { getOS } from "../../help"

interface Contenttype {
    name:string,
    icon:string,
    description:string
}

interface CardProps {
    theme?:string
    content:Contenttype
    linkTo:string
}

const Card: React.FC<CardProps> = ({theme,content,linkTo}) => {
    const navigate = useNavigate();
    return (
        <>
            <div onClick={() => {
                navigate(linkTo)
            }} aria-disabled={linkTo == ''? 'true': 'false'} className={`${theme}-Card-container`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <div className={`${theme}-Card-icon`} style={{maskImage:`url(/Carbon/${content.icon})`,WebkitMaskImage:`url(/Carbon/${content.icon})`}}></div>
                        <div data-os={getOS()} className={`${theme}-ContentCard-Title ml-3 text-left`}>{content.name}</div>
                    </div>
                    <div className={`${theme}-Card-Vector `}></div>
                </div>
                <div className="text-left text-sm text-gray-700 mt-2">{content.description}</div>
            </div>
        </>
    )
}

export default Card