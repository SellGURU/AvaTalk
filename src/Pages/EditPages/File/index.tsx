/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, TextField } from "symphony-ui";
import { AccessNotifManager, BackIcon } from "../../../Components";
// import ImageUploadr from "../../../Components/UploadImage";
import { BeatLoader } from "react-spinners";
import { FileBox, File } from "../../../Model";
import { useAuth } from "../../../hooks/useAuth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { NetworkError, ReadyForMore } from "../../../Components/__Modal__";
import useWindowHeight from "../../../hooks/HightSvreen";
import UploadingFile from "../../../Components/uploadingFile";
import { Auth } from "../../../Api";

const validationSchema = Yup.object().shape({
  title: Yup.string(),
});

const EditFile = () => {
  const auth = useAuth();
  const height = useWindowHeight();
  const [limiteMdoe, setLimiteMode] = useState("defualt");
  const [isLoading,setIsLaoding] = useState(false)
  const navigate = useNavigate();
  let currentBox = auth.currentUser.boxs.filter(
    (item) => item.getTypeName() == "FileBox"
  )[0] as FileBox;
  if (currentBox == undefined) {
    currentBox = new FileBox("File", []);
  }
  const [files, setFiles] = useState<Array<File>>(
    currentBox
      .getContents()
      .map((item: File) => Object.assign(new File("", "", "", "0",''), item))
  );
  const initialValue = {
    title: currentBox.getTitle(),
    files: currentBox.getContents(),
  };
  const [isReadyTO, setIsReadyTo] = useState(false);
  const [isNetworkerror,setISNetworkError] = useState(false)
  const formik = useFormik({
    initialValues: initialValue,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const resolveContent = async () => {
      const filesids:any =currentBox.getContents();
      const base64Images = await Promise.all(
          filesids.map(async (fileId:any) => {
          const data = await Auth.getContentsFile(fileId,auth?.currentUser?.information?.userId);
          return {...data.data.content,id:fileId} ;
          })
      );
      formik.setFieldValue("files",base64Images)
  }   
  useEffect(() => {
    resolveContent()
  },[])  
  const submit = () => {
    if (auth.currentUser.type_of_account.getType() == "Free") {
      if ((formik.values.files.length > 1) || limiteMdoe == "fileSize") {
        setIsReadyTo(true);
      }else {
        // new GalleryBox(formik.values.title, formik.values.files.filter((el:any) =>el.id != undefined).map((el:any) => el.id).slice(0, 5),''),
        setIsLaoding(true)
        auth.currentUser.addBox(
          new FileBox(formik.values.title, formik.values.files.filter((el:any) =>el.id != undefined).map((el:any) => el.id),'')
          ,() => {
            setIsLaoding(false)
            navigate("/");      
          }
        );  
      }
    }else {
      setIsLaoding(true)
      auth.currentUser.addBox(
        new FileBox(formik.values.title, formik.values.files.filter((el:any) =>el.id != undefined).map((el:any) => el.id),''),
      () => {
          setIsLaoding(false)
          navigate("/");      
      }    
    );
    }      
  };
  useEffect(() => {
    if(formik.values.files.length == 1&& auth.currentUser.type_of_account.getType() == "Free"){
      setLimiteMode("length")
    }
  })
  useEffect(() => {
    if(formik.values.files.length == 0 && auth.currentUser.type_of_account.getType() == "Free"){
      setLimiteMode("default")
    } 
  },[formik.values.files])
  useEffect(() => {
    let numberofBiges = 0;
    files.map((el) => {
      if (Number(el.getSize()) > 10 * 1024 * 1024) {
        numberofBiges = numberofBiges + 1;
      }
    });
    if (numberofBiges > 0) {
      setLimiteMode("fileSize");
    } else {
      // setLimiteMode("defualt");
    }
  });
  const deleteFile = (_files:any) => {
    return new Promise((resolve) => {
      resolve("")
    })
    // return Auth.deleteContentfile(files.id)

  };   

  const checkFile = (files:any,uploadProgress:(progressEvent:any) =>void) => {
    console.log(files)
    const converted = {
        type_name:'FileBox',
        content:{
            ...files
        }
      }     
    return auth.currentUser.checkBox(
      converted,
      uploadProgress
    );
  };    
  return (
    <>
      <div className="absolute w-full hiddenScrollBar overflow-y-auto pb-[50px]  top-[0px] bg-white z-[15]" style={{height:height+'px'}}>
        <div className="relative top-8">
          <BackIcon title="File" theme="Carbon"></BackIcon>
        </div>
        <div className="mt-[120px] ">
          <div className="px-6 mt-24  mb-[24px]">
            <AccessNotifManager
              modeLimited={limiteMdoe}
              isLimited={isReadyTO}
              page="FileSetting"
            ></AccessNotifManager>
          </div>
          <div className=" px-6">
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
              <UploadingFile 
                checkPermisiens={(newFiles) => {
                  if 
                    (auth.currentUser.type_of_account.getType() == "Free" &&
                      formik.values.files.length + newFiles.length > 1)
                  
                  {
                    setLimiteMode("length");
                    setIsReadyTo(true);
                    return false
                  }     
                  else {
                    return true
                  }
                }}     
                onClick={(e) => {
                  if 
                    (auth.currentUser.type_of_account.getType() == "Free" &&
                      formik.values.files.length >= 1)
                  
                  {
                    setLimiteMode("length");
                    setIsReadyTo(true);

                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}                         
                deleteUploadFile={deleteFile}
                value={formik.values.files.map((item:any) => {
                  return {
                    url: item.original,
                    name: item.name ? item.name : "item",
                    id:item.id
                  };
                })} 
                uploades={(files: Array<any>) => {
                  const selectedFiles = Array.from(files);
                  const maxFileSize = 10 * 1024 * 1024; // 10 MB in bytes
                  // Filter files based on size (<= 10 MB)
                  const validFiles = selectedFiles.filter((file) => {
                    if (file.size > maxFileSize) {
                     // setIsReadyTo(true)
                     setLimiteMode("fileSize");
                    }
                    // if(auth.currentUser.type_of_account.getType()=='Free'){
                    //   return file.size <= maxFileSize
                   // }
                    return true;
                  });
                  if (validFiles.length >= 1) {
                    setLimiteMode("length");
                  }
                  const converted: Array<File> = validFiles.map((item) => {
                    const newFile: File = new File(
                      item.url,
                      item.name,
                      item.type,
                      item.size,
                      item.id,
                    );
                   return newFile;
                  });
                  setFiles(converted);
                  formik.setFieldValue("files", converted);                  
                }}                
                accept=".pdf, .doc, .docx, .xls, .xlsx, .pptx, .psd, .ai, .id" checkFile={checkFile}  label="Upload Files" theme="Carbon"></UploadingFile>            
            {/* <ImageUploadr
              accept=".pdf, .doc, .docx, .xls, .xlsx, .pptx, .psd, .ai, .id"
              value={files.map((item) => {
                return {
                  url: item.geturl(),
                  name: item.getName(),
                  type: item.getType(),
                  size: item.getSize(),
                };
              })}
              onNetwerkError={() => {
                  setISNetworkError(true)
              }}
              isChanged={isChanged}
              deleteUploadFile={removeFile}
              setIsChanged={setIsChanged}
              checkFile={checkFile}
              uploadServer
              limite={0}
              onClick={(e) => {
                if 
                  (auth.currentUser.type_of_account.getType() == "Free" &&
                    formik.values.files.length >= 1)
                 
                 {
                  setLimiteMode("length");
                  setIsReadyTo(true);

                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
              userMode={auth.currentUser.type_of_account.getType()}
              uploades={(files: Array<any>) => {
                console.log(files);
                const selectedFiles = Array.from(files);
                const maxFileSize = 10 * 1024 * 1024; // 10 MB in bytes
                // Filter files based on size (<= 10 MB)
                const validFiles = selectedFiles.filter((file) => {
                  if (file.size > maxFileSize) {
                    // setIsReadyTo(true)
                    setLimiteMode("fileSize");
                  }
                  // if(auth.currentUser.type_of_account.getType()=='Free'){
                  //   return file.size <= maxFileSize
                  // }
                  return true;
                });
                console.log(validFiles);
                if (validFiles.length >= 1) {
                  setLimiteMode("length");
                }
                const converted: Array<File> = validFiles.map((item) => {
                  console.log("item.type", item);
                  const newFile: File = new File(
                    item.url,
                    item.name,
                    item.type,
                    item.size
                  );
                  return newFile;
                });
                setFiles(converted);
                formik.setFieldValue("files", converted);
              }}
              mod="files"
              label="Upload Files"
            ></ImageUploadr> */}
          </div>
          <div className="px-6 mt-10">
            <Button onClick={submit} theme="Carbon">
                {isLoading ?
                  <BeatLoader color="white" size={10}></BeatLoader>
                :
                'Save Changes'
                }
            </Button>
          </div>
        </div>
        {isReadyTO && (
          <div className="fixed w-full left-0 bottom-0 flex justify-center">
            <ReadyForMore
              page="File"
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
export default EditFile;
