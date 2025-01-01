import { useState } from "react"
import { BeatLoader } from "react-spinners"

/* eslint-disable @typescript-eslint/no-explicit-any */
interface UploadBoxProps {
    index:number
    item:any
    deleteFile:(index:number,complete:() =>void) =>void
}

const UploadBox:React.FC<UploadBoxProps> = ({
    index,
    item,
    deleteFile
}) => {
    const [isDeleting,setIsdeleting] = useState(false)
    const theme = 'Carbon'
    const [isLoading,setISLoading] = useState(true)
    return (
        <>
            {isLoading ?
                <div key={index} className={`${theme}-ImageUploader-uploadBox-file-loading relative`}>
                    <div className={`${theme}-ImageUploader-itemList-title`}>{item.name.substring(0,30)}</div>
                    <div className="absolute bottom-0 w-full left-0">
                    <div className="w-full h-[6px] relative rounded-lg bg-white">
                        <div className="absolute left-[1px] top-[1px] rounded-lg h-[4px] bg-primary-color " style={{width:20+'%'}}></div>
                    </div>

                    </div>
                </div>               
            :
            <div key={index} className={`${theme}-ImageUploader-uploadBox-file`}>
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
                            // deleteFile(index,() => {
                            // setIsdeleting(false)
                            // })
                    } 
                } src="./Carbon/trash2.svg" alt="" />

                }
            </div>           
            }
        </>
    )
}

export default UploadBox