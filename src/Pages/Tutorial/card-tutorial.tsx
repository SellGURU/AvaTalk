import {useEffect, useState} from "react";
import {TutorialApi} from "../../Api";
import {Rating} from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css';

interface  Props{
    link:string,
    total_views:string
    videoId:string
    rate:number
}
export const CartTu = ({link,total_views,videoId,rate}:Props) => {
    const [rating, setRating] = useState(rate);

    const [videoRate,setVideoRate]=useState<any>()
    const [isLoading,setIsLoading]=useState<boolean>(true);
    const getData=async ()=>{
        setIsLoading(true)
        const videosRes=await TutorialApi.checkRating(videoId);
        setVideoRate(videosRes.data.rated)
        console.log(videosRes.data.rated)
        setIsLoading(false);
    }
    useEffect(()=>{
        getData();
    },[])
    return (
        <div className={"Carbon-ContentCard-Container text-right  space-y-5 w-full"}>
            <div className={"space-y-5"}>
                <h1 className={"text-left text-[14px]  font-medium"}>Title of the Video</h1>
                <video className={"rounded-xl w-full h-[180px]"}   controls>
                    <source src={link} type="video/mp4"/>
                </video>
                <p className={"text-xs font-normal text-left"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do
                    eiusmod tempor incididunt ut labore et dolore .</p>
            </div>
            <div className={"flex items-center w-full justify-between"}>

                {!isLoading
&&
                <Rating
                    className={"!w-24"}
                    value={rating}
                    onChange={setRating}
                    readOnly={videoRate.rated}
                />}
                <p className={"text-[12px] font-normal"}>{total_views} reviews</p>
                <p className={"text-[10px] font-normal"}>08/08/2024</p>

            </div>
        </div>

    )
}
