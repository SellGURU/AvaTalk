/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { MenuType } from "../../Types"
import {Splash ,Footer} from "../../Components"
import { Outlet, useNavigate,useSearchParams } from "react-router-dom"
import { resolveMenuFromRoute, resolveNavigation, useConstructor } from "../../help"
import { Auth } from "../../Api"
import { useAuth } from "../../hooks/useAuth"


const Home = () => {
    const navigate = useNavigate();  
    const authContext = useAuth()
    const [parametr] = useSearchParams() 
    const [menu,setMenu] = useState<MenuType>(resolveMenuFromRoute() as MenuType)
    const [showSplash,setshowSplash] = useState(parametr.get('splash') == 'false'?false:true);
    useConstructor(() => {
        Auth.getBoxs((res) => {
            authContext.currentUser.setBox(res)
        })

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