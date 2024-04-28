/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, TextField } from "symphony-ui";
import { BackIcon } from "../../../Components";
import ImageUploadr from "../../../Components/UploadImage";
import { FileBox,File } from "../../../Model";
import { useAuth } from "../../../hooks/useAuth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
});

const EditFile = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  let currentBox = auth.currentUser.boxs.filter((item) => item.getTypeName() == "FileBox")[0] as FileBox;
  if (currentBox == undefined) {
    currentBox = new FileBox("File", []);
  }
  const [files,setFiles] = useState<Array<File>>(currentBox.getContents().map(((item:File) => Object.assign(new File('',''),item))))
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
    auth.currentUser.addBox(new FileBox(formik.values.title, formik.values.files));
    navigate("/");
  };
  return (
    <>
      <div className="absolute w-full hiddenScrollBar h-dvh overflow-scroll top-[0px] bg-white z-[15]">
        <div className="relative top-4">
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
              value={files.map((item, index) => {
                return {
                  url: item.geturl(),
                  name: "itembox " + index * 2000,
                };
              })}
              uploades={(files: Array<any>) => {
                const converted:Array<File> = files.map((item) => {
                  const newFile:File = new File(item.url,item.name)
                  return newFile
                });
                setFiles(converted)
                formik.setFieldValue("files", converted);
              }}
              mod="files"
              label="Upload Files"
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
export default EditFile;
