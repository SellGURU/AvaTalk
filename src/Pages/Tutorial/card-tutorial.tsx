/* eslint-disable @typescript-eslint/no-explicit-any */
import {useEffect, useState,useRef} from "react";
import {TutorialApi} from "../../Api";
import {Rating} from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css';
import { useAuth } from "../../hooks/useAuth";

interface  Props{
    link:string,
    total_views:string
    videoId:string
    rate:number
    description:string
    title:string
    cover:string
}
export const CartTu = ({link,total_views,videoId,rate,title,cover,description}:Props) => {
    const [rating, setRating] = useState(rate);
    const videoRef = useRef(null);
    const [videoRate,setVideoRate]=useState<any>()
    const [isLoading,setIsLoading]=useState<boolean>(true);
    const handleFullscreenChange = () => {
        const videoElement:any = videoRef.current;
        if (document.fullscreenElement === null && videoElement) {
            // Exit fullscreen: stop the video and hide it
            videoElement.pause();
            videoElement.currentTime = 0; // Reset the video to the start
            videoElement.load(); // Reload the video to show the cover image
        }
    };      
    const useauth = useAuth()
    const svgImage= (<svg aria-hidden="true" className="rr--svg" xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 27 25.81"
                    preserveAspectRatio="xMidYMid meet" stroke-width="2">
        <g shape-rendering="geometricPrecision">
            <polygon
                points="25 9.02 16.4 7.75 12.46 0 8.59 7.79 0 9.14 6.21 15.23 4.85 23.81 12.55 19.79 20.3 23.74 18.85 15.17 25 9.02"></polygon>
        </g>
    </svg>)
    const customStyles = {
        itemShapes:svgImage,
        activeFillColor: '#5B21B6',
        inactiveFillColor: '#fff',
    };
    const getData = async () => {
        setIsLoading(true)
        const videosRes = await TutorialApi.checkRating(videoId);
        setVideoRate(videosRes.data.rated)
        console.log(typeof videosRes.data.rated)
        setIsLoading(false);
    }
    useEffect(()=>{
        getData();
    },[])
    useEffect(()=>{
        const sendRate=async ()=>{
            console.log(typeof  videoRate.rated)
            if(rate!==rating){
                await TutorialApi.sendRate(videoId,`${rating}`);
            }
        }
        sendRate();
    },[rating])
    useEffect(() => {
        const handleFullscreen = () => {
        const videoElement:any = videoRef.current;
        if (videoElement) {
            TutorialApi.view(videoId,useauth.currentUser.information?.userId as string);
            // Trigger fullscreen mode
            if (videoElement.requestFullscreen) {
            videoElement.requestFullscreen();
            } else if (videoElement.mozRequestFullScreen) { // For Firefox
            videoElement.mozRequestFullScreen();
            } else if (videoElement.webkitRequestFullscreen) { // For Chrome, Safari, and Opera
            videoElement.webkitRequestFullscreen();
            } else if (videoElement.msRequestFullscreen) { // For IE/Edge
            videoElement.msRequestFullscreen();
            }

            // Optionally auto-play the video when fullscreen is entered
            videoElement.play();
        }
        };

        const videoElement:any = videoRef.current;

        // Automatically trigger fullscreen when the video starts playing
        if (videoElement) {
        videoElement.addEventListener('play', handleFullscreen);
        }

        // Clean up the event listener when the component unmounts
        return () => {
        if (videoElement) {
            videoElement.removeEventListener('play', handleFullscreen);
        }
        };
    }, []);    
    useEffect(() => {
        // Add event listener for fullscreen change
        document.addEventListener('fullscreenchange', handleFullscreenChange);

        // Clean up the event listener when the component unmounts
        return () => {
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);     
    const handleVideoEnded = () => {
        const videoElement:any = videoRef.current;
        if (videoElement) {
            videoElement.currentTime = 0; // Reset to beginning
        }
    };    
    return (
        <div className={"Carbon-ContentCard-Container text-right  space-y-5 w-full"} style={{width:'100%'}}>
            <div className={"space-y-5 w-full"}>
                <h1 className={"text-left text-[14px]  font-medium"}>{title}</h1>
                <video id={title} onEnded={() => handleVideoEnded()} ref={videoRef}   poster={cover} className={"rounded-xl w-full h-[180px]"}   controls>
                    <source src={link} type="video/mp4"/>
                </video>
                <p className={"text-xs font-normal text-left"}>{description}</p>
            </div>
            <div className={"flex items-center w-full justify-between"}>

                {!isLoading
&&
                <Rating
                    className={"!w-24"}
                    value={rating}
                    onChange={setRating}
                    readOnly={videoRate}
                    itemStyles={customStyles}
                />}
                <p className={"text-[12px] font-normal"}>{total_views} reviews</p>
                <p className={"text-[10px] font-normal"}>08/08/2024</p>

            </div>
        </div>

    )
}
