/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "symphony-ui";
import { AccessNotifManager, BackIcon, Select, TextArea } from "../../../Components";
import { useFormik } from "formik";
// import MDEditor from "@uiw/react-md-editor";
import * as Yup from "yup";

import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Auth } from "../../../Api";
import { getOS, useConstructor } from "../../../help";
import { useNavigate } from "react-router-dom";
import { ReadyForMore } from "../../../Components/__Modal__";
import { useAuth } from "../../../hooks/useAuth";
// import { learnMore } from "./learnMore";

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
  // const learnMoreText = learnMore
  useConstructor(() => {
    Auth.showAiSetting((res) => {
      formik.setFieldValue("title",res.ai_setting.Name)
      formik.setFieldValue("Description",res.ai_setting["AI Knowledge"])
      setGender(res.gender != null ?res.gender :'female')
    })
  })
  const [analysedText,setAnaysedText] = useState("")
  const [showAiSuggestion,setShowAiSuggestion] = useState(false)
  const [showLearnMore,setShowLearnMore] = useState(false)
  const [isReadyTO,setIsReadyTo] = useState(false)
  useEffect(() => {
    if(showAiSuggestion){
      document.getElementById("aiSettingEdit")?.scrollTo(0, 0);
    }
  })
const formatText = (text: string) => {
  // Split the text on newlines and process each line
  return text.split('\n').map((line, index) => {
    // Check for headers
    if (line.startsWith('### ')) {
      return <h3 key={index}>{line.slice(4)}</h3>;
    } else if (line.startsWith('## ')) {
      return <h2 key={index}>{line.slice(3)}</h2>;
    } else if (line.startsWith('# ')) {
      return <h1 key={index}>{line.slice(2)}</h1>;
    }

    // Process bold text within the lines using a better regex to handle multiple cases of **bold**
    const parts = line.split(/(\*\*.*?\*\*)/g); // Non-greedy match for bold (**bold**)

    return (
      <p className="text-[14px]" key={index}>
        {parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            // Remove the asterisks and render bold text
            return <strong className="text-[16px]" key={i}>{part.slice(2, -2)}</strong>;
          } else {
            return part; // Regular text
          }
        })}
      </p>
    );
  });
};
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
            <div className="text-justify my-8" style={{lineHeight:'28px'}}>
              {formatText(analysedText)}

            </div>

            <Button onClick={() => {
              setShowAiSuggestion(false)
            }} theme="Carbon">Back to AI Setting</Button>
          </div>

        </div>
        }
        {showLearnMore
        &&
        <div className=" top-0 left-0 w-full bg-white min-h-screen absolute z-40">
          <div className="flex  w-full items-center justify-between px-6 mt-[80px] ">
            {/* <div className="invisible">
              <Button onClick={() => {setShowLearnMore(false)}} theme="Carbon-Google" data-mode="profile-review-button-2">
                <div className="Carbon-Profile-closeIcon Carbon-Footer-Vectors"></div>
            </Button>
            </div> */}
            <div className="text-[16px] font-semibold text-text-primary">Learn more about your AI settings</div>
            <Button onClick={() => {setShowLearnMore(false)}} theme="Carbon-Google" data-mode="profile-review-button-2">
                <div className="Carbon-Profile-closeIcon Carbon-Footer-Vectors"></div>
            </Button>
          </div>
          <div className="hiddenScrollBar px-6 mb-20 h-full">
            <div className="text-left my-4" style={{lineHeight: '28px'}}>
              {/*{formatText(learnMoreText)}*/}
              <div className="text-justify text-[14px]" style={{}}>
                <p className={" text-[16px]"}>Avatalk's AI
                  Knowledge section is the hub for crafting a personalized and effective AI-driven persona. This feature
                  ensures your digital interactions reflect your unique professional expertise, style, and preferences,
                  enhancing your presence and effectiveness across virtual platforms.</p>
                <h1
                    className={"font-bold text-[16px]"}>Purpose of Customizing Your AI Knowledge</h1>

                <p
                    className={" text-[16px]"}>The core of Avatalk's appeal lies in its ability to let you tailor your AI's
                  knowledge base, which in turn shapes how your digital persona interacts in professional settings.
                  Whether it’s for virtual networking, engaging potential clients, or maintaining an active professional
                  online presence, the information you feed into your AI helps it deliver insightful, relevant
                  responses.
                  This customization aligns your AI's interactions with your personal and professional ambitions,
                  helping
                  you stand out in a competitive digital marketplace.</p>

                <h1 className={"font-bold text-[16px]"}>How to Use
                  This Section </h1>

                <p className={" text-[16px]"}>Navigate to the "AI Settings" in Avatalk to start
                  customizing:</p>

                <ul>
                  <li className={"list-disc text-[16px] ml-10 pl-3"}><span className={"font-bold"}>AI Knowledge Input:</span> Use the rich text editor to enter
                    details about your professional domain,
                    expertise, and other pertinent information you wish your AI to communicate. The more detailed and
                    specific your input, the more accurately and effectively your AI represents you.
                  </li>

                  <li className={"list-disc text-[16px] ml-10 pl-3"}><span className={"font-bold"}>Voice Gender Selection:</span> Choose your AI persona's voice
                    gender from a dropdown menu to match your
                    professional identity, reinforcing the consistency of your digital persona.
                  </li>

                  <li className={"list-disc text-[16px] ml-10 pl-3"}><span className={"font-bold"}>Analyze by AI:</span> This functionality analyzes your inputs
                    and suggests enhancements to increase
                    clarity and engagement, ensuring your AI persona communicates with sophistication and
                    professionalism.
                  </li>

                  <li className={"list-disc text-[16px] ml-10 pl-3"}><span className={"font-bold"}>Saving Changes:</span> After tweaking your AI's knowledge and
                    voice settings, click "Save Changes" to
                    implement them. Your AI will instantly use this updated information, ensuring your digital presence
                    remains polished and precise.
                  </li>

                </ul>

                <h1 className={"font-bold text-[16px]"}>Upgrading to the Pro Version</h1>


                <p className={" text-[16px]"}>While
                  the free version of Avatalk offers substantial benefits, upgrading to the Pro version unlocks
                  unlimited edits and continuous refinements of your AI persona. This allows for ongoing adjustments as
                  your professional needs evolve, giving you the flexibility to keep your digital persona as dynamic and
                  responsive as your career itself.</p>


                <h1 className={"font-bold  text-[16px]"}>Maximize Your AI Knowledge
                  for Effective Networking</h1>


                <p className={" text-[16px]"}>With Avatalk’s intuitive design, you can
                  readily update and refine your AI settings, ensuring your persona remains relevant and impactful in
                  all professional interactions. Leverage the full capabilities of Avatalk by upgrading to the Pro
                  version, where the possibilities for customizing and enhancing your AI-driven persona are limitless,
                  ensuring you're always ready to make meaningful professional connections.
                </p>
              </div>
            </div>

            <Button onClick={() => {
              setShowLearnMore(false)
            }} theme="Carbon">Got It</Button>
          </div>

        </div>
        }
        <div className="relative top-8" style={{visibility: showAiSuggestion ? 'hidden' : 'visible'}}>
          <BackIcon title="AI Setting" theme="Carbon"></BackIcon>
        </div>
        <div className="mt-[120px] mb-10 hiddenScrollBar h-full"
             style={{visibility: showAiSuggestion ? 'hidden' : 'visible'}}>

          <div className="px-6">
            <AccessNotifManager isLimited={auth.currentUser.editStatus} page="AiSetting"></AccessNotifManager>
          </div>
          <div className="px-6 mt-4">

            <div className="text-base  mb-4 text-justify text-text-primary">Here, you can train the AI to interact
              with your contacts by providing detailed and useful content in the AI
              knowledge field.<span className="text-[#06B6D4] ml-1 cursor-pointer" onClick={() => {
                setShowLearnMore(true)
              }}>Learn more </span></div>

            {/* <div className="w-full mb-1 text-left">
              <label className={`Carbon-TextField-label `}>AI Knowledge</label>
            </div> */}
            <TextArea analysedText={analysedText} setAnalysedText={setAnaysedText}
                      setShowSuggestion={setShowAiSuggestion} {...formik.getFieldProps("Description")} isAnalyse
                      required label="AI Knowledge" errorMessage={formik.errors.Description}
                      placeholder="Write your AI Knowledge ..."
                      inValid={formik.errors?.Description != undefined && (formik.touched?.Description as boolean)}
                      name="Description" theme="Carbon" textAreaHeight='140px'></TextArea>
            {/* <MDEditor
              value={value}
              data-color-mode="light"
              onChange={setValue}
            /> */}
          </div>
          <div className="px-6 mt-6">
            <Select label="Voice Gender" required valueElement={<div>{gender.charAt(0).toUpperCase()+gender.substring(1)}</div>} placeholder="Select tag..."
                    theme="Carbon">
              <div className="cursor-pointer h-10 flex items-center justify-start px-4" onClick={() => {
                setGender('male')
              }}>Male
              </div>
              <hr/>
              <div className="cursor-pointer h-10 flex items-center justify-start px-4" onClick={() => {
                setGender('female')
              }}>Female
              </div>
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
            <Button data-os={getOS} disabled={!formik.isValid || formik.values.Description.length == 0} onClick={() => {
              if(auth.currentUser.type_of_account.getType() == 'Free' && auth.currentUser.editStatus){
                setIsReadyTo(true)
              }else{
                  Auth.updateAiSetting({
                    name:formik.values.title,
                    ai_knowledge:formik.values.Description,
                    gender:gender
                  })
                  auth.currentUser.updateCustomInformation({
                    gender:gender
                  })
                  auth.currentUser.setEditStatus(true)
                  setTimeout(() => {
                    navigate('/')
                  }, 600);
              }
            }} theme="Carbon">
              Save Changes
            </Button>
          </div>
          
          <div className="px-6 mt-8">
            <div className="w-full flex ">
              <img src="./Carbon/message-question.svg" alt="" />
              <div className="text-sm font-medium ml-1 text-text-primary">Need Help?</div>
            </div>
            <div className="text-sm text-left mt-2 text-text-primary">Watch our <span onClick={() => {
              navigate('/settings/Help/tutorial')
            }} className="text-[#06B6D4] cursor-pointer">tutorial video</span> for a step-by-step guide.</div>
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
