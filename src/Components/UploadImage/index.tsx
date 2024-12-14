/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { HtmlHTMLAttributes, useEffect, useRef, useState } from "react";


type ImageUploadrProps = HtmlHTMLAttributes<HTMLDivElement> & {
  theme?: string;
  value?:Array<any>
  uploades?: (files:Array<any>) => void
  mod?:'files' | 'profile',
  label?:string
  accept?:string
  limite?:number
  uploadServer?:boolean
  checkFile?:(files:any,uploadProgress:(value:any)=>void) => Promise<any>
  onClick?:(e:any) => void
  userMode?:'Free'|'Trial'|'Pro'
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ImageUploadr: React.FC<ImageUploadrProps> = ({ uploadServer,checkFile,children,onClick,label,limite ,userMode,theme,mod,uploades,value,accept, ...props }) => {
  const [isLoading,setisLoading] = useState(false);
  const [deletingLoding,setDeletingLoding] = useState(false);
  const [defeatedFiles,setDefeatedFiles] = useState<Array<any>>([]);
  const [files,setFiles] = useState<Array<any>>(value?value:[]);
  const [Uplodingfiles,setUploadingFiles] = useState<Array<any>>([]);
  const [deleteingFiles,setDeleteingFiles] = useState<Array<any>>([]);
  const [progress,setProgress] = useState(0)
  const fileInputRef = useRef<any>(null);
  // useEffect(() => {
  //   let interval:any;
  //   if (isLoading) {
  //     interval = setInterval(() => {
  //       setProgress((prev) => (prev < 100 ? prev + 1 : 100));
  //     }, 300);
  //   }
  //   return () => clearInterval(interval); // Cleanup interval when loading stops
  // }, [isLoading]);

  const getUploadFiles = (newfiles:any) => {

    if (newfiles) {
      const fileArray = Array.from(newfiles);
      const base64Promises = fileArray.map((file:any) => convertToBase64(file));

      // Wait for all files to be converted to Base64
      Promise.all(base64Promises)
        .then((base64Files:any) => {
          setFiles([...files,...base64Files])
          fileInputRef.current.value = "";   
          if(uploades){
            if(mod == 'files'){
              uploades([...files,...base64Files])
            }else{
              setFiles([...base64Files])              
              uploades([...base64Files])              
            }
          }
          setisLoading(false)             
          // setFilesBase64(base64Files);  // Store the Base64 strings in state
        })
        .catch(error => {
          console.error("Error converting files to base64", error);
        });
    }
  }
  const CheckUploadFiles = (newfiles:any) => {
    // console.log(newfiles)
    setProgress(0)
    const fileArray = Array.from(newfiles);
    const base64Promises = fileArray.map((file:any) => convertToBase64(file));
    Promise.all(base64Promises).then((base64Files:any) => {
      setUploadingFiles([...base64Files])
      checkFile?
        checkFile([...files,...base64Files],(progressEvent) =>{
           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
           setProgress(percentCompleted)
        }).then(() => {
          setFiles([...files,...base64Files])
          if(uploades){
            if(mod == 'files'){
              uploades([...files,...base64Files])
            }else{
              setFiles([...base64Files])              
              uploades([...base64Files])              
            }
          }
          setisLoading(false)         
            fileInputRef.current.value = "";    
        }).catch(() => {
          setDefeatedFiles([...base64Files])
        }).finally(() => {
          setisLoading(false)     
          fileInputRef.current.value = "";  
        })
      :undefined

    })
    // getUploadFiles([])
  }
  const convertToBase64 = (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        const base64 = reader.result as string;
        resolve({ name: file.name, url:base64,type:file.type ,size:file.size});
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };  
  const [resolveLimite,setResolveLimite] = useState(limite?limite:1)
  useEffect(() => {
    setFiles(value?value:[])
  },[value])
  useEffect(() => {
    setResolveLimite(limite?limite:1)
  },[limite])
  const deleteFile = (index:number) => {
    const newArr = [...files]
    const deleteing = newArr.splice(index,1)
    setProgress(0)
    setDeletingLoding(true)
    if(uploadServer) {
      setUploadingFiles([])
      setDeleteingFiles(deleteing)
      checkFile?
        checkFile([...newArr],(progressEvent) =>{
           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
           setProgress(percentCompleted)
        }).then(() => {
          setFiles([...newArr])
          if(uploades){
            if(mod == 'files'){
              uploades([...newArr])
            }else{
              setFiles([...newArr])              
              uploades([...newArr])              
            }
          }
          setDeletingLoding(false)              
        })
      :undefined
    } else {
      setFiles(newArr)
      if(uploades){
        uploades(newArr)
      }    

    }  
    
  }
  const deleteDefeatedFile = (index:number) => {
    const newArr = [...defeatedFiles]
    newArr.splice(index,1)
    setProgress(0)
    setDefeatedFiles(newArr)
  }  
  useEffect(() => {
    console.log(files)
  })
  return (
    <>
    <div className="w-full text-left">
      <label className={`${theme}-ImageUploader-label`}>
        {label}
      </label>      
      <div className={`${theme}-ImageUploader-container`} {...props}>
            <div className={`${theme}-ImageUploader-uploadBox-container`}>

              <div className={`${theme}-ImageUploader-uploadBox-box ${files.length >0 ? `${theme}-ImageUploader-uploadBox-fileExist`:undefined}`}>
                  <div style={{
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    width:'100%',
                    height:'100%',
                    opacity:isLoading?'50%':'100%'
                  }}>
                      <div style={{display:'grid'}}>
                        {files.length > 0 && mod == 'profile'?
                          <img className="w-[66px] justify-self-center my-2 h-[66px] rounded-full " src={files[0].url} alt="" />
                        :
                          <div className={`${theme}-ImageUploader-icon`}></div>
                        }                              
                          <div style={{
                            fontSize:'12px',
                            textAlign:'center',
                            color:'#0F0F0F',
                            fontWeight:'500'
                          }}>
                              <span style={{color:'#00B5FB',cursor:'pointer'}}>Choose File</span> 
                          </div>
                          <div className={`${theme}-ImageUploader-uploader-suportText-container`}>
                              <div className={`${theme}-ImageUploader-uploader-suportText`}>Supported formats: {accept}</div>
                          </div>
                      </div>
                  </div>
                  <input ref={fileInputRef} onClick={onClick} disabled={isLoading || deletingLoding}  onChange={(res:any) => {
                      setisLoading(true)
                      setProgress(0)
                      // console.log(res.target.files)
                      // Array(res.target.files.length).fill(1).forEach((_iet,index) => {
                      //   // console.log(res.target.files[index])
                      //   getBase64(res.target.files[index],res.target.value.split('\\')[2])  
                      // })
                      if(uploadServer){
                        CheckUploadFiles(res.target.files)
                      }else {
                        getUploadFiles(res.target.files)

                      }
                      // getBase64(res.target.files[0],res.target.value.split('\\')[2])    
                      // res.target.files.map(element => {
                      // });
                  }}  className={`${theme}-ImageUploader-uploader-input`} multiple type="file" id="upload-button"  accept={accept} />                        
              </div>

              {(files.length > 0||defeatedFiles.length>0 || (Uplodingfiles.length>0 && isLoading)) && mod=='files'? 
                <>
                  <div>
                    <div className={`${theme}-ImageUploader-itemList-titleBox`}>
                      {(Uplodingfiles.length>0 && isLoading)? <>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-1 justify-start items-center">
                           Uploading <span>{" "} 0/{Uplodingfiles.length}</span>

                        </div>
                        <div>{progress+'%'}</div>
                      </div>
                      </>
                      :
                      <>
                      {(deleteingFiles.length>0 && deletingLoding)? 
                      <>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-1 justify-start items-center">
                           Deleting <span> {" "}0/{deleteingFiles.length}</span>

                        </div>
                        <div>{progress+'%'}</div>
                      </div>                      
                      </>
                      :
                      <>
                       Uploaded
                      </>
                      }
                      </>
                      } 
                    </div>
                    <div className={`${theme}-ImageUploader-itemList-items`}>
                      {isLoading ?
                      <>
                        {
                          Uplodingfiles.map((item,index) => {
                            return (
                              <>
                                <div key={index} className={`${theme}-ImageUploader-uploadBox-file-loading relative`}>
                                  <div className={`${theme}-ImageUploader-itemList-title`}>{item.name.substring(0,30)}</div>
                                  <div className="absolute bottom-0 w-full left-0">
                                    <div className="w-full h-[6px] relative rounded-lg bg-white">
                                      <div className="absolute left-[1px] top-[1px] rounded-lg h-[4px] bg-primary-color " style={{width:progress+'%'}}></div>
                                    </div>

                                  </div>
                                  {/* <div onClick={() => deleteFile(index)} className={`${theme}-ImageUploader-uploadBox-trashIcon`}>
                                  </div> */}
                                  {/* <img className="w-4 h-4 cursor-pointer" onClick={() => deleteFile(index)} src="./Carbon/trash2.svg" alt="" /> */}
                                </div>                            
                              </>
                            )
                          })
                        }
                      </>
                      :
                      <>
                        {
                          deletingLoding ?
                          <>
                            {
                            deleteingFiles.map((item,index) => {
                              return (
                                <>
                                  <div key={index} className={`${theme}-ImageUploader-uploadBox-file-loading relative`}>
                                    <div className={`${theme}-ImageUploader-itemList-title`}>{item.name.substring(0,30)}</div>
                                    <div className="absolute bottom-0 w-full left-0">
                                      <div className="w-full h-[6px] relative rounded-lg bg-white">
                                        <div className="absolute left-[1px] top-[1px] rounded-lg h-[4px] bg-primary-color " style={{width:progress+'%'}}></div>
                                      </div>

                                    </div>
                                    {/* <div onClick={() => deleteFile(index)} className={`${theme}-ImageUploader-uploadBox-trashIcon`}>
                                    </div> */}
                                    {/* <img className="w-4 h-4 cursor-pointer" onClick={() => deleteFile(index)} src="./Carbon/trash2.svg" alt="" /> */}
                                  </div>                            
                                </>
                              )
                            })                              
                            }                          
                          </>
                          :
                          <>
                            {files.map((item,index) => {
                              return (
                                <>
                                  {(userMode == 'Free' && index >= resolveLimite) || (userMode == 'Free' && item.size >10 * 1024 * 1024) ?
                                    <div key={index} data-mode={"outSize"} className={`${theme}-ImageUploader-uploadBox-file`}>
                                      <div className={`${theme}-ImageUploader-itemList-title`}>{item.name.substring(0,15)}</div>
                                      {/* <div onClick={() => deleteFile(index)} className={`${theme}-ImageUploader-uploadBox-trashIcon`}>
                                      </div> */}
                                      <img className="w-4 h-4 cursor-pointer" onClick={() => deleteFile(index)} src="./Carbon/Add.svg" alt="" />
                                    </div>                            
                                  :
                                    <div key={index} className={`${theme}-ImageUploader-uploadBox-file`}>
                                      <div className={`${theme}-ImageUploader-itemList-title`}>{item.name.substring(0,30)}</div>
                                      {/* <div onClick={() => deleteFile(index)} className={`${theme}-ImageUploader-uploadBox-trashIcon`}>
                                      </div> */}
                                      <img className="w-4 h-4 cursor-pointer" onClick={() => deleteFile(index)} src="./Carbon/trash2.svg" alt="" />
                                    </div>
                                  }
                                </>
                              )
                            })}
                            {defeatedFiles.map((item,index) => {
                              return (
                                <>
                                  <div key={index} data-mode={"outSize"} className={`${theme}-ImageUploader-uploadBox-file`}>
                                    <div className={`${theme}-ImageUploader-itemList-title`}>{item.name.substring(0,15)}</div>
                                    {/* <div onClick={() => deleteFile(index)} className={`${theme}-ImageUploader-uploadBox-trashIcon`}>
                                    </div> */}
                                    <img className="w-4 h-4 cursor-pointer" onClick={() => deleteDefeatedFile(index)} src="./Carbon/Add.svg" alt="" />
                                  </div>                            
                                </>
                              )
                            })}
                          </>
                        }
                      </>
                      }
                    </div>
                  </div>
                </>
              : undefined}
            </div>      
      </div>

    </div>
    </>
  );
};

ImageUploadr.defaultProps = {
  theme: "Carbon",
  accept:"*"
};

export default ImageUploadr;
