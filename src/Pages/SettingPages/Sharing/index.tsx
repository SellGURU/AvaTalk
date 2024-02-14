import { Button } from "symphony-ui"
import { Outlet, useNavigate } from "react-router-dom"

const SettingSharing =() => {
    const navigate = useNavigate();

    return (
        <>
        <div className={`Carbon-ChatDetails-container`}>
            <Outlet></Outlet>
            <div className="flex px-6 items-center space-x-4 absolute  top-8">
                <Button onClick={() => {navigate(-1)}} theme={`Carbon-back`}>
                    <div className={`Carbon-back-Button-vector`}></div>
                </Button>
                <p className={`Carbon-ChatDetails-title`}>Sharing</p>
            </div>            

            <div className="flex flex-col gap-y-5 px-6 mt-[96px] hiddenScrollBar h-[-webkit-fill-available] overflow-y-scroll pb-[300px] pt-[32px]">
                <div className="px-6 ">
                    <div className="Carbon-Edit-title">Select Sharing Mode</div>
                    <div className="px-6 mt-24 Carbon-Setting-CardContainer flex items-center gap-2 text-justify">
                        <div>
                            <div className="font-medium text-sm">Default Mode</div>
                            <p className="text-xs text-gray-400">Collect contact info via a form, then share your details directly to your contact’s phone.</p>
                        </div>
                        <div>
                            <div className="w-6 h-6 cursor-pointer boxShadow-Gray rounded-full border border-white bg-primary-color">
                                <div className=" flex items-center justify-center">
                                    <span className="text-white">✓</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 mt-24 Carbon-Setting-CardContainer flex items-center gap-2 text-justify">
                        <div>
                            <div className="font-medium text-sm flex gap-2 items-center mb-1">
                                Lead Mode
                                <p className="flex justify-center items-center text-white leading-[20px] text-[12px] font-[400] bg-primary-color border border-white w-[47px] rounded-[47px] h-5 ">Pro</p>
                            </div>
                            <p className="text-xs text-gray-400">Collect contact info via a form, then send an automated text and email with your details.</p>
                        </div>
                        <div className=" flex items-center justify-center">
                            <span className="w-6 h-6 cursor-pointer relative borderBox-Gray btnInnerShadowsDark rounded-full"></span>
                        </div>
                    </div>
                    <div className="px-6 mt-24 Carbon-Setting-CardContainer flex items-center gap-2 text-justify">
                        <div>
                            <div className="font-medium text-sm flex gap-2 items-center mb-1">
                                Share Mode
                                <p className="flex justify-center items-center text-white leading-[20px] text-[12px] font-[400] bg-primary-color border border-white w-[47px] rounded-[47px] h-5 ">Pro</p>
                            </div>
                            <p className="text-xs text-gray-400">Share your contact details directly to your contact’s phone, without any forms or follow-up.</p>
                        </div>
                        <div className=" flex items-center justify-center">
                            <span className="w-6 h-6 cursor-pointer relative borderBox-Gray btnInnerShadowsDark rounded-full"></span>
                        </div>                           
                    </div>
                    <div className="mt-6 flex flex-col gap-4">
                        <div className="Carbon-Edit-title">Advanced Settings</div>
                        <div>Send a follow-up email</div>
                        <div>Send a follow-up SMS</div>
                        <div className="flex gap-2 items-center">
                            Additional Settings
                            <p className="flex justify-center items-center text-white leading-[20px] text-[12px] font-[400] bg-primary-color border border-white w-[47px] rounded-[47px] h-5 ">Pro</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default SettingSharing