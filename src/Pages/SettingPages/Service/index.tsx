/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "symphony-ui"
import { Outlet, useNavigate, useSearchParams, useLocation } from "react-router-dom"
// import { useState } from "react";
import { ToggleButton } from "../../../Components";
import { useAuth } from "../../../hooks/useAuth";
import { Service } from "../../../Api";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { publish } from "../../../utils/event";
// import {useState} from "react";
interface serviceType {
    title:string,
    price:number,
    mode:'month'|'year'
}

const SettingService =() => {
    const context = useAuth()
    const navigate = useNavigate();
    const [searchParametr] = useSearchParams()
    const location = useLocation();    
    const [isOpen, setIsOpen] = useState(false);
    // console.log(searchParametr.get("sassionid"))
    useEffect(() => {
        if(searchParametr.get("status") == "true"){
            setIsOpen(true)
            setTimeout(() => {
                Service.subRedirect(searchParametr.get("sassionid")||"").then(() => {
                    publish("refreshPage",{})
                    navigate(location.pathname, { replace: true });                  
                })    
            }, 1000);
        }
    })
    const service:Array<serviceType> = [
        {
            title:'Annually $200',
            price:200,
            mode:'year'
        },
        {
            title:'Monthly $20',
            price:20,
            mode:'month'
        },
    ]
    const [activeService,setAtiveService] = useState<serviceType>({
            title:'Annually $200',
            mode:'year',
            price:200
        },)
    console.log("context.currentUser.type_of_account.getType():",context.currentUser.type_of_account.getType())
    return (
        <>
        <div className={`Carbon-ChatDetails-container`}>
            <Outlet></Outlet>
            <div className="flex px-6 items-center space-x-4 absolute  top-8">
                <Button onClick={() => {navigate(-1)}} theme={`Carbon-back`}>
                    <div className={`Carbon-back-Button-vector`}></div>
                </Button>
                <p className={`Carbon-ChatDetails-title`}>Your plan</p>
            </div>            

            <div className="flex flex-col gap-y-5 px-6 mt-[96px] hiddenScrollBar h-dvh overflow-y-scroll pb-[300px] pt-[32px]">
                <div className="">
                    <div className="flex flex-col justify-center items-center">
                        <img className={`w-[147px] mb-6`} src="/icons/logo2.svg" alt="" />
                        <p className="mb-4 text-[14px] text-[#374151] font-medium">You’re using our {" "+context.currentUser.type_of_account.getType()+ ' Plan'}</p>

                        <p className="text-[14px] mb-6 text-[#6B7280] px-8 text-center">
                            {context.currentUser.type_of_account.getType() ==="Trial" &&
                                        `Your trial will end in ${context.currentUser.type_of_account.getDaysReminded()} days. Don't lose your momentum—go Pro to continue enjoying the benefits.`}
                            {context.currentUser.type_of_account.getType()==="Free"&&`Your ${context.currentUser.type_of_account.getOldType()} was expired ${context.currentUser.type_of_account.getOldExpiredDate()}.Upgrade to Pro to unlock premium features and elevate your networking game!`}
                            {context.currentUser.type_of_account.getType()==="Pro"&&`Your subscription will expire at ${context.currentUser.type_of_account.getDateExpired()}.`}

                        </p>

                    </div>
                    {context.currentUser.type_of_account.getType() !="Pro" &&
                        (<>
                        <div>
                        <ToggleButton onButtonClick={(value) => {
                            setAtiveService(service.filter(el => {
                                return el.title.includes(value)
                            })[0])
                        }} leftText={"Annually $200"} rightText="Monthly $20" theme="Carbon-secandary" />
                    </div>
                  <div className="px-6 mb-6 flex flex-col Carbon-Setting-CardContainer items-center ">
                            <div className="flex flex-col items-start gap-4">
                                <div className="flex justify-center items-center gap-2">
                                    <div className="Carbon-Setting-TickCircle"></div>
                                    Unlimited AI Persona Edits
                                </div>
                                <div className="flex justify-center items-center gap-2">
                                    <div className="Carbon-Setting-TickCircle"></div>
                                    Upload up to 50 Images
                                </div>
                                <div className="flex justify-center items-center gap-2">
                                    <div className="Carbon-Setting-TickCircle"></div>
                                    Add Unlimited Links
                                </div>
                                <div className="flex justify-center items-center gap-2">
                                    <div className="Carbon-Setting-TickCircle"></div>
                                    Share up to 1GB Files
                                </div>
                                <div className="flex justify-center items-center gap-2">
                                    <div className="Carbon-Setting-TickCircle"></div>
                                    Access to Insightful Analytics
                                </div>
                            </div>
                        </div>

                            {/* {service.map((item)=>{
                                return(
                                    <div className="px-6 mb-4 flex items-center justify-between Carbon-Setting-CardContainer ps-5" onClick={()=>setAtiveService(item)}>
                                        {activeService?.title == item.title ?
                                            <>
                                                <div className="flex items-center text-sm font-medium text-[#374151]">
                                                    <div
                                                        className="w-6 h-6 flex mr-3 items-center justify-center cursor-pointer relative border border-white bg-primary-color rounded-full p-[5px]">
                                                        <input type={"radio"} className={""}/>
                                                    </div>
                                                    {item.title}
                                                </div>
                                                <div className="text-sm text-[#6B7280] font-normal">{item.price} $</div>
                                            </>
                                            :
                                            <>
                                                <div className="flex items-center">
                                                    <div
                                                        className="w-6 h-6 mr-3   cursor-pointer relative borderBox-Gray  rounded-full"></div>
                                                    <h1 className={"text-sm font-medium text-[#374151]"}>{item.title}</h1>
                                                </div>
                                                <div className="text-sm text-[#6B7280] font-normal">{item.price} $</div>
                                            </>
                                        }
                                    </div>
                                )
                            })} */}
                    <div className="mt-8 mb-4">
                        <Button onClick={() => {
                            console.log(activeService)
                            Service.SubLink({
                                quantity:1,
                                recurring_interval:activeService.mode,
                                unit_amount:activeService.price * 100
                            }).then(res => {
                                window.open(res.data.sublink)
                            })
                        }} theme="Carbon">Continue to Payment</Button>
                    </div>
                        </>)}
                    {context.currentUser.type_of_account.getType() ==="Pro" &&
                    <div className={"w-full flex justify-center items-center mt-6 gap-2"}>

                    <img src={"/Carbon/safety money.svg"}/>
                    </div>
                    }
                </div>
            </div>
        </div>
        <Modal
            isOpen={isOpen}
            onRequestClose={() => {
                setIsOpen(false)}
        }
            style={{ content: { borderRadius: "24px", width: "100%", maxWidth: "360px", background: "rgba(243, 244, 246, 1)" }, overlay: { backgroundColor: "rgba(0,0,0,0.7)" } }}
            contentLabel=" Modal"
        >
            <div className={" relative pb-5 pt-12"}>
                <div className={"absolute right-0 top-0"}>
                    <Button onClick={() => {
                        setIsOpen(false)
                    }} data-mode="profile-review-button-2" theme="Carbon-Google">
                        <div className="Carbon-Profile-closeIcon Carbon-Footer-Vectors m-0 "></div>
                    </Button>
                </div>
            <div className={"flex flex-col items-center justify-center"}>

                <img src={"/Carbon/tick-circle.svg"}/>
                <h1 className={"text-lg font-semibold text-[#374151]"}>Your purchase</h1>
                <p className={"text-lg font-semibold text-[#374151]"}>has been successfully completed</p>
            </div>
            </div>
        </Modal>        
        </>
    )
}
export default SettingService