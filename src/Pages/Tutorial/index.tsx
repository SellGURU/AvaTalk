import {BackIcon} from "../../Components";
import {CartTu} from "./card-tutorial.tsx";
import {TutorialApi} from "../../Api";
import {useEffect, useState} from "react";

export const Tutorial=()=>{
    const [videos,setVideos]=useState<[]>()
    const [isLoading,setIsLoading]=useState<boolean>(false);
    const getData=async ()=>{
        setIsLoading(true)
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
            <div className={" p-4 rounded-lg  px-16 mt-[96px] hiddenScrollBar h-dvh overflow-y-scroll pb-[300px] pt-[10px]"}>
                {
                    !isLoading?(
                        <>
                            {videos?.map((video:any)=>{
                                return <CartTu link={video.link} rate={parseInt(video.mean_rate)} total_views={video.total_views} videoId={video.video_id}/>
                            })}
                        </>
                    ):""
                }

            </div>
        </div>
    )
}

