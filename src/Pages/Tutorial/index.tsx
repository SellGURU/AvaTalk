import {BackIcon} from "../../Components";
import {CartTu} from "./card-tutorial.tsx";
import {TutorialApi} from "../../Api";
import {useEffect, useState} from "react";


// date
// :
// null
// description
// :
// null
// link
// :
// "https://codieblob.blob.core.windows.net/avatalk/Videos/C%3A/Users/ASUS/Videos/528da576-d66b-4c9f-88c9-0471e7855862.mp4"
// mean_rate
// :
// 4
// title
// :
// null
// total_views
// :
// 1
// video_id
// :
// "100object"
export const Tutorial=()=>{
    const [videos,setVideos]=useState<[]>()
    const [isLoading,setIsLoading]=useState<boolean>(false);
    const getData=async ()=>{
        setVideos(true)
        const videosRes=await TutorialApi.tutorialVideos()
        setVideos(videosRes.data)
        console.log(videosRes.data)
        setIsLoading(false);
    }
    useEffect(()=>{
        getData();
    },[])
    return(
        <div className={"w-full bg-[#FDFDFE] hiddenScrollBar h-dvh top-[0px]  z-[15]"}>
            <div className=" top-4">
                <BackIcon title="Tutorial Videos" theme="Carbon"></BackIcon>

            </div>
            <div className={"max-w-sm mx-auto p-4 rounded-lg  px-6 mt-[96px] hiddenScrollBar h-dvh overflow-y-scroll pb-[300px] pt-[10px]"}>
                {
                    !isLoading?(
                        <>
                            <CartTu/>
                            <CartTu/>
                            <CartTu/>
                            <CartTu/>
                            <CartTu/>
                        </>
                    ):""
                }

            </div>
        </div>
    )
}

