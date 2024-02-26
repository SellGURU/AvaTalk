import { useState } from "react";
import { Profile, Splash } from "../../Components"
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
            <Profile theme="Carbon"></Profile>
            }   
        </>
    )
}

export default Share