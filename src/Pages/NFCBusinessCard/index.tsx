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

export const NFCBusinessCard = () => {
    const { id } = useParams();
    const [currentCard,setCurrentCard] = useState<BusinessCard>()
    const [selectedColor, setSelectedColor] = useState([{color:NFC.filter((el) => el.id == id)[0].colors[0],count:1,id:'0'}]);
    // const images = [
    //     {
    //         original: '/Carbon/Purple 1.png', // Path relative to public folder
    //         thumbnail: '/Carbon/Purple 1.png', // Optional thumbnail (can be the same image or different)
    //         description: '', // Optional description
    //     },
    //     {
    //         original: '/Carbon/whaote.png', // Another image
    //         thumbnail: '/Carbon/whaote.png',
    //         description: '',
    //     },
    //     {
    //         original: '/Carbon/black1.png', // Another image
    //         thumbnail: '/Carbon/black1.png',
    //         description: '',
    //     },
    //     {
    //         original: '/Carbon/gold 1.png', // Another image
    //         thumbnail: '/Carbon/gold 1.png',
    //         description: '',
    //     },
    // ];
    const changeCardColor = (id:string,newColor:string) => {
        setSelectedColor((prevCards) =>
            prevCards.map((card:any) =>
                card.id === id
            ? {
                ...card,
                color: newColor, 
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
                        <h2 className="text-[14px] font-semibold text-[#374151]">
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
                        <div className="flex items-center mt-2">
                            <div className="flex text-[#9CA3AF] font-normal text-[16px]">price:<p
                                className={"text-purple-500 text-lg font-semibold"}>£{currentCard?.price}</p></div>
                        </div>
                        <div className="text-[#374151] font-normal text-[12px]">
                            Tax included. Shipping calculated at checkout.
                        </div>
                        {selectedColor.map(item=>{
                            return (
                                <div className="mt-4 flex justify-between items-center">
                                    <div className={"flex gap-3"}>
                                        {currentCard?.colors.map((color: string) => (
                                            <div onClick={() => {
                                                changeCardColor(item.id,color)
                                            }} className={`w-[26px] cursor-pointer h-[26px] rounded-md flex justify-center items-center `} style={{background:resolveBackGround(color)}}>
                                                {item.color == color && <img className="w-[10px]" src="./Carbon/tick-white.svg" />}
                                            </div>
                                        ))}
                                    </div>


                                    <div className={"bg-[#EEEFF3] flex items-center justify-between px-2 w-[128px] h-[40px] rounded-2xl"}>
                                        <button  className={"bg-white text-[#5B21B6] w-8 h-8 rounded-full flex items-center justify-center"}  onClick={()=>{
                                            if(item.count >1 || selectedColor.length > 1){
                                                handleQuantityChange("decrement",item.id)

                                            }
                                        }}>
                                            {item.count>1 || selectedColor.length == 1?
                                            "-":<img src={"/Carbon/trashVector.svg"}/>}
                                        </button>
                                        {item.count}
                                        <button  className={"bg-[#5B21B6] text-white w-8 h-8 rounded-full flex items-center justify-center"} onClick={()=>handleQuantityChange("increment",item.id)}>+</button>

                                    </div>
                                </div>
                            )
                        })}

                        <p className={"text-[14px] cursor-pointer mt-5 font-medium text-[#5B21B6]"}
                           onClick={() => setSelectedColor((prv) => [ ...prv,{color:NFC.filter((el) => el.id == id)[0].colors[0],count:1,id:(prv.length+1).toString()}])}>+ Add New Color</p>
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
                    <div className={" relative pb-5 pt-12"}>
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
                    Service.Pyload("c7a680d998",{
                        amount:'200',
                        color:'black',
                        description:'Upgrade your networking with the Avatalk NFC Business Card. Share contact details instantly, customize your AI persona, and track engagements for lasting professional impressions',
                        product_id:'1',
                        product_name:'a',
                        product_url:'a',
                        quantity:1
                    }).then((res) => {
                        window.open(res.data.paylink)
                    })                    
                }} className="mt-4 w-full bg-[#5B21B6] text-white py-2 px-4 rounded-full">
                    Checkout
                </Button>
                <div className="mt-4">
                   <Accordion bodyText={"Revolutionize Your Networking with the Avatalk NFC Business Card\n" +
                       "                Step into the future of professional networking with the Avatalk NFC Business Card, a cutting-edge tool designed\n" +
                       "                to transform how you connect with others. This isn’t just another business card—it’s an AI-powered networking\n" +
                       "                assistant embedded within a sleek, modern design. The Avatalk NFC Business Card goes beyond traditional contact\n" +
                       "                sharing, offering a comprehensive digital experience that captivates, engages, and leaves a lasting impression."}
                              title={"Description"}/>
                    <Accordion bodyText={"Key features of the product."} title={"Key Features"}/>
                    <Accordion bodyText={"Reasons why this product is a great choice."} title={"Why Choose this Product? "}/>
                </div>
            </div>

        </div>
    );
};

