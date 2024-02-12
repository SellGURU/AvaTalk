import { Button, TextField } from "symphony-ui";
import { BackIcon} from "../../../Components";
import { useEffect, useState } from "react";
import { LinkBox, Link } from "../../../Model";
import { useAuth } from "../../../hooks/useAuth"
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
    title:Yup.string().required(),
    url:Yup.string()
});

const EditLinks = () => {
  const auth = useAuth()
  const [autoSave,setAutoSave] = useState(0)
  let currentBox = auth.currentUser.boxs.filter((item) => item.getTypeName() == 'LinkBox')[0] as LinkBox
  if(currentBox == undefined) {
      currentBox = new LinkBox('links',[])
  }   
  const [links,setLinks] = useState<Array<Link>>(currentBox.getLinks().map(((item:Link) => Object.assign(new Link(''),item))))
  // const [selectItem,setSelectedItem] = useState<null|Social>(null)  
  const initialValue = {
        title:currentBox.getTitle(),
        url: ''
  }; 
  const formik = useFormik({
      initialValues: initialValue,
      validationSchema,
      onSubmit: (values) => {
      console.log(values);
      },
  });    
  useEffect(() => {
    if(formik.values.url.length > 0) {
      if(autoSave != formik.values.url.length){
        const newLink = new Link(formik.values.url)
        setLinks([...links,newLink])
        formik.setFieldValue('url','')
        setAutoSave(0)
      }
    }
  })

  const navigate = useNavigate();
  const submit = () => {
      auth.currentUser.addBox(
          new LinkBox(formik.values.title,links)
      )
      navigate('/')
  }
  const deleteSocial = (index:number) => {
    const newArr = [...links]
    newArr.splice(index,1)
    console.log(newArr)
    setLinks(newArr)
  }
  return (
    <>
      <div className="absolute w-full hiddenScrollBar h-dvh overflow-scroll top-[0px] bg-white z-[15]">
        <div className="relative top-4">
          <BackIcon title="Links" theme="Carbon"></BackIcon>
        </div>        
        <div className="mt-[120px] hiddenScrollBar h-full">
          <div className="mt-24 px-6">
            <TextField {...formik.getFieldProps("title")} inValid={formik.errors?.title != undefined && (formik.touched?.title as boolean)} theme="Carbon" label="Title" name="title"  type="text"  placeholder="Enter title..."></TextField>
          </div>
          {links.length == 0 ?
            <div className="mt-3 px-6">
              <TextField theme="Carbon" disabled label="links" inValid={false} name="title" onBlur={() => {}} onChange={() => {}} type="text" value="" placeholder="No Link"></TextField>
            </div>
          :
            <>
            {links.map((item:Link,index) => {
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
                        {/* <img className="h-4" src={"./icons/media/"+item.miniIconUrl()} alt="" /> */}
                        <a href="">
                          <div className="ml-2 text-sm text-gray-700">{item.geturl().substring(0,30)}</div>
                        </a>
                      </div>
                      <div className="flex justify-end gap-1 items-start">
                          <div onClick={() => {
                            formik.setFieldValue('url',item.geturl())
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
            <TextField onClick={() => {
              if(autoSave!= 0){
                setTimeout(() => {
                  setAutoSave(0)
                }, 500);
              }
            }} {...formik.getFieldProps("url")} theme="Carbon"  label="Add Link" inValid={false} name="url" onChange={(e) => {
              formik.setFieldValue('url',e.target.value)
              setAutoSave(e.target.value.length)
            }} type="text" placeholder="Click to add your link "></TextField>
          </div>
          <div className="px-6 mt-10">
            <Button onClick={submit} theme="Carbon">Save Change</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditLinks;
