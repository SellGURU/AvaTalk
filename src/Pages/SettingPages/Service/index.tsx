import { Button } from "symphony-ui"
import { Outlet, useNavigate } from "react-router-dom"
// import { useState } from "react";
import { ToggleButton } from "../../../Components";
import { useAuth } from "../../../hooks/useAuth";
// interface serviceType {
//     title:string,
//     price:number
// }

const SettingService =() => {
    const context = useAuth()
    const navigate = useNavigate();
    // const service:Array<serviceType> = [
    //     {
    //         title:'Annually',
    //         price:345
    //     },
    //     {
    //         title:'Monthly',
    //         price:45
    //     },
    // ] 
    // const [activeService,setAtiveService] = useState<serviceType>()

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
                        <p className="mb-4 text-[14px] text-[#374151] font-medium">You’re Currently our {context.currentUser.type_of_account.getType()+ ' Plan'}</p>
                        <p className="text-[14px] mb-6 text-[#6B7280] px-8 text-center">Your {context.currentUser.type_of_account.getType()} will end in {context.currentUser.type_of_account.getDaysReminded()} days. Don't lose your momentum—go Pro to continue enjoying the benefits.</p>
                    </div>
                    <div>
                        <ToggleButton onButtonClick={() => {}} leftText="Annually $200" rightText="Monthly $20" theme="Carbon-secandary" />                        
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
                                    <div className="flex items-center">
                                        <span className="w-6 h-6 mr-3 cursor-pointer relative border border-white bg-primary-color rounded-full p-[5px]">
                                            <span className="absolute w-3 h-3 rounded-full borderBox-Gray boxShadow-Gray"></span>
                                        </span>
                                        {item.title}
                                    </div>
                                    <div className="text-sm text-gray-700">{item.price} $</div>
                                    </>
                                :
                                    <>
                                    <div className="flex items-center">
                                        <span className="w-6 h-6 mr-3 cursor-pointer relative borderBox-Gray btnInnerShadowsDark rounded-full"></span>
                                        {item.title}
                                    </div>
                                    </>
                                }
                            </div>
                        )
                    })} */}
                    <div className="mt-8 mb-4">
                        <Button theme="Carbon">Continue to Payment</Button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default SettingService