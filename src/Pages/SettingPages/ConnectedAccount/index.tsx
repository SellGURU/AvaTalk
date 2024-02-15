import { Button } from "symphony-ui"
import { BackIcon, TextArea, TextField } from "../../../Components"
const SettingConnectedAccount =() => {

    return (
        <>
            <div className=" w-full hiddenScrollBar h-dvh top-[0px] bg-white z-[15]">
                <div className=" top-4">
                    <BackIcon title="Connected Accounts" theme="Carbon"></BackIcon>

                </div>
                <div className="mt-[120px] hiddenScrollBar h-full">
                    <div className="mt-24 px-6 text-left">
                        <TextField onBlur={() => {}} onChange={() =>{}}  value="" name="title"  theme="Carbon" label="Title" inValid={false}  type="text" placeholder="Enter title..."></TextField>
                    </div>
                    <div className="px-6 mt-3 text-left">
                        <TextArea inValid={false} onBlur={() => { } } onChange={() => { } } placeholder="Write your bio ..." textAreaHeight="136px" theme="Carbon" label="Bio" name="bio" value={""} ></TextArea>
                    </div>
                    <div className="px-6 mt-10">
                        <Button  theme="Carbon">Save Change</Button>
                    </div>

                </div>
            </div>
        </>
    )
}
export default SettingConnectedAccount