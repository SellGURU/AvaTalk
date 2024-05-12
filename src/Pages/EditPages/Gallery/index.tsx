/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, TextField } from "symphony-ui";
import { BackIcon } from "../../../Components";
import ImageUploadr from "../../../Components/UploadImage";
import { GalleryBox } from "../../../Model";
import { useAuth } from "../../../hooks/useAuth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
});

const EditGallery = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  let currentBox = auth.currentUser.boxs.filter((item) => item.getTypeName() == "GalleryBox")[0] as GalleryBox;
  if (currentBox == undefined) {
    currentBox = new GalleryBox("gallery", []);
  }
  const initialValue = {
    title: currentBox.getTitle(),
    files: currentBox.getContents(),
  };
  const formik = useFormik({
    initialValues: initialValue,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const submit = () => {
    auth.currentUser.addBox(new GalleryBox(formik.values.title, formik.values.files));
    navigate("/");
  };
  return (
    <>
      <div className="absolute w-full hiddenScrollBar h-dvh overflow-scroll top-[0px] bg-white z-[15]">
        <div className="relative top-8">
          <BackIcon title="Gallery" theme="Carbon"></BackIcon>
        </div>
        <div className="mt-[120px] hiddenScrollBar h-full">
          <div className="mt-24 px-6">
            <TextField
              {...formik.getFieldProps("title")}
              errorMessage={formik.errors?.title}
              inValid={formik.errors?.title != undefined && (formik.touched?.title as boolean)}
              theme="Carbon"
              label="Title"
              name="title"
              type="text"
              placeholder="Enter title..."
            ></TextField>
          </div>
          <div className="px-6 mt-3">
            <ImageUploadr
              value={formik.values.files.map((item, index) => {
                return {
                  url: item.original,
                  name: "itembox " + index * 2000,
                };
              })}
              uploades={(files: Array<any>) => {
                const converted = files.map((item) => {
                  return {
                    original: item.url,
                    thumbnail: item.url,
                  };
                });
                formik.setFieldValue("files", converted);
              }}
              mod="files"
              label="Upload Images"
            ></ImageUploadr>
          </div>
          <div className="px-6 mt-10">
            <Button onClick={submit} theme="Carbon">
              Save Change
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditGallery;
