import { Button, TextField } from "symphony-ui"
import { BackIcon,TextArea } from "../../../Components"

const EditAbout =() => {
    return (
        <>
            <div className="w-full absolute h-screen bg-white z-[12]">
                <BackIcon title="Edit Profile" theme="Carbon"></BackIcon>
                <div className="mt-24 px-6">
                    <TextField theme="Carbon" label="Title" inValid={false} name="title" onBlur={() => {}} onChange={() => {}} type="text" value="" placeholder="Enter title..."></TextField>
                </div>
                <div className="px-6 mt-3">
                    <TextArea  placeholder="Write your Bio ..." textAreaHeight="136px" theme="Carbon" label="bio" inValid={false} name="bio" onBlur={() => {}} onChange={()=>{}} value=""></TextArea>
                </div>
                <div className="px-6 mt-10">
                    <Button theme="Carbon">Save Change</Button>
                </div>
            </div>
        </>
    )
}
export default EditAbout