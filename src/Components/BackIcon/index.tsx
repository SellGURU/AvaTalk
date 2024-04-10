import React from "react"
import { useNavigate } from "react-router"
import { Button } from "symphony-ui"

interface BackIconProps {
    title:string
    theme?:string
    url?:string
    dataMode?:string
    action?:() => void
}
const BackIcon:React.FC<BackIconProps> =({theme,title,url,dataMode,action}) => {
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
                    <div className={`${theme}-back-Button-vector`}></div>
                </Button>
                <p className={`${theme}-Edit-title`}>{title}</p>
            </div>            
        </>
    )
}
export default BackIcon