import { BackIcon } from "../../../Components"

const SettingPayment =() => {

    return (
        <>
            <div className=" w-full hiddenScrollBar h-dvh top-[0px] bg-white z-[15]">
                <div className=" top-4">
                    <BackIcon title="Payment" theme="Carbon"></BackIcon>

                </div>

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