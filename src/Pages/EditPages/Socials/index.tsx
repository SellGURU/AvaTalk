import { Button, TextField } from "symphony-ui";
import { BackIcon, Select } from "../../../Components";
import { useState } from "react";
import { AddSocials } from "../../../Components/__Modal__";
import { Social } from "../../../Model";
import { SocialBox, initialSocials } from "../../../Model/SocialBox";
import { useAuth } from "../../../hooks/useAuth"
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
    title:Yup.string().required(),
});

const EditSocials = () => {
  const auth = useAuth()
  const medias:Array<{name:initialSocials,icon:string}> = [
      {
          name:'Linkedin',
          icon:'devicon_linkdin.svg'
      },
      {
          name:'Instagram',
          icon:'devicon_instagram.svg'
      },
      {
          name:'Facebook',
          icon:'devicon_facebook.svg'
      },
      {
          name:'Twitter/ X',
          icon:'devicon_twitter.svg'
      },
      {
          name:'Youtube',
          icon:'devicon_youtube.svg'
      },                                
  ]
  let currentBox = auth.currentUser.boxs.filter((item) => item.getTypeName() == 'SocialBox')[0] as SocialBox
  if(currentBox == undefined) {
      currentBox = new SocialBox('social',[])
  }   
  const [socials,setSocials] = useState<Array<Social>>(currentBox.getSocialMedias().map(((item:Social) => Object.assign(new Social('Facebook',item.value),item))))
  const [selectItem,setSelectedItem] = useState<null|Social>(null)  
  const [openNewSocial,setOpenNewSocial] = useState(false)
  const initialValue = {
        title:currentBox.getTitle(),
  }; 
  const formik = useFormik({
      initialValues: initialValue,
      validationSchema,
      onSubmit: (values) => {
      console.log(values);
      },
  });    
  const navigate = useNavigate();
  const submit = () => {
      auth.currentUser.addBox(
          new SocialBox(formik.values.title,socials)
      )
      navigate('/')
  }
  const deleteSocial = (index:number) => {
    const newArr = [...socials]
    newArr.splice(index,1)
    console.log(newArr)
    setSocials(newArr)
  }
  return (
    <>
      <div className="absolute w-full hiddenScrollBar h-dvh overflow-scroll top-[0px] bg-white z-[15]">
        <div className="relative top-4">
          <BackIcon title="Socials" theme="Carbon"></BackIcon>
        </div>        
        <div className="mt-[120px] hiddenScrollBar h-full">
          <div className="mt-24 px-6">
            <TextField {...formik.getFieldProps("title")} inValid={formik.errors?.title != undefined && (formik.touched?.title as boolean)} theme="Carbon" label="Title" name="title"  type="text"  placeholder="Enter title..."></TextField>
          </div>
          {socials.length == 0 ?
            <div className="mt-3 px-6">
              <TextField theme="Carbon" disabled label="Social Medias" inValid={false} name="title" onBlur={() => {}} onChange={() => {}} type="text" value="" placeholder="No Social"></TextField>
            </div>
          :
            <>
            {socials.map((item:Social,index) => {
                return (
                  <div className="mt-3 px-6">
                    {index == 0 ?
                      <div className={`Carbon-Select-label mb-1 w-full text-left`} >
                        Social Medias
                      </div>         
                      :undefined            
                    }
                   <div className="Carbon-TextField-input ">
                    <div className="w-full flex items-center justify-between">
                      <div className="flex justify-start items-center">
                        <img className="h-4" src={"./icons/media/"+item.miniIconUrl()} alt="" />
                        <div className="ml-2 text-sm text-gray-700">{item.getType()}</div>
                      </div>
                      <div className="flex justify-end gap-1 items-start">
                          <div onClick={() => {
                            setSelectedItem(item)
                            setOpenNewSocial(true)
                          }} className={`Carbon-ContactDetails-editIcon`}></div>
                          <div onClick={() => {
                            deleteSocial(index)
                          }} className={`Carbon-ContactDetails-recycleIcon`}></div>                      
                      </div>
                    </div>
                   </div>
                  </div>                 
                )
            })}
            </>
          }
          <div className="px-6 mt-3">
            {/* <Select valueElement="" label="Add Social Media" placeholder="Please select social media..." theme="Carbon" /> */}
              <Select
                  valueElement={
                      <>
                      {selectItem != null ?
                        <div className={`cursor-pointer mt-[2px] flex justify-start items-center`}>
                            <img className="h-4" src={"./icons/media/"+selectItem.miniIconUrl()} alt="" />
                            <div className="ml-1 text-gray-700 text-sm">{selectItem.getType()}</div>
                        </div>
                      :
                        <div className="opacity-80 text-[13px] text-gray-700">
                          Please select social media...
                        </div>
                      }
                      </>
                  }
                  theme="Carbon"
              >
                  {medias.map((item,index) => {
                      return (
                          <div onClick={() => {
                              setSelectedItem(new Social(item.name,''))
                              setOpenNewSocial(true)
                              }} className={`h-[50px] px-5 border-b border-[white] cursor-pointer flex justify-start items-center ${index == medias.length -1 ? ' border-none':''}`}>
                              <img className="h-4" src={"./icons/media/"+item.icon} alt="" />
                              <div className="ml-1 text-gray-700 text-sm">{item.name}</div>
                          </div>
                      )
                  })}
                  
              </Select>
          </div>
          <div className="px-6 mt-10">
            <Button onClick={submit} theme="Carbon">Save Change</Button>
          </div>
          {/* {selectItem?.value} */}
          <AddSocials
            title={selectItem?.getType() as string}
            isOpen={openNewSocial}
            label={'URL or Username'}
            value={selectItem?.resolveUrl() as string}
            onComplete={() => {
              const newSocial= selectItem as Social
              if(socials.filter(item => item.getType() == newSocial.getType()).length == 0){
                setSocials([...socials,newSocial])
              }
              setSelectedItem(null)
            }}
            onClose={() => {
              setOpenNewSocial(false)
              setSelectedItem(null)
            }}
            theme={'Carbon'}
          ></AddSocials>
        </div>
      </div>
    </>
  );
};

export default EditSocials;
