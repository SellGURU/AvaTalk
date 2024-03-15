/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { MenuType } from "../../Types"
import {Splash ,Footer} from "../../Components"
import { Outlet, useNavigate,useSearchParams } from "react-router-dom"
import { resolveMenuFromRoute, resolveNavigation, useConstructor } from "../../help"
import { subscribe } from "../../utils/event"


const Home = () => {
    const navigate = useNavigate();  
    const [parametr] = useSearchParams() 
    const [menu,setMenu] = useState<MenuType>(resolveMenuFromRoute() as MenuType)
    const [showSplash,setshowSplash] = useState(parametr.get('splash') == 'false'?false:true);
    const [showFooter,setShowFooter] = useState(parametr.get('review') == 'true'?false:true);
    useConstructor(() => {
        // Auth.getBoxs((res) => {
        //     authContext.currentUser.setBox(res)
        // })

    })
    subscribe('profileIsReview',() => {
        setShowFooter(false)
    })
    subscribe('profileIsProfile',() => {
        setShowFooter(true)
    })    
    setTimeout(() => {
        setshowSplash(false)
    }, 3000);
    return (
        <>
            {showSplash ?
                <Splash theme="Carbon"></Splash>
            :
            <>
                <Outlet></Outlet>
                {showFooter ? 
                    <Footer activeItem={menu} onItemChange={(element) => {
                        setMenu(element)
                        resolveNavigation(element,navigate)
                    }} theme="Carbon"/>
                :
                <div className="h-16 sticky bottom-0"></div>
                }
            </>
            }
        </>
    )
}

export default Home