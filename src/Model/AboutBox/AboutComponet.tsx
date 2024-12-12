/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react"
// import { Auth } from "../../Api"

interface AboutComponentProps  {
    text:string,
    userID:string
}

const AboutComponent:React.FC<AboutComponentProps> = ({text}) => {
    const [isShowMore,setIsShowMore] =useState(false)
    return (
        <>
            <h1 style={{lineHeight:'normal'}} onClick={() => {
                // Auth.addEvent({
                //     event_type:"more_info",
                //     userid:userID,
                //     sub_event_category:'more_info_about'
                // })                   
            }}>{text.length> 130?
            <div>
                {isShowMore?
                    <div className="" style={{lineHeight: 'normal'}}>
                        <p className={"text-wrap break-words"}>
                            {text}
                        </p>
                            <span onClick={() => {
                                setIsShowMore(false)
                            }} className="text-[#06B6D4] cursor-pointer text-sm font-medium">show less</span>
                    </div>
                    :
                    <div>
                        <p className={"text-wrap break-words"}>

                            {text.substring(0,120)+ '...'}
                        </p>
                        <span onClick={() => {setIsShowMore(true)}} className="text-[#06B6D4] cursor-pointer text-sm font-medium">show more</span>
                    </div>
                }
            </div> 
            :
                <div style={{lineHeight: 'normal'}}>
                    <p className={"text-wrap break-words"}>

                    {text}
                    </p>
                </div>
            }</h1>

        </>
    )
}

export default AboutComponent