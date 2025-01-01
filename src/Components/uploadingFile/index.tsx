import { useRef, useState } from "react";
import UploadBox from "./UploadBox";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface UploadingFileProps {
    theme?: string;
    label?:string
    value:Array<any>
    accept?:string
    onClick?:() => void
}

const UploadingFile:React.FC<UploadingFileProps> = ({theme,onClick,value,accept,label,...props}) => {
    const [files,setFiles] = useState<Array<any>>(value);
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
            setUploading([...base64Files])
        })
    }
    return(
        <>
        <div className="w-full text-left">
            <label className={`${theme}-ImageUploader-label`}>
                {label}
            </label>           
            <div className={`${theme}-ImageUploader-container`} {...props}>
                <div className={`${theme}-ImageUploader-uploadBox-container`}>
                    <div className={`${theme}-ImageUploader-uploadBox-box  ${files.length >0 ? `${theme}-ImageUploader-uploadBox-fileExist`:undefined}`}>
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
                        <input ref={fileInputRef} onClick={onClick} disabled={isLoading }  onChange={(res:any) => {
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
                    <div className={`${theme}-ImageUploader-itemList-titleBox`}>
                    Uploaded    
                    </div>
                    <div className={`${theme}-ImageUploader-itemList-items`}>
                        {
                            uploadinFile.map((el,index) => {
                                return (
                                    <>
                                     <UploadBox item={el} index={index} deleteFile={() =>{}}></UploadBox>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>              
            </div>    
        </div>
        </>
    )
}

export default UploadingFile