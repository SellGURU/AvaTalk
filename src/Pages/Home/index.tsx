import { useState } from "react"
import { MenuType } from "../../Types"
import {Splash ,Footer} from "../../Components"
import { Outlet, useNavigate} from "react-router-dom"
import { resolveMenuFromRoute, resolveNavigation } from "../../help"


const Home = () => {
    const navigate = useNavigate();  
    const [menu,setMenu] = useState<MenuType>(resolveMenuFromRoute() as MenuType)
    const [showSplash,setshowSplash] = useState(true);
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
                <Footer activeItem={menu} onItemChange={(element) => {
                    setMenu(element)
                    resolveNavigation(element,navigate)
                }} theme="Carbon"/>
            </>
            }
        </>
    )
}

export default Home