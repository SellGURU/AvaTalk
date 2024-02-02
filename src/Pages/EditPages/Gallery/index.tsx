import { Button, TextField } from "symphony-ui"
import { BackIcon } from "../../../Components"
import ImageUploadr from "../../../Components/UploadImage"

const EditGallery =() => {
    return (
        <>
            <div className="w-full absolute h-screen bg-white z-[12]">
                <BackIcon title="Gallery" theme="Carbon"></BackIcon>
                <div className="mt-24 px-6">
                    <TextField theme="Carbon" label="Title" inValid={false} name="title" onBlur={() => {}} onChange={() => {}} type="text" value="" placeholder="Enter title..."></TextField>
                </div>
                <div className="px-6 mt-3">
                  <ImageUploadr label="Upload Images"></ImageUploadr>
                </div>
                <div className="px-6 mt-10">
                    <Button theme="Carbon">Save Change</Button>
                </div>
            </div>
        </>
    )
}
export default EditGallery