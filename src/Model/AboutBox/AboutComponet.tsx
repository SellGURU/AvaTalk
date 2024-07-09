/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react"
import { Auth } from "../../Api"

interface AboutComponentProps  {
    text:string,
    userID:string
}

const AboutComponent:React.FC<AboutComponentProps> = ({text,userID}) => {
    const [isShowMore,setIsShowMore] =useState(false)
    return (
        <>
            <h1 onClick={() => {
                Auth.addEvent({
                    event_type:"more_info",
                    userid:userID,
                    sub_event_category:'more_info_about'
                })                   
            }}>{text.length> 130?
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