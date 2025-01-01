/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, TextField } from "symphony-ui";
import { AccessNotifManager, BackIcon } from "../../../Components";
import ImageUploadr from "../../../Components/UploadImage";
import { GalleryBox } from "../../../Model";
import { useAuth } from "../../../hooks/useAuth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { NetworkError, ReadyForMore } from "../../../Components/__Modal__";
import {  useEffect, useState } from "react";
import useWindowHeight from "../../../hooks/HightSvreen";
import { Auth } from "../../../Api";
import UploadingFile from "../../../Components/uploadingFile";

const validationSchema = Yup.object().shape({
  title: Yup.string(),
});

const EditGallery = () => {
  const auth = useAuth();
  const height = useWindowHeight();
  const navigate = useNavigate();
  const [isNetworkerror,setISNetworkError] = useState(false)
  let currentBox = auth.currentUser.boxs.filter(
    (item) => item.getTypeName() == "GalleryBox"
  )[0] as GalleryBox;
  if (currentBox == undefined) {
    currentBox = new GalleryBox("Gallery", []);
  }
  const [isReadyTO, setIsReadyTo] = useState(false);
  
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
  const [isChanged,setIsChanged] = useState(false)
  const submit = () => {
  // auth.currentUser.addBox(new GalleryBox(formik.values.title, formik.values.files.map((el:any) => el.id),'') )
    if (auth.currentUser.type_of_account.getType() == "Free") {
      if (formik.values.files.length > 5) {
        setIsReadyTo(true);
      }else {
        auth.currentUser.addBox(
          new GalleryBox(formik.values.title, formik.values.files.map((el:any) => el.id).slice(0, 5),''),
        );
        navigate("/");        
      }
    }else {
      auth.currentUser.addBox(
        new GalleryBox(formik.values.title, formik.values.files.map((el:any) => el.id),''),
      );
      navigate("/");      
    }  
  // if(isChanged){
    //     if (auth.currentUser.type_of_account.getType() == "Free") {
    //       if (formik.values.files.length > 5) {
    //         setIsReadyTo(true);
    //       } else {
    //         auth.currentUser.addSaveBox(
    //           new GalleryBox(formik.values.title, formik.values.files.slice(0, 5),'save'),
    //           new GalleryBox(formik.values.title, [],'save')
    //         );
    //         navigate("/");
    //       }
    //     } else {
    //       auth.currentUser.addSaveBox(
    //         new GalleryBox(formik.values.title, formik.values.files,'save'),
    //         new GalleryBox(formik.values.title, [],'save')
    //       );
    //       navigate("/");
    //     }

    // }else {
    //   auth.currentUser.addSaveBox(
    //     new GalleryBox(formik.values.title, formik.values.files,'save'),
    //     new GalleryBox(formik.values.title, formik.values.files,'')
    //   );      
    //   navigate("/");
    // }
  };
  const resolveContent = async () => {
      const filesids:any =currentBox.getContents();
      const base64Images = await Promise.all(
          filesids.map(async (fileId:any) => {
          const data = await Auth.getContentsFile(fileId);
          return {...data.data.content,id:fileId} ;
          })
      );
      formik.setFieldValue("files",base64Images)
  }   
  useEffect(() => {
    resolveContent()
  },[])
  const checkFile = (files:any,uploadProgress:(progressEvent:any) =>void) => {
    const converted = {
        type_name:'GalleryBox',
        content:{
          original: files.url,
          thumbnail: files.url,
          name: files.name,
          sizes: `(max-width: 710px) 120px,(max-width: 991px) 193px,278px`,
        }
      }     
    // if (auth.currentUser.type_of_account.getType() == "Free" && files.length > 5) {
    //   setIsReadyTo(true);
    //   auth.currentUser.checkBox(
    //     new GalleryBox(formik.values.title, converted,'upload'),
    //     uploadProgress
    //   );      
    //   return new Promise((_resolve,reject)=>{
    //     reject("")
    //   })
    // }

    return auth.currentUser.checkBox(
      converted,
      uploadProgress
    );
  };  
  const deleteFile = (files:any) => {
    return Auth.deleteContentfile(files.id)
  }; 
  // useEffect(() => {
  //   checkFile()
  // },[formik.values.files])
  return (
    <>
      <div className="absolute w-full  top-[0px] overflow-auto pb-[50px] hiddenScrollBar bg-white z-[15]" style={{height:height+'px'}} >
          <div className="relative top-8">
            <BackIcon title="Gallery" theme="Carbon"></BackIcon>
          </div>
          <div className="mt-[120px]  " >
            <div className="px-6 mt-24  mb-[24px]">
              <AccessNotifManager
                isLimited={auth.currentUser.type_of_account.getType()== "Free" && formik.values.files.length >= 5}
                page="GallerySetting"
              ></AccessNotifManager>
            </div>
            <div className="px-6 text-left">
              <TextField
                {...formik.getFieldProps("title")}
                errorMessage={formik.errors?.title}
                inValid={
                  formik.errors?.title != undefined &&
                  (formik.touched?.title as boolean)
                }
                theme="Carbon"
                label="Title"
                name="title"
                type="text"
                placeholder="Enter title..."
              ></TextField>
            </div>
            <div className="px-6 mt-3">
              {/* <ImageUploadr
                accept="image/png, image/jpeg"
                limite={5}
                setIsChanged={setIsChanged}
                isChanged={isChanged}
                onNetwerkError={() => {
                  setISNetworkError(true)
                }}
                onClick={(e) => {
                  if (auth.currentUser.type_of_account.getType() == "Free") {
                    if (formik.values.files.length >=5 ) {
                      setIsReadyTo(true);
                      e.preventDefault()
                      e.stopPropagation()
                    }
                  }
                }}
                checkFile={checkFile}
                uploadServer
                userMode={auth.currentUser.type_of_account.getType()}
                value={formik.values.files.map((item:any) => {
                  return {
                    url: item.original,
                    name: item.name ? item.name : "item",
                    id:item.id
                  };
                })}
                uploades={(files: Array<any>) => {
                  const converted = files.map((item) => {
                    return {
                      original: item.url,
                      thumbnail: item.url,
                      name: item.name,
                      id:item.id,
                      sizes: `(max-width: 710px) 120px,(max-width: 991px) 193px,278px`,
                    };
                  });
                  formik.setFieldValue("files", converted);
                }}
                deleteUploadFile={deleteFile}
                mod="files"
                label="Upload Images"
              ></ImageUploadr> */}
              <UploadingFile 
                deleteUploadFile={deleteFile}
                value={formik.values.files.map((item:any) => {
                  return {
                    url: item.original,
                    name: item.name ? item.name : "item",
                    id:item.id
                  };
                })} 
                uploades={(files: Array<any>) => {
                  const converted = files.map((item) => {
                    return {
                      original: item.url,
                      thumbnail: item.url,
                      name: item.name,
                      id:item.id,
                      sizes: `(max-width: 710px) 120px,(max-width: 991px) 193px,278px`,
                    };
                  });
                  console.log(converted)
                  formik.setFieldValue("files", converted);
                }}                
                accept="image/png, image/jpeg" checkFile={checkFile}  label="Upload Images" theme="Carbon"></UploadingFile>
            </div>
            <div className="px-6 mt-10">
              <Button onClick={submit} theme="Carbon">
                Save Changes
              </Button>
            </div>
          </div>
          {isReadyTO && (
            <div className="fixed w-full left-0 bottom-0 flex justify-center">
              <ReadyForMore
                page="Gallery"
                onClose={() => {
                  setIsReadyTo(false);
                }}
              ></ReadyForMore>
            </div>
          )}
          {isNetworkerror && (
            <div className="fixed w-full left-0 bottom-0 flex justify-center">
              <NetworkError
                onClose={() => {
                  setISNetworkError(false);
                }}
              ></NetworkError>
            </div>
          )}
        </div>
    </>
  );
};
export default EditGallery;
