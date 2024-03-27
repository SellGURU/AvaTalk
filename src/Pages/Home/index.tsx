/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { MenuType } from "../../Types"
import {Splash ,Footer} from "../../Components"
import { Outlet, useNavigate,useSearchParams } from "react-router-dom"
import { boxProvider, resolveMenuFromRoute, resolveNavigation, useConstructor } from "../../help"
import { subscribe } from "../../utils/event"
import { Auth } from "../../Api"
import { useAuth } from "../../hooks/useAuth"
import { Box } from "../../Model"


const Home = () => {
    const navigate = useNavigate();  
    const [parametr] = useSearchParams() 
    const [menu,setMenu] = useState<MenuType>(resolveMenuFromRoute() as MenuType)
    const [showSplash,setshowSplash] = useState(parametr.get('splash') == 'false'?false:true);
    const [showFooter,setShowFooter] = useState(parametr.get('review') == 'true'?false:true);
    const authContext = useAuth()
    useConstructor(() => {
        const resolveSocial: Array<Box> = [];
        Auth.showProfile((data) => {
            data.boxs.map((item:any) => {
                const newBox = boxProvider(item);
                resolveSocial.push(newBox);
            })
            authContext.currentUser.updateInformation({
                firstName:data.information.first_name,
                lastName:data.information.last_name,
                phone:data.information.mobile_number,
                personlEmail:data.information.email,
                company:data.information.company_name,
                job:data.information.job_title,
                banelImage:data.information.back_ground_pic,
                imageurl:data.information.profile_pic,
                location:{
                    lat:33,
                    lng:33
                },
                workEmail:data.information.work_email,
                workPhone:data.information.work_mobile_number,
                userId:data.information.created_userid
            })
            authContext.currentUser.setBox(resolveSocial)
        })
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