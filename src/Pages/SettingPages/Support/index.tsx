import { BackIcon } from "../../../Components"

const SettingSupport =() => {  
    return (
        <>
            <div className="absolute w-full hiddenScrollBar h-dvh top-[0px] bg-white z-[15]">
                <div className="relative top-4">
                    <BackIcon title="Support" theme="Carbon"></BackIcon>

                </div>
                <div className="mt-[120px] hiddenScrollBar h-full">
                    <div className="px-4">
                        <p className="mb-4 ">Get in touch with us! Have any questions? Let us know, we're here to help!</p>
                        <div className="mb-4">
                            <div className="Carbon-TextField-container w-[100%]">
                                <label className="Carbon-TextField-label ">
                                    Name
                                    <span className="Carbon-TextField-label-required">*</span>
                                </label>
                                <div data-testid="input-container" deta-selectbox="false" className=" w-[100%] Carbon-TextField-box ">
                                    <input data-testid="input-id" deta-selectbox="true" className="Carbon-TextField-input" type="text" id="textfield76297" placeholder="Enter your full name..." name="FirstName" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="Carbon-TextField-container w-[100%]">
                                <label className="Carbon-TextField-label" >
                                    Email
                                    <span className="Carbon-TextField-label-required">*</span>
                                </label>
                                <div data-testid="input-container" deta-selectbox="false" className=" w-[100%] Carbon-TextField-box ">

                                    <input data-testid="input-id" deta-selectbox="true" className="Carbon-TextField-input" type="email" id="textfield28972" placeholder="Enter your email address..." name="Email" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-4 ">
                            <div className="Carbon-TextField-container w-[100%]">
                                <label className="Carbon-TextField-label" >Message</label>
                                <div data-testid="input-container" deta-selectbox="false" className=" w-[100%] Carbon-TextField-box">
                                    <input data-testid="input-id" deta-selectbox="true" className="Carbon-TextField-input" type="Message" id="textfield28972" placeholder="Write your message ..." name="Email" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 mb-4">
                            <button className="Carbon-Button-container">Send</button>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}
export default SettingSupport