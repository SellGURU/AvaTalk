/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react"
import { publish } from "../../../utils/event"
import useModalAutoClose from "../../../hooks/useModalAutoClose"
import { Button } from "symphony-ui"

interface GoogleMapModalProps {
    onClose:() =>void
    theme:string
    context:any
}

const GoogleMapModal:React.FC<GoogleMapModalProps> = ({onClose,theme,context}) => {
    const googlebox = context.boxs.filter((el:any) =>el.type_name == 'GoogleMapBox')[0]
    console.log(googlebox.location)
    useEffect(() => {
        publish("IncressFooter",{})
        publish("profileIsReview",{})
        return () => {
            publish("profileIsProfile",{})
            publish("DisIncressFooter",{})
        }
    },[])   
    const openMap = (name:string) =>{
        if(name == 'neshan'){
            // console.log(`https://neshan.org/maps#c${googlebox.location.lan}-${googlebox.location.lat}-16z-0p`)
        //    return `https://neshan.org/open?lat=${googlebox.location.lan}&lng=${googlebox.location.lat}`
            return `https://neshan.org/maps#c${googlebox.location.lan}-${googlebox.location.lat}`
        }
        if(name == 'waze'){
            return `https://www.waze.com/live-map/?ll=${googlebox.location.lat},${googlebox.location.lan}&navigate=yes`
        }
        return `https://www.google.com/maps?q=${googlebox.location.lat},${googlebox.location.lan}`
    } 
    const refEl =useRef<HTMLDivElement>(null)    
    useModalAutoClose({
        refrence:refEl,
        close:() => {
            onClose()
        }
    })         
    return (
        <>
            <div ref={refEl} className="rounded-[27px] px-6 py-6 max-w-[32rem] h-auto max-h-[678px] pb-10 rounded-b-none slideupModal  bg-white w-full">
                <div className='flex w-full justify-between items-center mb-4'>
                    <Button onClick={onClose} theme="Carbon-back">
                        <div className={`${theme}-back-Button-vector`}></div>
                    </Button>
                    <div>
                        <div className='text-text-primary text-[14px] font-semibold contactNameShadow'>Choose one of this</div>
                    </div>
                    <div className="invisible">
                        <Button onClick={onClose} theme="Carbon-back">
                            <div className={`${theme}-back-Button-vector`}></div>
                        </Button>
                    </div>
                </div>       

                <div className="w-full flex justify-center gap-2">
                    <div onClick={() => {
                        window.open(openMap("neshan"), "_blank")
                        
                    }} className="w-[40px] borderBox-Gray h-[40px] cursor-pointer rounded-full ">
                        <img src={'./icons/neshan.png'} alt="" />
                    </div>
                    <div onClick={() => {
                         window.open(openMap("google"), "_blank")
                        
                    }} className="w-[40px] borderBox-Gray h-[40px] overflow-hidden cursor-pointer rounded-full ">
                        <img src={'./icons/googlemap.png'} alt="" />
                    </div>      
                    <div onClick={() => {
                        window.open(openMap("waze"), "_blank")
                        
                    }} className="w-[40px] borderBox-Gray h-[40px] overflow-hidden cursor-pointer rounded-full ">
                        <img src={`https://logo.clearbit.com/${new URL('https://www.waze.com/live-map/').hostname}`} alt="" />
                    </div>                                     
                </div>                 
            </div>
        </>
    )
}

export default GoogleMapModal