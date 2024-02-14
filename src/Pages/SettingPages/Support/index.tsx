import { TextArea ,TextField} from "../../../Components"
import { Button } from "symphony-ui"
import { Outlet, useNavigate } from "react-router-dom"

const SettingSupport =() => {  
    const navigate = useNavigate();

    return (
        <>
        <div className={`Carbon-ChatDetails-container`}>
            <Outlet></Outlet>
            <div className="flex px-6 items-center space-x-4 absolute  top-8">
                <Button onClick={() => {navigate(-1)}} theme={`Carbon-back`}>
                    <div className={`Carbon-back-Button-vector`}></div>
                </Button>
                <p className={`Carbon-ChatDetails-title`}>Support</p>
            </div>            

            <div className="flex flex-col gap-y-5 px-6 mt-[96px] hiddenScrollBar h-[-webkit-fill-available] overflow-y-scroll pb-[300px] pt-[32px]">
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
            
        </>
    )
}
export default SettingSupport