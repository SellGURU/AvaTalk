/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { MenuType } from "../../Types"
import {Splash ,Footer} from "../../Components"
import { Outlet, useNavigate,useSearchParams } from "react-router-dom"
import { boxProvider, resolveMenuFromRoute, resolveNavigation, useConstructor } from "../../help"
import { publish, subscribe } from "../../utils/event"
import { Auth } from "../../Api"
import { useAuth } from "../../hooks/useAuth"
import { Box } from "../../Model"
import { BeatLoader } from "react-spinners"
import UserType from "../../Model/UserType"


const Home2 = () => {
    const navigate = useNavigate();  
    const [parametr] = useSearchParams() 
    const [menu,setMenu] = useState<MenuType>(resolveMenuFromRoute() as MenuType)
    const [showSplash,setshowSplash] = useState(parametr.get('splash') == 'false'?false:true);
    const [showFooter,setShowFooter] = useState(parametr.get('review') == 'true'?false:true);
    const authContext = useAuth()
    const [isLoading,setIsLoading] = useState(false)
    const resolveSocial: Array<Box> = [];
    const getProfile = () => {
        Auth.showProfile((data) => {
            console.log(data.boxs)
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
                userId:data.information.created_userid,
                silent_video_avatar:data.information.silent_video_url,
                talk_video_avater:data.information.talking_video_avatar,
                referral_code:data.information. referral_code,
                address:''
            })
            authContext.currentUser.setBox(resolveSocial)
            authContext.currentUser.setTypeOfAccount(new UserType(data.type_of_account.type.capitalize(),data.type_of_account.register_date))

        })        
    }
    useConstructor(() => {
        getProfile()
    })
    useEffect(() => {
        if(parametr.get("force") == 'true'){
            publish("ForceReload",{})
        }        
    })
    subscribe('profileIsReview',() => {
        setShowFooter(false)
    })
    subscribe('profileIsProfile',() => {
        setShowFooter(true)
    })    
    subscribe('refreshPage',() => {
        getProfile()
    })
    subscribe('isLoading-start',() => {
        setIsLoading(true)
    })
    subscribe('isLoading-stop',() => {
        setIsLoading(false)
    })    
    subscribe('ForceReload',() => {
        setIsLoading(false)
        window.location.reload()
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
                <div className="sticky h-0 bottom-0"></div>
                }
                {isLoading ?
                <>
                <div className="absolute z-50 w-full h-full left-0 top-0 flex justify-center items-center">
                    <BeatLoader size={8} color="#FFFFFF"></BeatLoader>
                </div>
                 <div className="fixed w-full z-[1200] h-full bg-black opacity-60 top-0 left-0"></div>
                </>
                :undefined}
            </>
            }
        </>
    )
}

export default Home2