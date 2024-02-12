import React from "react"
import { useNavigate } from "react-router"
import { Button } from "symphony-ui"

interface BackIconProps {
    title:string
    theme?:string
    url?:string
}
const BackIcon:React.FC<BackIconProps> =({theme,title,url}) => {
    const navigate = useNavigate();
    return (
        <>
            <div className={`${theme}-back-Button-container-box`}>
                <Button onClick={() => {
                    if(url){
                        navigate(url)
                    }
                    navigate(-1)
                    }} theme={`${theme}-back`}>
                    <div className={`${theme}-back-Button-vector`}></div>
                </Button>
                <p className={`${theme}-Edit-title`}>{title}</p>
            </div>            
        </>
    )
}
export default BackIcon