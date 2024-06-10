/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react"

interface AboutComponentProps  {
    text:string,
}

const AboutComponent:React.FC<AboutComponentProps> = ({text}) => {
    const [isShowMore,setIsShowMore] =useState(false)
    return (
        <>
            <h1>{text.length> 130?
            <div>
                {isShowMore?
                    <div >
                        {text} 
                        <span onClick={() => {setIsShowMore(false)}} className="text-[#06B6D4] cursor-pointer text-sm font-medium">show less</span>
                    </div>                        
                :
                    <div>
                        {text.substring(0,120)+ '...'} 
                        <span onClick={() => {setIsShowMore(true)}} className="text-[#06B6D4] cursor-pointer text-sm font-medium">show more</span>
                    </div>
                }
            </div> 
            :
            <div>{text}</div>
            }</h1>          

        </>        
    )
}

export default AboutComponent