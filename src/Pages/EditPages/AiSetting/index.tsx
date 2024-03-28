/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "symphony-ui";
import { BackIcon, TextField } from "../../../Components";
import { useFormik } from "formik";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Auth } from "../../../Api";
import { useConstructor } from "../../../help";

const EditAiSetting = () => {
  // let currentBox = auth.currentUser.boxs.filter((item) => item.getTypeName() == "")[0] as AboutBox;
  // if (currentBox == undefined) {
  //   currentBox = new AboutBox("about", "");
  // }  
  // const navigate = useNavigate();
  const [value, setValue] = useState<any>("**Hello world!!!**");
  const initialValue = {
    title: 'Ai Setting',
  };
  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: (values) => {
      console.log(values);
    },
  });  
  useConstructor(() => {
    Auth.showAiSetting((res) => {
      console.log(res)
    })
  })
  return (
    <>
      <div className="absolute w-full hiddenScrollBar h-dvh top-[0px] bg-white z-[15]">
        <div className="relative top-4">
          <BackIcon title="AI Setting" theme="Carbon"></BackIcon>
        </div>
        <div className="mt-[120px] hiddenScrollBar h-full">
          <div className="mt-24 px-6 text-left">
            <TextField
              {...formik.getFieldProps("title")}
              name="title"
              errorMessage={formik.errors?.title}
              theme="Carbon"
              label="Name"
              inValid={formik.errors?.title != undefined && (formik.touched?.title as boolean)}
              type="text"
              placeholder="Enter a name..."
            ></TextField>
          </div>
          <div className="px-6 mt-4">
            <div className="w-full mb-1 text-left">
              <label className={`Carbon-TextField-label `}>AI Knowledge</label>
            </div>
            <MDEditor
              value={value}
              data-color-mode="light"
              onChange={setValue}
            />
          </div>
          <div className="px-6 mt-10">
            <Button onClick={() => {
              Auth.updateAiSetting({
                name:formik.values.title,
                ai_knowledge:value
              })
            }} theme="Carbon">
              Save Change
            </Button>
          </div>
        </div>
      </div>    
    </>
  )
};

export default EditAiSetting;
