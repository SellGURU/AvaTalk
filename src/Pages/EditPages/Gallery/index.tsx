/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, TextField } from "symphony-ui";
import { AccessNotifManager, BackIcon } from "../../../Components";
import ImageUploadr from "../../../Components/UploadImage";
import { GalleryBox } from "../../../Model";
import { useAuth } from "../../../hooks/useAuth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ReadyForMore } from "../../../Components/__Modal__";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
});

const EditGallery = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  let currentBox = auth.currentUser.boxs.filter((item) => item.getTypeName() == "GalleryBox")[0] as GalleryBox;
  if (currentBox == undefined) {
    currentBox = new GalleryBox("Gallery", []);
  }
  const [isReadyTO,setIsReadyTo] = useState(false)
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
    if(auth.currentUser.type_of_account.getType() == 'Free'){
      if(formik.values.files.length>5){
        setIsReadyTo(true)
      }else{
        auth.currentUser.addBox(new GalleryBox(formik.values.title, formik.values.files.slice(0, 5)));
        navigate("/");
      }
    }else{
       auth.currentUser.addBox(new GalleryBox(formik.values.title, formik.values.files));
       navigate("/");
    }
  };
  return (
    <>
      <div className="absolute w-full hiddenScrollBar h-dvh overflow-scroll top-[0px] bg-white z-[15]">
        <div className="relative top-8">
          <BackIcon title="Gallery" theme="Carbon"></BackIcon>
        </div>
        <div className="mt-[120px] hiddenScrollBar h-full">
          <div className="px-6 mt-24  mb-[24px]">
            <AccessNotifManager page="GallerySetting"></AccessNotifManager>

          </div>          
          <div className="px-6">
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
              accept="image/*"
              limite={5}
              userMode={auth.currentUser.type_of_account.getType()}
              value={formik.values.files.map((item) => {
                return {
                  url: item.original,
                  name: item.name?item.name: "item",
                };
              })}
              uploades={(files: Array<any>) => {
                console.log(files)
                const converted = files.map((item) => {
                  return {
                    original: item.url,
                    thumbnail: item.url,
                    name:item.name,
                    sizes:`(max-width: 710px) 120px,(max-width: 991px) 193px,278px`
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
        {isReadyTO &&
          <div className="fixed w-full left-0 bottom-0 flex justify-center">
            <ReadyForMore page="Gallery" onClose={() => {
              setIsReadyTo(false)
            }} ></ReadyForMore>
          </div>
        }          
      </div>
    </>
  );
};
export default EditGallery;
