import { useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"

/* eslint-disable @typescript-eslint/no-explicit-any */
interface UploadBoxProps {
    index:number
    item:any
    deleteFile:(file:any) => Promise<any>
    checkFile:(files:any,uploadProgress:(value:any)=>void) => Promise<any>
    onCompleted:(file:any) => void
    onFailed:(file:any) => void
    onDeleted:() => void
    isCompleted:boolean
    isFailedFile?:boolean
}

const UploadBox:React.FC<UploadBoxProps> = ({
    item,
    deleteFile,
    onFailed,
    onDeleted,
    isCompleted,
    checkFile,
    isFailedFile,
    onCompleted
}) => {
    const [isDeleting,setIsdeleting] = useState(false)
    const theme = 'Carbon'
    const [isLoading,setISLoading] = useState(!isCompleted)
    const [progress,setProgress] = useState(0)
    const [visible] = useState(true)
    const [isFailed,setISFailed] = useState(isFailedFile)
    useEffect(() => {
        if(!isCompleted && item.url){
                checkFile(item,(progressEvent) =>{
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                if(percentCompleted == 100){
                    setProgress(99)
                }
                if(percentCompleted >0 && percentCompleted<100){
                    setProgress(percentCompleted)
                }
                }).then((res) => {
                    // setVisible(false)
                    onCompleted({
                        ...item,
                        id:res.data.file_id
                    })
                // setFiles((pre) => {
                //   return [...pre,{...oneFile,id:res.file_id}]
                // })
                // setIsChanged? setIsChanged(true):undefined
                // if(uploades){
                //   if(mod == 'files'){
                //     uploades([...files,{...oneFile,id:res.data.file_id}])
                //   }else{
                //     setFiles([{...oneFile,id:res.data.file_id}])              
                //     uploades([{...oneFile,id:res.data.file_id}])              
                //   }
                // }
                // setisLoading(false)         
                // fileInputRef.current.value = "";    
                }).catch(() => {
                    setISFailed(true)
                    // setVisible(false)
                    // onDeleted()
                    onFailed({
                        ...item
                    })
                // onNetwerkError?onNetwerkError():undefined
                // setDefeatedFiles([...base64Files])
                }).finally(() => {
                    setISLoading(false)     
                
                // fileInputRef.current.value = "";  
                }) 
        }
        if(!item.url){
            setISLoading(false)
        }
    },[])
    return (
        <div key={new Date().getTime()}>
            {isLoading ?
                <div  className={`${theme}-ImageUploader-uploadBox-file-loading relative`}>
                    <div className="flex w-full justify-between items-center">
                        <div className={`${theme}-ImageUploader-itemList-title`}>
                            {item.name.substring(0,30)}
                           
                        </div>
                        <div className="text-[12px]">
                            {progress+'%'}    
                        </div>
                    </div>
                    <div className="absolute bottom-0 w-full left-0">
                    <div className="w-full h-[8px] relative rounded-lg bg-white">
                        <div className="absolute left-[1px] top-[1px] rounded-lg h-[6px] bg-primary-color " style={{width:progress+'%'}}></div>
                    </div>

                    </div>
                </div>               
            :
            <div  data-mode={isFailed&&"outSize"}  className={`${theme}-ImageUploader-uploadBox-file `} style={{display:visible?'flex':'none'}}>
                <div className={`${theme}-ImageUploader-itemList-title`}>{item.name.substring(0,30)}</div>
                {/* <div onClick={() => deleteFile(index)} className={`${theme}-ImageUploader-uploadBox-trashIcon`}>
                </div> */}
                {
                isDeleting ?
                <>
                    <BeatLoader size={4} color="#5B21B6"></BeatLoader>
                </>
                :
                    <img className="w-4 h-4 cursor-pointer" onClick={() =>{
                        setIsdeleting(true)    
                        deleteFile(item).finally(() => {
                            setIsdeleting(false)
                            onDeleted()
                        })
                    } 
                } src="./Carbon/trash2.svg" alt="" />

                }
            </div>           
            }
        </div>
    )
}

export default UploadBox