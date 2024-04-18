/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "symphony-ui";
import { BackIcon, Select, TextArea } from "../../../Components";
import { useFormik } from "formik";
// import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Auth } from "../../../Api";
import { useConstructor } from "../../../help";
import { useNavigate } from "react-router-dom";

const EditAiSetting = () => {
  // let currentBox = auth.currentUser.boxs.filter((item) => item.getTypeName() == "")[0] as AboutBox;
  // if (currentBox == undefined) {
  //   currentBox = new AboutBox("about", "");
  // }  
  const navigate = useNavigate();
  const [value, setValue] = useState<any>("");
  const [gender,setGender] = useState('female')
  const initialValue = {
    title: 'Ai Setting',
    Greeting:'',
    Description:''
  };
  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: (values) => {
      console.log(values);
    },
  });  
  useConstructor(() => {
    Auth.showAiSetting((res) => {
      formik.setFieldValue("title",res.ai_setting.Name)
      setValue(res.ai_setting["AI Knowledge"])
      setGender(res.gender != null ?res.gender :'female')
    })
  })
  return (
    <>
      <div className="absolute w-full hiddenScrollBar overflow-y-scroll h-dvh top-[0px] bg-white z-[15]">
        <div className="relative top-4">
          <BackIcon title="AI Setting" theme="Carbon"></BackIcon>
        </div>
        <div className="mt-[120px] hiddenScrollBar h-full">
          {/* <div className="mt-24 px-6 text-left">
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
          </div> */}
          {/* <div className="px-6 mt-4 opacity-50">
            <div className="w-full mb-1 text-left">
              <label className={`Carbon-TextField-label `}>Greeting</label>
            </div>
            <TextArea disabled placeholder="e.g. Hello, I’m Alex. Ask me anything about my Career." inValid={false} name="Greeting" onBlur={() => {}} onChange={(event) => {
              formik.setFieldValue("Greeting",event.target.value)
            }} value={formik.values.Greeting} theme="Carbon" textAreaHeight='100px'></TextArea>
          </div>     
          <div className="px-6 mt-4 opacity-50">
            <div className="w-full mb-1 text-left">
              <label className={`Carbon-TextField-label `}>Description</label>
            </div>
            <TextArea disabled placeholder="How would your character describe themselves..." inValid={false} name="Description" onBlur={() => {}} onChange={(event) => {
              formik.setFieldValue("Description",event.target.value)
            }} value={formik.values.Description} theme="Carbon" textAreaHeight='100px'></TextArea>
          </div>                   */}
          <div className="px-6 mt-4">
            <div className="w-full mb-1 text-left">
              <label className={`Carbon-TextField-label `}>AI Knowledge</label>
            </div>
            <TextArea placeholder="Write your AI Knowledge ..." inValid={false} name="ai" onBlur={() => {}} onChange={(event) => {
              setValue(event.target.value)
            }} value={value} theme="Carbon" textAreaHeight='100px'></TextArea>
            {/* <MDEditor
              value={value}
              data-color-mode="light"
              onChange={setValue}
            /> */}
          </div>
          <div className="px-6 mt-6">
            <Select label="Voice Gender" valueElement={<div>{gender}</div>} placeholder="Select tag..." theme="Carbon">
              <div  className="cursor-pointer h-10 flex items-center justify-start px-4" onClick={() => {
                setGender('male')
              }}>male</div>
              <hr />
              <div   className="cursor-pointer h-10 flex items-center justify-start px-4"  onClick={() => {
                setGender('female')
              }}>female</div>
            </Select>          
          </div>
          <div className="flex justify-between items-center mt-10 px-6 ">
                <div className="flex gap-2 items-center">
                  Additional Settings
                  <div className="bg-primary-color text-white py-1 px-4 text-sm rounded-full">Pro</div>
                </div>
                <div className={`w-16 h-7 cursor-not-allowed rounded-[100px] btnInnerShadowsDark flex items-center  justify-start`}  >
                    <div className={`w-6 h-6 boxShadow-Gray rounded-full border border-white bg-white`}>
                        <div className="w-6 h-6 flex items-center justify-center">
                            <span className={'text-primary-color'}>|</span>
                        </div>
                    </div>
                </div>
          </div>          
          <div className="px-6 mt-10">
            <Button onClick={() => {
              Auth.updateAiSetting({
                name:formik.values.title,
                ai_knowledge:value,
                gender:gender
              })
              setTimeout(() => {
                navigate('/')
              }, 600);
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
