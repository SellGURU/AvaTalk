import { useEffect, useState } from "react";
import { Auth } from "../../Api";
import { File } from "../../Model";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface FileViewWrapperProps {
    contentsUp:Array<any>,
    options?:any,
    resolveAddRender:() => any
}
const FileViewWrapper:React.FC<FileViewWrapperProps> = ({contentsUp,options,resolveAddRender}) => {
    const theme = 'Carbon'
    const [contents,setContents] = useState<any>([])
    const authUser = JSON.parse(localStorage.getItem("authUser") as string)
    const resolveContent = async () => {
        const filesids:any =contentsUp;
        const base64Images = await Promise.all(
            filesids.map(async (fileId:any) => {
            const data = await Auth.getContentsFile(fileId,authUser.information.userId);
            return data.data.content ;
            })
        );
        setContents(base64Images)
    }    
    useEffect(() => {
        resolveContent()
    },[contentsUp])    
    return (
        <>
            <div className={`${theme}-Profile-Vectors justify-start relative`}>
                {contents.length > 0 ?
                    <>
                        <div className={`${theme}-Profile-Vectors`}>
                            {contents.sort((a:any,b:any) => a.order -b.order).map((item:any) => {
                                const newSocal = Object.assign(new File('file','','','',''),item)
                                return (
                                    <>
                                        {newSocal.resolveRender(theme,options.userId)}
                                    </>
                                )
                            })}
                        </div>                         
                    </>              
                :
                    resolveAddRender()
                }
            </div>    
        </>
    )
}

export default FileViewWrapper