import { Button } from "symphony-ui"
import { BackIcon } from "../../../Components"
import { useAuth } from "../../../hooks/useAuth"
import { toast } from "react-toastify"
import { useConstructor } from "../../../help"
import { Auth } from "../../../Api"
import { useState } from "react"

const ReferYourFriends = () => {
    const application = useAuth()
    const [referalValue,setReferalValue] = useState(0)
    useConstructor(() => {
        Auth.getReferalNumber().then(res => {
            setReferalValue(res.data.count_referral_code)
        })
    })
    return (
        <>
           <div className=" w-full hiddenScrollBar overflow-y-scroll h-dvh top-[0px] bg-white z-[15]">
                <div className=" top-4 bg-white">
                    <BackIcon title="Refer and Get Rewards" theme="Carbon"></BackIcon>
                </div>         
                <div className="w-full  h-[80px] bg-white absolute top-0"></div>   
                <div className="mt-[100px] px-8 w-full hiddenScrollBar h-full">
                    <div className="w-full flex justify-center">
                        <img src="./icons/gift2.svg" alt="" />
                    </div>
                    <div className="w-full relative h-[96px] overflow-hidden bg-[#0000001A] mt-4 rounded-[24px]">
                        <div className="w-full absolute top-0 left-0 z-10">
                            <div className="text-sm text-center font-medium mt-5 text-white">Total No. of Referral</div>
                            <div className="text-[20px] text-center font-semibold mt-2 text-white">{referalValue}</div>
                        </div>
                        <div className="w-full h-full absolute">
                            <img className="w-full" src="./icons/Image.png" alt="" />
                        </div>
                        <div className="w-full h-full bg-[#6D28D9] rounded-[24px]"></div>
                    </div>  

                    <div className="w-full bg-white boxShadow-Gray  mt-8 py-4 px-6 rounded-[27px] ">
                        <div className="text-[#374151] text-[16px] text-center font-medium">Invite Your Friends</div>
                        
                        <div className="text-[#6B7280] text-[14px] text-center px-5 mt-4">
                            You can invite your friends to use our application by either copying and sharing your referral code or 
                            by clicking the invite button.
                        </div>
                        <div className="flex gap-2 justify-between mt-6 w-full">
                            <Button onClick={() => {
                                navigator.clipboard.writeText(application.currentUser.information?.referral_code as string)
                                toast.success("Copied Successfully")
                            }} theme="Carbon-Google">
                                <div className="flex w-full justify-center items-center">
                                    <div className={`Carbon-Edit-copyIcon`}></div>
                                   <div className="ml-2 text-[#5B21B6]">{application.currentUser.information?.referral_code}</div> 
                                </div>
                            </Button>
                            <Button onClick={() => {
                                navigator.share({
                                    url:application.currentUser.information?.referral_code
                                })
                            }} theme="Carbon">
                                <div className="flex w-full justify-center items-center">
                                    <div className={`Carbon-Edit-shareIcon `} style={{width:'16px'}}></div>
                                   <div className="ml-2">Share Code</div> 
                                </div>
                            </Button>
                        </div>
                    </div>  
                </div>            
           </div>
        </>
    )
}

export default ReferYourFriends