/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, TextField } from "symphony-ui";
import { BackIcon } from "../../../Components";
import { createRef, useEffect, useRef, useState } from "react";
import { AddSocials, Confirm } from "../../../Components/__Modal__";
import { Social } from "../../../Model";
import { SocialBox, initialSocials } from "../../../Model/SocialBox";
import { useAuth } from "../../../hooks/useAuth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AnimateGroup } from 'react-animation'
import Sortable from 'sortablejs/modular/sortable.complete.esm.js';
import useModalAutoClose from "../../../hooks/useModalAutoClose";

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
});

const EditSocials = () => {
  const auth = useAuth();
  const confirmRef = createRef<HTMLDivElement>()
  const medias: Array<{ name: initialSocials; icon: string }> = [
    {
      name: "LinkedIn",
      icon: "devicon_linkdin.svg",
    },
    {
      name: "Instagram",
      icon: "devicon_instagram.svg",
    },
    {
      name: "Facebook",
      icon: "devicon_facebook.svg",
    },
    {
      name: "Twitter/ X",
      icon: "devicon_twitter.svg",
    },
    {
      name: "Youtube",
      icon: "devicon_youtube.svg",
    },
    {
      name:"Telegram",
      icon:'devicon_telegram.svg'
    }
  ];
  let currentBox = auth.currentUser.boxs.filter((item) => item.getTypeName() == "SocialBox")[0] as SocialBox;
  if (currentBox == undefined) {
    currentBox = new SocialBox("social", []);
  }
  const [socials, setSocials] = useState<Array<Social>>(currentBox.getSocialMedias().map((item: Social) => Object.assign(new Social("Facebook", item.value), item)));
  const [selectItem, setSelectedItem] = useState<null | Social>(null);
  const [openNewSocial, setOpenNewSocial] = useState(false);
  const [openaddNewSocial,setOpenAddNewSocial] = useState(false);
  const initialValue = {
    title: currentBox.getTitle(),
  };
  const formik = useFormik({
    initialValues: initialValue,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const navigate = useNavigate();
  const [showConfirm,setShowConfirm] = useState(-1)
  const submit = () => {
    auth.currentUser.addBox(new SocialBox(formik.values.title, socials));
    navigate("/");
  };
  const addSocialRef = useRef(null)
  const deleteSocial = (index: number) => {
    const newArr = [...socials];
    newArr.splice(index, 1);
    setSocials(newArr);
  };
  useModalAutoClose({
    refrence:addSocialRef,
    close:() => {
      setOpenAddNewSocial(false)
    }
  })
  useEffect(() => {
    setTimeout(() => {
        const el = document.getElementById('sortable2');
        Sortable.create(el,{
          animation: 150,
          filter: ".ignore-elements"
        });      
    }, 500);
  })
  return (
    <>
      <div className="absolute w-full hiddenScrollBar h-dvh overflow-scroll top-[0px] bg-white z-[15]">
        <div className="relative top-8">
          <BackIcon title="Social" theme="Carbon"></BackIcon>
        </div>
        <div className="mt-[120px] hiddenScrollBar h-full">
          <div className="mt-24 px-6">
            <TextField
              {...formik.getFieldProps("title")}
              inValid={formik.errors?.title != undefined && (formik.touched?.title as boolean)}
              theme="Carbon"
              label="Title"
              name="title"
              type="text"
              placeholder="Enter title..."
            ></TextField>
          </div>
          {socials.length == 0 ? (
            <div className="mt-3 px-6">
              <TextField theme="Carbon" disabled label="Social Media" inValid={false} name="title" onBlur={() => {}} onChange={() => {}} type="text" value="" placeholder="No Social"></TextField>
            </div>
          ) : (
            <>
                <AnimateGroup animation="popIn" durationOut="500">
                <div className={`Carbon-Select-label mt-4 pl-6 w-full text-left`}>Social Media</div>
                <ul style={{width:'100%'}} id="sortable2">
                  {socials.map((item: Social, index) => {
                    return (
                      <>
                        <li data-mame={item.getType()} draggable onDrag={() => {
                          const element = document.getElementById('sortable2')?.children
                          const resolve =socials.map((_el,index) =>{
                            return element?.item(index)?.attributes[0].value
                          })
                          resolve.forEach((elem,ind) => {
                            if(socials.find(e=>e.getType() == elem)){
                              socials.filter(e=>e.getType() == elem)[0].order = ind
                            }
                          })
                        }}  className={`mt-3 px-6 ${socials.length> 1?'':'ignore-elements'}`}>
                          <div className="Carbon-TextField-input ">
                            <div className="w-full flex items-center justify-between">
                              <div className="flex justify-start items-center">
                                <img className="h-4" src={"./icons/media/" + item.miniIconUrl()} alt="" />
                                <div className="ml-2 text-sm text-gray-700">{item.getType()}</div>
                              </div>
                              <div className="flex justify-end gap-3 items-start">     
                                {/* {
                                  socials.length> 1 ?
                                    <div>
                                      <div className={`Carbon-ContentCard-ArrowVector Carbon-ContentCard-MaskVector ` } style={{height:'20px' ,width:'20px'}}></div>
                                    </div>
                                  :
                                  undefined
                                }                       */}
                                <div
                                  onClick={() => {
                                    setSelectedItem(item);
                                    setOpenNewSocial(true);
                                  }}
                                  className={`Carbon-ContactDetails-editIcon`}
                                ></div>
                                <div
                                  onClick={() => {
                                    setShowConfirm(index)
                                  }}
                                  className={`Carbon-ContactDetails-recycleIcon`}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </li>
                        {showConfirm == index ?
                          <div className='fixed top-0 left-0 z-[5000] w-full h-dvh flex justify-center items-center'>
                            <Confirm refrence={confirmRef} title={"Delete Social"} content={"Are you sure want to delete this Social?"} onClose={() => {setShowConfirm(-1)}} onConfirm={() => {
                              deleteSocial(index);
                              setShowConfirm(-1)
                            }}></Confirm>
                          </div>
                        :
                        undefined
                        }                          
                      </>
                    );
                  })}

              </ul>
                </AnimateGroup>         
            </>
          )}
          {/* <div className="px-6 mt-3">
            <Select
              valueElement={
                <>
                  {selectItem != null ? (
                    <div className={`cursor-pointer mt-[2px] flex justify-start items-center`}>
                      <img className="h-4" src={"./icons/media/" + selectItem.miniIconUrl()} alt="" />
                      <div className="ml-1 text-gray-700 text-sm">{selectItem.getType()}</div>
                    </div>
                  ) : (
                    <div className="opacity-80 text-[13px] text-gray-700">Please select social media...</div>
                  )}
                </>
              }
              theme="Carbon"
            >
              {medias.map((item, index) => {
                return (
                  <div
                    onClick={() => {
                      setSelectedItem(new Social(item.name, ""));
                      setOpenNewSocial(true);
                    }}
                    className={`h-[50px] px-5 border-b border-[white] cursor-pointer flex justify-start items-center ${index == medias.length - 1 ? " border-none" : ""}`}
                  >
                    <img className="h-4" src={"./icons/media/" + item.icon} alt="" />
                    <div className="ml-1 text-gray-700 text-sm">{item.name}</div>
                  </div>
                );
              })}
            </Select>
          </div> */}
          <div className="mt-6  px-6">     
            <Button disabled={socials.length >= 6} data-mode={openaddNewSocial?'openModal':'false'} onClick={() => setOpenAddNewSocial(!openaddNewSocial)} theme="Carbon-AddLink">Add Social</Button>
              <div className="relative">
                {openaddNewSocial ?
                  <div ref={addSocialRef} className="bg-[#F3F4F6] w-full absolute boxShadow-Gray mt-1 rounded-b-[27px]">
                    {medias.filter(e => !socials.map(v =>v.getType()).includes(e.name)).map((item, index) => {
                      return (
                        <>
                          <div
                            onClick={() => {
                              setSelectedItem(new Social(item.name, ""));
                              setOpenNewSocial(true);
                              setOpenAddNewSocial(false)
                            }}
                            className={`h-[50px] px-5 border-b border-[white] cursor-pointer flex justify-start items-center ${index  == medias.filter(e => !socials.map(v =>v.getType()).includes(e.name)).length -1 ? " border-b-0" : ""}`}
                          >
                            <img className="h-4" src={"./icons/media/" + item.icon} alt="" />
                            <div className="ml-1 text-gray-700 text-sm">{item.name}</div>
                          </div>
                      
                        </>
                      );
                    })}           
                  </div>
                :undefined}
              </div>   
          </div>
          <div className="px-6 mt-10">
            <Button onClick={submit} theme="Carbon">
              Save Changes
            </Button>
          </div>
          {/* {selectItem?.value} */}
          <AddSocials
            title={selectItem?.getType() as string}
            isOpen={openNewSocial}
            label={"URL or Username"}
            value={selectItem?.resolveUrl() as string}
            onComplete={(url:string) => {
              const newSocial = selectItem as Social;
              newSocial.value = url
              if (socials.filter((item) => item.getType() == newSocial.getType()).length == 0 && url.length>0) {
                setSocials([...socials, newSocial]);
              }
              setSelectedItem(null);
            }}
            onClose={() => {
              setOpenNewSocial(false);
              setSelectedItem(null);
            }}
            theme={"Carbon"}
          ></AddSocials>
        </div>
      </div>
    </>
  );
};

export default EditSocials;
