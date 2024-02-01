import React from "react"

interface Contenttype {
    name:string,
    icon:string,
    description:string
}

interface CardProps {
    theme?:string
    content:Contenttype
}

const Card: React.FC<CardProps> = ({theme,content}) => {

    return (
        <>
            <div className={`${theme}-Card-container`}>
                <div className="flex items-center justify-start">
                    <div className={`${theme}-Card-icon`}></div>
                    <div className="text-left text-sm ml-3 text-gray-700 font-semibold">{content.name}</div>
                </div>
                <div className="text-left text-sm text-gray-700 mt-2">{content.description}</div>
                <div className={`${theme}-Card-Vector absolute right-8 top-8`}></div>
            </div>
        </>
    )
}

export default Card