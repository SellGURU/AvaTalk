/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, TextField } from "symphony-ui";
import { AccessNotifManager, BackIcon } from "../../../Components";
import ImageUploadr from "../../../Components/UploadImage";
import { FileBox,File } from "../../../Model";
import { useAuth } from "../../../hooks/useAuth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ReadyForMore } from "../../../Components/__Modal__";

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
  const [files,setFiles] = useState<Array<File>>(currentBox.getContents().map(((item:File) => Object.assign(new File('','',''),item))))
  const initialValue = {
    title: currentBox.getTitle(),
    files: currentBox.getContents(),
  };
  const [isReadyTO,setIsReadyTo] = useState(false)
  const formik = useFormik({
    initialValues: initialValue,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const submit = () => {
    if(auth.currentUser.type_of_account.getType() == 'Free' && formik.values.files.length > 1){
      setIsReadyTo(true)
    }else {
      auth.currentUser.addBox(new FileBox(formik.values.title, formik.values.files));
      navigate("/");
    }
  };
  return (
    <>
      <div className="absolute w-full hiddenScrollBar h-dvh overflow-scroll top-[0px] bg-white z-[15]">
        <div className="relative top-8">
          <BackIcon title="File" theme="Carbon"></BackIcon>
        </div>
        <div className="mt-[120px] hiddenScrollBar h-full">
          <div className="px-6 mt-24  mb-[24px]">
            <AccessNotifManager isLimited={isReadyTO} page="FileSetting"></AccessNotifManager>
          </div>             
          <div className=" px-6">
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
              accept=".pdf, .doc, .docx, .xls, .xlsx, .pptx, .psd, .ai, .id"
              value={files.map((item) => {
                return {
                  url: item.geturl(),
                  name: item.getName(),
                  type:item.getType()
                };
              })}
              limite={0}
              userMode={auth.currentUser.type_of_account.getType()}
              uploades={(files: Array<any>) => {
                console.log(files)
                const converted:Array<File> = files.map((item) => {
                  console.log("item.type",item.type)
                  const newFile:File = new File(item.url,item.name,item.type)
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
              Save Changes
            </Button>
          </div>
        </div>
        {isReadyTO &&
          <div className="fixed w-full left-0 bottom-0 flex justify-center">
            <ReadyForMore page="File" onClose={() => {
              setIsReadyTo(false)
            }} ></ReadyForMore>
          </div>
        }         
      </div>
    </>
  );
};
export default EditFile;
