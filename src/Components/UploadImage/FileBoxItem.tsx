/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { BeatLoader } from "react-spinners"

interface FileBoxItemProps {
    index:number
    item:any
    deleteFile:(index:number,complete:() =>void) =>void
}

const FileBoxItem:React.FC<FileBoxItemProps> =({index,item,deleteFile}) => {
    const [isDeleting,setIsdeleting] = useState(false)
    const theme = 'Carbon'
    return (
        <>
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
                            deleteFile(index,() => {
                            setIsdeleting(false)
                            })
                    } 
                } src="./Carbon/trash2.svg" alt="" />

                }
            </div>        
        </>
    )
}

export default FileBoxItem