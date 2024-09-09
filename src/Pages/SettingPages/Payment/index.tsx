import { BackIcon } from "../../../Components"
import ImageGallery from "react-image-gallery";
import {Button} from "symphony-ui";

const SettingPayment =() => {
    const images = [
        {
            original: '/Carbon/trashVector.svg', // Path relative to public folder
            thumbnail: '/Carbon/trashVector.svg', // Optional thumbnail (can be the same image or different)
            description: '', // Optional description
        },
        {
            original: '/Carbon/trashVector.svg', // Another image
            thumbnail: '/Carbon/trashVector.svg',
            description: '',
        },
    ];

    return (
        <>
            <div className=" w-full hiddenScrollBar h-dvh top-[0px] bg-white z-[15]">
                <div className=" top-4">
                    <BackIcon title="Payment" theme="Carbon"></BackIcon>

                </div>
                <ImageGallery
                    showThumbnails={true} // Ensure thumbnails are visible
                    thumbnailPosition="right" // Thumbnail position on the right
                    showPlayButton={false} // Disable slideshow button
                    showFullscreenButton={false} // Disable fullscreen button
                    items={images}
                    renderLeftNav={(onClick, disabled) => {
                        return (
                            <div className={`Carbon-back-Button-container-box-NfcCard !top-[100%] w-fit flex items-end justify-end`} style={{transform: 'translate(30%, -50%)', left: '20%'}} data-mode="gallery">
                                <Button onClick={onClick} disabled={disabled} theme={`Carbon-back`}>
                                    <div className={`Carbon-back-Button-vector`}></div>
                                </Button>
                            </div>
                        );
                    }}
                    renderRightNav={(onClick, disabled) => {
                        return (
                            <div className={`Carbon-back-Button-container-box-NfcCard !top-[100%] flex items-start justify-start  w-fit`} style={{transform: 'translate(-30%, -50%)', right: '20%'}} data-mode="gallery">
                                <Button onClick={onClick} disabled={disabled} theme={`Carbon-back`} style={{rotate: '180deg'}}>
                                    <div className={`Carbon-back-Button-vector`}></div>
                                </Button>
                            </div>
                        );
                    }}
                />

                {/* <div className="mt-[120px] hiddenScrollBar h-full">
                    <div className="mt-24 px-6 text-left">
                        <TextField {...formik.getFieldProps("title")} name="title" errorMessage={formik.errors?.title} theme="Carbon" label="Title" inValid={formik.errors?.title != undefined && (formik.touched?.title as boolean)}  type="text" placeholder="Enter title..."></TextField>
                    </div>
                    <div className="px-6 mt-3 text-left">
                        <TextArea  {...formik.getFieldProps("bio")} errorMessage={formik.errors?.bio} placeholder="Write your bio ..." inValid={formik.errors?.bio != undefined && (formik.touched?.bio as boolean)} textAreaHeight="136px" theme="Carbon" label="Bio" name="bio" ></TextArea>
                    </div>
                    <div className="px-6 mt-10">
                        <Button onClick={submit} theme="Carbon">Save Change</Button>
                    </div>

                </div> */}
            </div>
        </>
    )
}
export default SettingPayment