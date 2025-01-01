import { useEffect, useRef, useState } from "react";
import UploadBox from "./UploadBox";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface UploadingFileProps {
    theme?: string;
    label?:string
    value:Array<any>
    accept?:string
    onClick?:() => void
    uploades?: (files:Array<any>) => void
    checkFile:(files:any,uploadProgress:(value:any)=>void) => Promise<any>
    deleteUploadFile:(file:any) => Promise<any>
}

const UploadingFile:React.FC<UploadingFileProps> = ({theme,deleteUploadFile,uploades,checkFile,onClick,value,accept,label,...props}) => {
    const [uploadinFile,setUploading] = useState<Array<any>>([])
    const [isLoading,setisLoading] = useState(false);
    const fileInputRef = useRef<any>(null);
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
    const startUplod = (newfiles:any) => {
        const fileArray = Array.from(newfiles);
        const base64Promises = fileArray.map((file:any) => convertToBase64(file));
        Promise.all(base64Promises).then((base64Files:any) => {
            setUploading((pre) => {
                return  [...value,...base64Files]
            })
        })
    }
    useEffect(() => {
        setUploading(value)
    },[value])
    return(
        <>
        <div className="w-full text-left">
            <label className={`${theme}-ImageUploader-label`}>
                {label}
            </label>           
            <div className={`${theme}-ImageUploader-container`} {...props}>
                <div className={`${theme}-ImageUploader-uploadBox-container`}>
                    <div className={`${theme}-ImageUploader-uploadBox-box  ${value.length >0 ? `${theme}-ImageUploader-uploadBox-fileExist`:undefined}`}>
                        <div style={{
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center',
                            width:'100%',
                            height:'100%',
                            opacity:isLoading?'50%':'100%'
                        }}>
                            <div style={{display:'grid'}}>
                                <div className={`${theme}-ImageUploader-icon`}></div>                        
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
                        <input ref={fileInputRef} onClick={onClick}   onChange={(res:any) => {
                            setisLoading(true)
                            // setUploading(res.target.files)
                            startUplod(res.target.files)
                            // setProgress(0)
                            // CheckUploadFiles(res.target.files)

                            // getBase64(res.target.files[0],res.target.value.split('\\')[2])    
                            // res.target.files.map(element => {
                            // });
                        }}  className={`${theme}-ImageUploader-uploader-input`} multiple type="file" id="upload-button"  accept={accept} />                        
                    </div>                    
                </div>
                <div>
                    {
                        (value.length >0 || uploadinFile.length >0)
                        &&
                        <div className={`${theme}-ImageUploader-itemList-titleBox`}>
                            Uploaded    
                        </div>

                    }
                    <div className={`${theme}-ImageUploader-itemList-items`}>
                        {
                            uploadinFile.map((el,index) => {
                                return (
                                    <>
                                     <UploadBox
                                        onDeleted={() => {
                                        if(uploades){
                                            setUploading((pre) => {
                                                const newArr = [...pre]
                                                newArr.splice(index,1)
                                                uploades( [...newArr])
                                                return newArr
                                            })
                                        }                                        
                                     }}                                      
                                      isCompleted={el.id} onCompleted={(uploded) => {
                                        fileInputRef.current.value = "";  
                                        setUploading((pre) => {
                                            const newData =[...pre]
                                            const element =  newData.map((val,inde) => {
                                                if(inde == index) {
                                                    return uploded
                                                }else {
                                                    return val
                                                }
                                            })
                                            if(uploades){
                                                uploades([...element.filter((value) =>value.id!=null)])
                                            }
                                            return element
                                        })
                                        }} checkFile={checkFile}  item={el} index={index} deleteFile={deleteUploadFile}></UploadBox>
                                    </>
                                )
                            })
                        }
                        {/* {
                            value.map((el,index) => {
                                return (
                                    <>
                                     <UploadBox
                                     onDeleted={() => {
                                        if(uploades){
                                            const newArr = [...value]
                                            newArr.splice(index,1)
                                            console.log(newArr)
                                            uploades([...newArr])
                                        }
                                     }}
                                      onCompleted={() => {
                                        fileInputRef.current.value = "";  
                                     }} checkFile={checkFile} item={el} isCompleted index={index} deleteFile={deleteUploadFile}></UploadBox>
                                    </>
                                )
                            })
                        } */}
                    </div>
                </div>              
            </div>    
        </div>
        </>
    )
}

export default UploadingFile