import React from "react"
import { useNavigate } from "react-router"
import { Button } from "symphony-ui"

interface BackIconProps {
    title:string
    theme?:string
    url?:string
    dataMode?:string
    icon?:'back'|'close'
    action?:() => void
}
const BackIcon:React.FC<BackIconProps> =({theme,title,icon,url,dataMode,action}) => {
    const navigate = useNavigate();
    return (
        <>
            <div className={`${theme}-back-Button-container-box`} data-mode={dataMode}>
                <Button onClick={() => {
                    if(action){
                        action()
                    }else
                    if(url){
                        navigate(url)
                    }else{
                        navigate(-1)
                    }
                    }} theme={`${theme}-back`}>
                    {icon == 'back' || !icon ? 
                    <div className={`${theme}-back-Button-vector`}></div>
                    :
                     <div className={`${theme}-Profile-closeIcon`}></div>
                    }
                </Button>
                <p className={`${theme}-Edit-title`}>{title}</p>
            </div>            
        </>
    )
}
export default BackIcon