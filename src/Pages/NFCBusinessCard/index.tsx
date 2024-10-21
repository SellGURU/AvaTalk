/* eslint-disable @typescript-eslint/no-explicit-any */
import {BackIcon} from "../../Components";
import {useEffect, useState} from "react";
import ImageGallery from "react-image-gallery";
import {Button} from "symphony-ui";
import Modal from "react-modal";
import {Accordion} from "../../Components/accardion";
import NFC from '../../Api/Data/NFC.json';
import { useParams } from "react-router-dom";
import { BusinessCard } from "../../Types";
import { Rating } from "@smastrom/react-rating";
import { Service } from "../../Api";
import { useAuth } from "../../hooks/useAuth";

const resolveColorNameFromColor =(color:string) => {
    if(color == '#5B21B6'){
        return 'purple'
    }
    if(color == '#000000'){
        return 'black'
    }
    if(color == '#DBBB6A'){
        return 'gold'
    }
    if(color == 'sevenColor'){
        return 'rainbow'
    }
    return 'black'
}

const ResolvekeyFeature =(id:string) => {
    return () => {
        if(id == '1'){
            return (
                <>
                    <p className="mb-2 text-[#6B7280] font-normal text-[12px]">
                            AI-Driven Interactions: The Avatalk NFC Business Card doesn’t merely store your contact information; it creates an AI persona that interacts intelligently on your behalf. This AI-driven assistant is programmed to understand and adapt to different networking contexts, ensuring your professional representation is always on point.
                            Seamless Contact Exchange: Utilizing NFC technology, this card allows for instant and effortless exchange of contact details. With just a simple tap, your professional profile is shared, making it easy for others to connect with you.
                            Customizable AI Persona: Personalize your networking experience by customizing your AI avatar. This avatar reflects your professional image with precision, making sure that every interaction is consistent and aligned with your personal brand.
                            24/7 Availability: Your Avatalk persona is always ready to engage, even when you’re not. Whether you’re in a meeting, traveling, or simply offline, your digital presence remains active, ensuring continuous engagement with your network.
                            Advanced Analytics: Gain insights into how your networking efforts are paying off. The Avatalk NFC Business Card provides data on your interactions, helping you refine your approach and maximize your impact.
                    </p>
                </>
            )

        }
        if(id == '2'){
            return (
                <>
                    <p className="mb-2 text-[#6B7280] font-normal text-[12px]">
                        Instant Networking: With the Avatalk NFC Tag, you can share your professional profile instantly. A simple tap on any NFC-enabled device is all it takes to exchange your contact details, making networking as easy as possible.
                        AI-Powered Persona: Just like the Avatalk NFC Business Card, the NFC Tag also integrates an AI-driven persona. This digital assistant is capable of understanding and responding in various contexts, ensuring that your networking interactions are always relevant and engaging.
                        Portable and Durable: The Avatalk NFC Tag is designed for those on the go. Its compact size and robust build make it the perfect companion for any professional, whether you’re at an event, a meeting, or traveling.
                        Customizable Design: Personalize the NFC Tag to align with your professional image. You can customize the AI persona and even the appearance of the tag itself, ensuring it matches your style and branding.
                        Global Reach: The Avatalk NFC Tag breaks geographical barriers, allowing you to connect with professionals worldwide. Its multilingual support ensures that you can engage with anyone, anywhere, without language being a barrier.
                    </p>
                </>
            )

        }
        if(id == '3'){
            return (
                <>
                    <p className="mb-2 text-[#6B7280] font-normal text-[12px]">
                        Comprehensive Connectivity: This bundle offers unparalleled flexibility in how you connect with others. Whether you prefer the traditional feel of a business card or the compact convenience of a tag, you have both options at your disposal.
                        AI-Driven Engagement: Both the NFC Business Card and the NFC Tag come equipped with Avatalk’s signature AI persona. This digital assistant is designed to interact on your behalf, ensuring that all your networking interactions are as effective and engaging as possible.
                        Versatile Use Cases: The bundle is ideal for a variety of scenarios. Use the business card in formal settings like meetings and conferences, while the tag is perfect for more casual or spontaneous encounters. Together, they ensure you’re always prepared to make a professional connection.
                        Customizable and Personalized: Personalize your AI persona and the appearance of both the business card and the tag. This ensures that your digital presence is consistent across all platforms and interactions, reflecting your professional image accurately.
                        24/7 Networking: With both the NFC Business Card and the NFC Tag, your digital presence is always active. Whether you’re at a business event or simply on the go, your networking assistant is working around the clock, making connections and building relationships.
                        Advanced Analytics: The bundle also provides comprehensive analytics for both the business card and the tag. Track your interactions, analyze engagement trends, and refine your networking strategy based on data-driven insights.

                    </p>
                </>
            )

        }
        return (
                <>
                    <div>{id}</div>
                </>
            )
    }
}

const ResolveWhyChoice =(id:string) => {
    return () => {
        if(id == '1'){
            return (
                <>
                    <p className="mb-2 text-[#6B7280] font-normal text-[12px]">
Choosing the Avatalk NFC Business Card means embracing a new era of networking. It’s not just about exchanging contact details; it’s about creating memorable interactions that foster meaningful relationships. This business card is ideal for professionals who want to stand out, offering a blend of advanced technology and personalized engagement that traditional cards simply cannot match.
Whether you’re at a conference, a meeting, or a casual networking event, the Avatalk NFC Business Card ensures that every interaction is impactful. It’s your 24/7 networking assistant, always ready to connect and impress, leaving a lasting impression long after the first encounter.

                    </p>
                </>
            )

        }
        if(id == '2'){
            return (
                <>
                    <p className="mb-2 text-[#6B7280] font-normal text-[12px]">
The Avatalk NFC Tag is perfect for professionals who need a versatile and portable networking tool. It’s small enough to carry with you everywhere, yet powerful enough to handle all your networking needs. Whether you’re a freelancer, a business owner, or part of a larger organization, this tag helps you maintain a proactive and professional presence.
Priced at just £5, the Avatalk NFC Tag is an affordable yet powerful tool that ensures you never miss a networking opportunity. It’s your pocket-sized networking assistant, ready to make connections and leave lasting impressions at a moment’s notice.

                    </p>
                </>
            )

        }
        if(id == '3'){
            return (
                <>
                    <p className="mb-2 text-[#6B7280] font-normal text-[12px]">
The Avatalk NFC Tag and Business Card Bundle is the ultimate solution for professionals who demand flexibility and functionality in their networking tools. By combining the robust features of the business card with the convenience of the NFC tag, this bundle ensures that you’re always prepared to make a strong professional connection.
This bundle is perfect for those who want to cover all bases, offering the convenience of a tag for everyday use and the formal presence of a business card for high-profile meetings. It’s an investment in your professional future, providing you with the tools you need to network effectively and efficiently.

                    </p>
                </>
            )

        }
        return (
                <>
                    <div>{id}</div>
                </>
            )
    }
}

export const NFCBusinessCard = () => {
    const { id } = useParams();
    const auth = useAuth()
    const [currentCard,setCurrentCard] = useState<BusinessCard>()
    const [selectedColor, setSelectedColor] = useState([{
        color:NFC.filter((el) => el.id == id)[0].colors[0],
        count:1,id:'0',
        colorName:'purple'
    }]);

    const changeCardColor = (id:string,newColor:string) => {
        setSelectedColor((prevCards) =>
            prevCards.map((card:any) =>
                card.id === id
            ? {
                ...card,
                color: newColor, 
                colorName:resolveColorNameFromColor(newColor)
                }
            : card
        )
        );
    };    
    const [rating, setRating] = useState(4);
    const [videoRate]=useState<any>()
    useEffect(() => {
        setCurrentCard(NFC.filter((el) => el.id == id)[0])
        // setSelectedColor([{color:'',count:1,id:0}])
    },[id])
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
    const [isOpen, setIsOpen] = useState(false);
    const handleQuantityChange = (action:string, id:string) => {
        setSelectedColor(prevColors =>
            prevColors
                .map(colorItem => {
                    if (colorItem.id === id) {
                        if (action === 'increment') {
                            return { ...colorItem, count: colorItem.count + 1 };
                        } else if (action === 'decrement') {
                            return { ...colorItem, count: colorItem.count - 1 };
                        }
                    }
                    return colorItem;
                })
                .filter(colorItem => colorItem.count > 0) // Remove items where count is 0 or less
        );
    };
    const resolveBackGround = (color:string) => {
        if(color == 'sevenColor'){
            return 'radial-gradient(circle, #9873D2CC, #FFFAEE)'
        }
        return color
    }  
    const handelNewCard = () => {
        if(selectedColor.length < (currentCard?.colors.length as number)){
            setSelectedColor((prv) => [ ...prv,{color:NFC.filter((el) => el.id == id)[0].colors[0],count:1,id:(prv.length+1).toString(),colorName:resolveColorNameFromColor(NFC.filter((el) => el.id == id)[0].colors[0] as string)}])        
        }
    }  
   
    
    return (
        <div className=" w-full bg-[#FDFDFE] hiddenScrollBar h-dvh top-[0px]  z-[15]">
            <div className=" top-4">
                <BackIcon title={currentCard?.title || ''} theme="Carbon"></BackIcon>

            </div>
            <div
                className="md:max-w-full max-w-sm mx-auto p-4 rounded-lg  px-6 mt-[96px] hiddenScrollBar h-dvh overflow-y-scroll pb-[300px] pt-[10px]">
                <div className="flex flex-col justify-center items-center">
                    <div className="flex w-full px-6 xl:px-16 pb-16  ">
                        <ImageGallery
                            
                            disableThumbnailScroll={currentCard &&currentCard?.images.length<3 ?true:false}
                            showThumbnails={true} // Ensure thumbnails are visible
                            thumbnailPosition="right" // Thumbnail position on the right
                            showPlayButton={false} // Disable slideshow button
                            showFullscreenButton={false} // Disable fullscreen button
                            items={currentCard?.images || []}
                            renderLeftNav={(onClick, disabled) => {
                                return (
                                    <div className={`Carbon-back-Button-container-box-NfcCard !top-[100%] w-fit flex items-end justify-end`} style={{transform: 'translate(30%, -50%)', left: '20%'}} data-mode="gallery">
                                        <Button onClick={onClick} disabled={disabled} theme={`Carbon-back`}>
                                            <div className={`Carbon-back-Button-vector`}></div>
                                        </Button>
                                    </div>
                                );
                            }}
                            renderRightNav={(onClick, disabled) => {
                                return (
                                    <div className={`Carbon-back-Button-container-box-NfcCard !top-[100%] flex items-start justify-start  w-fit`} style={{transform: 'translate(-30%, -50%)', right: '20%'}} data-mode="gallery">
                                        <Button onClick={onClick} disabled={disabled} theme={`Carbon-back`} style={{rotate: '180deg'}}>
                                            <div className={`Carbon-back-Button-vector`}></div>
                                        </Button>
                                    </div>
                                );
                            }}
                        />

                    </div>
                    <div className={"bg-white shadow-md w-full p-5 rounded-xl"}>
                        <h2 className="text-lg  text-[#374151]">
                            {currentCard?.title}
                        </h2>
                        <div className="flex justify-start mt-2 items-center">
                            <Rating
                                className={"!w-24"}
                                value={rating}
                                onChange={setRating}
                                readOnly={videoRate}
                                itemStyles={customStyles}
                            />
                            <div className="w-full flex justify-start ml-2 items-center gap-4">
                                <p className={"text-[12px] font-normal"}> 4 | 262 reviews</p>
                                {/* <p className={"text-[10px] font-normal"}>08/08/2024</p>                             */}

                            </div>
                        </div>
                        {/* <p className={"text-[#5B21B6] font-semibold text-[16px]"}>
                            {oldPrice &&}
                            £{price}</p> */}
                        <div className="flex items-center mt-2">
                            <div className="flex text-[#9CA3AF] items-center font-normal gap-1 text-[16px]">Price:
                            <p
                                className={"text-primary-color text-lg font-semibold"}>
                                   {currentCard?.id === "3" && (
                                    <span className="text-[#94A3B8] text-lg mr-2 line-through">£12</span>
                                   )}
                                    £{currentCard?.price}</p></div>
                        </div>
                        <div className="text-[#374151] font-normal text-[12px]">
                            Tax included. Shipping calculated at checkout.
                        </div>
                        {selectedColor.map((item,index)=>{
                            return (
                                <div className="mt-4 flex justify-between items-center">
                                    <div className={"flex gap-3"}>
                                        {currentCard?.colors.map((color: string) => (
                                            <>
                                                {color != 'sevenColor'
                                                ?
                                                <div onClick={() => {
                                                    changeCardColor(item.id,color)
                                                }} className={`w-[26px] cursor-pointer h-[26px] rounded-md flex justify-center items-center `} style={{background:resolveBackGround(color)}}>
                                                    {item.color == color && <img className="w-[10px]" src="./Carbon/tick-white.svg" />}
                                                </div>
                                                :
                                                <div onClick={() => {
                                                    changeCardColor(item.id,color)
                                                }}  className="relative">
                                                    <img className="w-[26px] h-[26px]  rounded-md" src="./icons/bussinesCards/sevenColor.jpg" alt="" />
                                                    {item.color == color && <div className="top-0 z-20 absolute left-0 w-full flex justify-center items-center h-full"> <img className="w-[10px] " src="./Carbon/tick.svg" /></div>}
                                                </div>
                                                }
                                            </>
                                        ))}
                                    </div>


                                    <div className={"bg-[#EEEFF3] flex items-center justify-between px-2 w-[128px] h-[40px] rounded-2xl"}>
                                        <button  className={`bg-white text-[#5B21B6] text-[24px]  w-8 h-8 rounded-full flex items-center justify-center ${item.count <= 1 && 'invisible'}`}  onClick={()=>{
                                            if(item.count >1 || index > 0){
                                                handleQuantityChange("decrement",item.id)

                                            }
                                        }}>
                                            {index == 0  || item.count>1?
                                                <img className="w-4" src={"/Carbon/mines.svg"}/>
                                                : <img src={"/Carbon/trashVector.svg"}/>}
                                        </button>
                                        {item.count}
                                        <button  className={"bg-[#5B21B6] text-white w-8 h-8 rounded-full flex items-center justify-center"} onClick={()=>handleQuantityChange("increment",item.id)}>
                                            <img src={"/Carbon/normalAdd.svg"}/>
                                        </button>

                                    </div>
                                </div>
                            )
                        })}

                        <p  className={`text-[14px]  mt-5 font-medium text-[#5B21B6] ${selectedColor.length >= (currentCard?.colors.length as number)?'opacity-60 cursor-not-allowed':'cursor-pointer'}`}
                           onClick={() => handelNewCard()}>+ Add New Color</p>
                    </div>

                </div>
                <Modal
                    isOpen={isOpen}
                    onRequestClose={() => {
                        setIsOpen(false)}
                }
                    style={{ content: { borderRadius: "24px", width: "100%", maxWidth: "360px", background: "rgba(243, 244, 246, 1)" }, overlay: { backgroundColor: "rgba(0,0,0,0.7)" } }}
                    contentLabel=" Modal"
                >
                    <div className={" relative pb-5 pt-6"}>
                       <div className={"absolute right-0 top-0"}>
                           <Button onClick={() => {
                               setIsOpen(false)
                           }} data-mode="profile-review-button-2" theme="Carbon-Google">
                               <div className="Carbon-Profile-closeIcon Carbon-Footer-Vectors m-0 "></div>
                           </Button>
                       </div>
                    <div className={"flex flex-col items-center justify-center"}>

                        <img src={"/Carbon/tick-circle.svg"}/>
                        <h1 className={"text-lg font-semibold text-[#374151]"}>Your purchase</h1>
                        <p className={"text-lg font-semibold text-[#374151]"}>has been successfully completed</p>
                    </div>
                    </div>
                </Modal>
                <Button onClick={()=>{
                    Service.Pyload(auth.currentUser.information?.userId as string,selectedColor.map(el => {
                        return {
                            amount:currentCard?.price +"00" as string,
                            color:el.colorName,
                            description:currentCard?.description as string,
                            product_id:currentCard?.product_id as string,
                            product_name:currentCard?.title as string,
                            product_url:currentCard?.urls.filter((e) => e.color == el.colorName)[0].url,
                            quantity: el.count
                        }
                    })).then((res) => {
                        window.open(res.data.paylink)
                    })                    
                }} className="mt-4 w-full bg-[#5B21B6] text-white py-2 px-4 rounded-full">
                    Checkout
                </Button>
                <div className="mt-8">
                   <Accordion bodyText={currentCard?.description as string}
                              title={"Description"}/>
                    <Accordion component={ResolvekeyFeature(currentCard?.id as string)} bodyText={""} title={"Key Features"}/>
                    <Accordion component={ResolveWhyChoice(currentCard?.id as string)} bodyText={""} title={"Why Choose this Product? "}/>
                </div>
            </div>

        </div>
    );
};

