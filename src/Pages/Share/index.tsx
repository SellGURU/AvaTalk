import { useState } from "react";
import {  Profile2, Splash } from "../../Components"
import { useSearchParams } from "react-router-dom";

const Share:React.FC = () => {
    const [parametr] = useSearchParams() 
    const [showSplash,setshowSplash] = useState(parametr.get('splash') == 'false'?false:true);    
    setTimeout(() => {
        setshowSplash(false)
    }, 3000);    
    return (
        <>
            {showSplash ?
                <Splash theme="Carbon"></Splash>
            :        
            <Profile2 theme="Carbon"></Profile2>
            }   
        </>
    )
}

export default Share