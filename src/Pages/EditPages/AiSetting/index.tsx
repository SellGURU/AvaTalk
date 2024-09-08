/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "symphony-ui";
import { AccessNotifManager, BackIcon, Select, TextArea } from "../../../Components";
import { useFormik } from "formik";
// import MDEditor from "@uiw/react-md-editor";
import * as Yup from "yup";

import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Auth } from "../../../Api";
import { useConstructor } from "../../../help";
import { useNavigate } from "react-router-dom";
import { ReadyForMore } from "../../../Components/__Modal__";
import { useAuth } from "../../../hooks/useAuth";

const EditAiSetting = () => {
  // let currentBox = auth.currentUser.boxs.filter((item) => item.getTypeName() == "")[0] as AboutBox;
  // if (currentBox == undefined) {
  //   currentBox = new AboutBox("about", "");
  // }  
  const auth = useAuth()
  const navigate = useNavigate();
  const [gender,setGender] = useState('female')
  const initialValue = {
    title: 'Ai Setting',
    Greeting:'',
    Description:''
  };
  const formik = useFormik({
    initialValues: initialValue,
    validationSchema:Yup.object().shape({
      Description:Yup.string().required('You have entered 0/500').min(500)
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });  
  useConstructor(() => {
    Auth.showAiSetting((res) => {
      formik.setFieldValue("title",res.ai_setting.Name)
      formik.setFieldValue("Description",res.ai_setting["AI Knowledge"])
      setGender(res.gender != null ?res.gender :'female')
    })
  })
  const [analysedText,setAnaysedText] = useState("")
  const [showAiSuggestion,setShowAiSuggestion] = useState(false)
  const [isReadyTO,setIsReadyTo] = useState(false)
  useEffect(() => {
    if(showAiSuggestion){
      document.getElementById("aiSettingEdit")?.scrollTo(0, 0);
    }
  })
  return (
    <>
      <div id="aiSettingEdit" className="absolute w-full hiddenScrollBar overflow-y-scroll h-dvh top-[0px] bg-white z-[15]">
        {showAiSuggestion
        &&
        <div className=" top-0 left-0 w-full bg-white min-h-screen absolute z-40">
          <div className="flex  w-full items-center justify-between px-6 mt-[120px] ">
            <div className="invisible">
              <Button onClick={() => {setShowAiSuggestion(false)}} theme="Carbon-Google" data-mode="profile-review-button-2">
                <div className="Carbon-Profile-closeIcon Carbon-Footer-Vectors"></div>
            </Button>
            </div>
            <div className="text-[16px] font-semibold text-text-primary">AI Suggestion</div>
            <Button onClick={() => {setShowAiSuggestion(false)}} theme="Carbon-Google" data-mode="profile-review-button-2">
                <div className="Carbon-Profile-closeIcon Carbon-Footer-Vectors"></div>
            </Button>
          </div>
          <div className="hiddenScrollBar px-6 h-full">
            <div className="text-left my-8" style={{lineHeight:'28px'}}>
              {analysedText}

            </div>

            <Button onClick={() => {
              setShowAiSuggestion(false)
            }} theme="Carbon">Back to AI Setting</Button>
          </div>

        </div>
        }
        <div className="relative top-8" style={{visibility:showAiSuggestion?'hidden':'visible'}}>
          <BackIcon title="AI Setting" theme="Carbon"></BackIcon>
        </div>
        <div className="mt-[120px] hiddenScrollBar h-full"  style={{visibility:showAiSuggestion?'hidden':'visible'}}>

          <div className="px-6">
            <AccessNotifManager page="AiSetting"></AccessNotifManager>

          </div>
          <div className="px-6 mt-4">

            <div className="text-base text-left mb-4 text-text-primary">Here,&nbsp; you can train the AI to interact with your contacts by &nbsp; providing &nbsp; detailed &nbsp; and &nbsp; useful content in the AI knowledge field.<span className="text-[#06B6D4] ml-1 cursor-pointer">Learn more </span></div>

            {/* <div className="w-full mb-1 text-left">
              <label className={`Carbon-TextField-label `}>AI Knowledge</label>
            </div> */}
            <TextArea analysedText={analysedText} setAnalysedText={setAnaysedText} setShowSuggestion={setShowAiSuggestion} {...formik.getFieldProps("Description")} isAnalyse required label="AI Knowledge" errorMessage={formik.errors.Description} placeholder="Write your AI Knowledge ..." inValid={formik.errors?.Description != undefined && (formik.touched?.Description as boolean)} name="Description"  theme="Carbon" textAreaHeight='140px'></TextArea>
            {/* <MDEditor
              value={value}
              data-color-mode="light"
              onChange={setValue}
            /> */}
          </div>
          <div className="px-6 mt-6">
            <Select label="Voice Gender" required valueElement={<div>{gender}</div>} placeholder="Select tag..." theme="Carbon">
              <div  className="cursor-pointer h-10 flex items-center justify-start px-4" onClick={() => {
                setGender('male')
              }}>male</div>
              <hr />
              <div   className="cursor-pointer h-10 flex items-center justify-start px-4"  onClick={() => {
                setGender('female')
              }}>female</div>
            </Select>          
          </div>
          {/* <div className="flex justify-between items-center mt-10 px-6 ">
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
          </div>           */}
          <div className="px-6 mt-10">
            <Button disabled={!formik.isValid || formik.values.Description.length == 0} onClick={() => {
              if(auth.currentUser.type_of_account.getType() == 'Free' && auth.currentUser.editStatus){
                setIsReadyTo(true)
              }else{
                  Auth.updateAiSetting({
                    name:formik.values.title,
                    ai_knowledge:formik.values.Description,
                    gender:gender
                  })
                  auth.currentUser.setEditStatus(true)
                  setTimeout(() => {
                    navigate('/')
                  }, 600);
              }
            }} theme="Carbon">
              Save Change
            </Button>
          </div>
          
          <div className="px-6 mt-8">
            <div className="w-full flex ">
              <img src="./Carbon/message-question.svg" alt="" />
              <div className="text-sm font-medium ml-1 text-text-primary">Need Help?</div>
            </div>
            <div className="text-sm text-left mt-2 text-text-primary">Watch our <span className="text-[#06B6D4] cursor-pointer">tutorial video</span> for a step-by-step guide.</div>
          </div>
        </div>
        {isReadyTO &&
          <div className="fixed w-full left-0 bottom-0 flex justify-center">
            <ReadyForMore page="AiSetting" onClose={() => {
              setIsReadyTo(false)
            }} ></ReadyForMore>
          </div>
        }      
      </div>    
    </>
  )
};

export default EditAiSetting;
