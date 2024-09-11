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
        console.log("test1")
        const sendRate=async ()=>{
            console.log(typeof  videoRate.rated)
            if(rate!==rating){
                console.log("test")
                await TutorialApi.sendRate(videoId,`${rate}`);
            }
        }
        sendRate();
    },[rating])
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
                    readOnly={videoRate}
                    itemStyles={customStyles}
                />}
                <p className={"text-[12px] font-normal"}>{total_views} reviews</p>
                <p className={"text-[10px] font-normal"}>08/08/2024</p>

            </div>
        </div>

    )
}
