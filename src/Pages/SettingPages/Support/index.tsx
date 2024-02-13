import { BackIcon , TextArea ,TextField} from "../../../Components"

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
                        <div className="mb-4 text-left">
                            <TextField onBlur={() => {}} onChange={() =>{}}  value="" name="Name"  theme="Carbon" label="Name" inValid={false}  type="text" placeholder="Enter your full name..."></TextField>
                        </div>
                        <div className="mb-4 text-left">
                            <TextField onBlur={() => {}} onChange={() =>{}}  value="" name="Email"  theme="Carbon" label="Email" inValid={false}  type="email" placeholder="Enter your email address..."></TextField>
                        </div>
                        <div className="mt-4 text-left">
                            <TextArea inValid={false} onBlur={() => { } } onChange={() => { } } placeholder="Write your message ..." textAreaHeight="136px" theme="Carbon" label="Message" name="Message" value={""} ></TextArea>
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