import { Button } from "symphony-ui"
import { Outlet, useNavigate } from "react-router-dom"

const SettingService =() => {
    const navigate = useNavigate();

    return (
        <>
        <div className={`Carbon-ChatDetails-container`}>
            <Outlet></Outlet>
            <div className="flex px-6 items-center space-x-4 absolute  top-8">
                <Button onClick={() => {navigate(-1)}} theme={`Carbon-back`}>
                    <div className={`Carbon-back-Button-vector`}></div>
                </Button>
                <p className={`Carbon-ChatDetails-title`}>Your Service</p>
            </div>            

            <div className="flex flex-col gap-y-5 px-6 mt-[96px] hiddenScrollBar h-dvh overflow-y-scroll pb-[300px] pt-[32px]">
                <div className="">
                    <div className="flex flex-col justify-center items-center">
                        <img className={`Carbon-Setting-logo`} src="/Carbon/splashImage.svg" alt="" />
                        <p className="mb-4">You’re using our free plan</p>
                        <p className="text-gray-500 mb-2">Unlock the full networking experience with upgrade features</p>
                    </div>
                    <div className="px-6 mb-6 flex flex-col Carbon-Setting-CardContainer items-center ">
                        <div className="flex flex-col items-start gap-4">
                            <div className="flex justify-center items-center gap-2">
                                <div className="Carbon-Setting-TickCircle"></div>
                                Real-Time Analytics
                            </div>
                            <div className="flex justify-center items-center gap-2">
                                <div className="Carbon-Setting-TickCircle"></div>
                                Calendar Integration
                            </div>
                            <div className="flex justify-center items-center gap-2">
                                <div className="Carbon-Setting-TickCircle"></div>
                                Access to Pro Content
                            </div>
                            <div className="flex justify-center items-center gap-2">
                                <div className="Carbon-Setting-TickCircle"></div>
                                Customize settings
                            </div>
                        </div>
                    </div>
                    <div className="px-6 mb-4 flex items-center Carbon-Setting-CardContainer ps-5 ">
                        <span className="w-6 h-6 mr-3 cursor-pointer relative borderBox-Gray btnInnerShadowsDark rounded-full"></span>
                        Annually
                    </div>
                    <div className="px-6 mb-4 flex items-center Carbon-Setting-CardContainer ps-5 ">
                        <span className="w-6 h-6 mr-3 cursor-pointer relative borderBox-Gray btnInnerShadowsDark rounded-full"></span>
                        Monthly
                    </div>
                    <div className="mt-8 mb-4">
                        <button className="Carbon-Button-container">Continue to payment</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default SettingService