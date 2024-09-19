import { Button, TextField } from "symphony-ui";
import { AccessNotifManager, BackIcon} from "../../../Components";
import { createRef, useEffect, useState } from "react";
import { LinkBox, Link } from "../../../Model";
import { useAuth } from "../../../hooks/useAuth"
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AddLink, Confirm, ReadyForMore } from "../../../Components/__Modal__";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import Sortable from 'sortablejs/modular/sortable.complete.esm.js';
const regex = /^.*Test.*$/

const validationSchema = Yup.object().shape({
    title:Yup.string().required(),
    url:Yup.string().matches((regex))
});

const EditLinks = () => {
  const auth = useAuth()
  let currentBox = auth.currentUser.boxs.filter((item) => item.getTypeName() == 'LinkBox')[0] as LinkBox
  if(currentBox == undefined) {
      currentBox = new LinkBox('links',[])
  }   
  const confirmRef = createRef<HTMLDivElement>()
  const [isReadyTO,setIsReadyTo] = useState(false)
  const [links,setLinks] = useState<Array<Link>>(currentBox.getLinks().map(((item:Link) => Object.assign(new Link('',''),item))))
  // const [selectItem,setSelectedItem] = useState<null|Social>(null)  
  const initialValue = {
        title:currentBox.getTitle(),
        url: '',
        name: ''
  }; 
  const formik = useFormik({
      initialValues: initialValue,
      validationSchema,
      onSubmit: (values) => {
      console.log(values);
      },
  });    
  const [editName,setEditName] = useState('')
  const [editeValue,setEditeValue] = useState('')

  const addLink = (name:string,url:string) => {
      const newLink = new Link(url,name)
      if(editName!= ''){
        setLinks([...links.filter((el) =>el.getName() != editName),newLink])
        setEditName('')
        setEditeValue('')
      }else{
        setLinks([...links,newLink]) 
      }
  }
  const [openaddlink,setOpenAddLink] = useState(false);
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
          <BackIcon title="Links" theme="Carbon"></BackIcon>
        </div>        
        <div className="mt-[120px] hiddenScrollBar h-full">
          <div className="px-6 mt-24  mb-[24px]">
            <AccessNotifManager page="LinkSetting"></AccessNotifManager>

          </div>              
          <div className=" px-6">
            <TextField {...formik.getFieldProps("title")} inValid={formik.errors?.title != undefined && (formik.touched?.title as boolean)} theme="Carbon" label="Title" name="title"  type="text"  placeholder="Enter title..."></TextField>
          </div>
          {links.length == 0 ?
            <div className="mt-3 px-6">
              <TextField theme="Carbon" disabled label="Links" inValid={false} name="title" onBlur={() => {}} onChange={() => {}} type="text" value="" placeholder="No Link"></TextField>
            </div>
          :
            <>
            <ul style={{width:'100%'}} >
               <div className={`Carbon-Select-label mt-4 pl-6 w-full text-left`}>Links</div>
              {links.map((item:Link,index) => {
                  return (
                    <li data-mame={item.getName()} draggable onDrag={() => {
                          const element = document.getElementById('sortable2')?.children
                          const resolve =links.map((_el,index) =>{
                            return element?.item(index)?.attributes[0].value
                          })
                          resolve.forEach((elem,ind) => {
                            if(links.find(e=>e.getName() == elem)){
                              links.filter(e=>e.getName() == elem)[0].order = ind
                            }
                          })
                        }}  className="mt-3 px-6">
                      {/* {index == 0 ?
                        <div className={`Carbon-Select-label mb-1 w-full text-left`} >
                        Links
                        </div>         
                        :undefined            
                      } */}
                    <div className="Carbon-TextField-input flex items-center text-left  h-[50px]">
                      <div className="w-full flex items-center justify-between">
                        <div className="flex justify-start ml-1 gap-1 items-center">
                           <img className="h-4" src={item.geturl()+"/favicon.ico"} alt="" />
                          <div className="">
                            <div className="text-[13px] mb-[-4px]">
                              {item.getName()}
                            </div>
                            <a href="">
                              <div className=" text-[10px] text-cyan-500">{item.geturl().substring(0,30)}</div>
                            </a>

                          </div>
                        </div>
                        <div className="flex justify-end gap-1 items-start">
                              {
                                links.length> 1 ?
                                  <div>
                                    <div className={`Carbon-ContentCard-ArrowVector Carbon-ContentCard-MaskVector ` } style={{height:'20px' ,width:'20px'}}></div>
                                  </div>
                                :
                                undefined
                              }                            
                            <div onClick={() => {
                              setEditName(item.getName())
                              setEditeValue(item.geturl())
                              setOpenAddLink(true)
                            }} className={`Carbon-ContactDetails-editIcon`}></div>
                            <div onClick={() => {
                              // setConfirmDelete(true)
                              confirmAlert({
                                  customUI: ({ onClose }) => {
                                          return (
                                              <Confirm refrence={confirmRef} onConfirm={() => deleteSocial(index)} content="Are you sure you want to delete this link?" title="Delete Link" onClose={onClose}></Confirm>
                                          );
                                  },
                                  overlayClassName:"dispalyOverLay"
                              })
                              // deleteSocial(index)
                            }} className={`Carbon-ContactDetails-recycleIcon`}></div>                      
                        </div>
                      </div>
                    </div>
                    </li>                 
                  )
              })}
            </ul>
            </>
          }
          <div className="px-6 mt-3">
            {/* <TextField onClick={() => {
              if(autoSave!= 0){
                setTimeout(() => {
                  setAutoSave(0)
                }, 500);
              }
            }} {...formik.getFieldProps("url")} theme="Carbon"  label="Add Link" inValid={false} name="url" onChange={(e) => {
              formik.setFieldValue('url',e.target.value)
              setAutoSave(e.target.value.length)
            }} type="text" placeholder="Click to add your link "></TextField> */}
            <Button onClick={() => {
                if(auth.currentUser.type_of_account.getType() == 'Free' && links.length == 2){
                  setIsReadyTo(true)
                }else {
                  setOpenAddLink(!openaddlink)
                }
              }} theme="Carbon-AddLink">Add Link</Button>
              <div className="relative"></div>
          </div>
          <div className="px-6 mt-10">
            <Button onClick={submit} theme="Carbon">Save Changes</Button>
          </div>
          <AddLink name={editName} value={editeValue} theme="Carbon" isOpen={openaddlink} onClose={() =>{
            setEditName('')
            setEditeValue('')
            setOpenAddLink(false)
          }} 
          onComplete={(name:string,url:string) => {
            formik.setFieldValue("url",url)
            formik.setFieldValue("name",name)
            addLink(name,url)
          }} title="Link" ></AddLink>
          {isReadyTO &&
            <div className="fixed w-full left-0 bottom-0 flex justify-center">
              <ReadyForMore page="link" onClose={() => {
                setIsReadyTo(false)
              }} ></ReadyForMore>
            </div>
          }

        </div>
      </div>
    </>
  );
};

export default EditLinks;
