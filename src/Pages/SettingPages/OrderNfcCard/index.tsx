import { useState } from "react";
import {BackIcon} from "../../../Components";
import {CardOrderNFCProduct} from "../../../Components/OrderNFC__Card";

export const OrderNfcCard = () => {
    const [nfcCards] = useState([
        {
            title:'Avatalk NFC Business Card',
            image:'/Carbon/nfcCard.png',
            colors:["#5B21B6","#000000", "#DBBB6A","sevenColor"],
            price:'7'
        },
        {
            title:'Avatalk NFC Tag',
            image:'/Carbon/nfcTag.png',
            colors:["#5B21B6","sevenColor"],
            price:'5'
        },
        {
            title:'Avatalk NFC Tag and Business Card Bundle',
            image:'/Carbon/nfcCard_Tag.png',
            colors:["#5B21B6","sevenColor"],
            price:'7'
        }                
    ])
    return (
        <>
            <>
                <div className=" w-full hiddenScrollBar h-dvh top-[0px] bg-white z-[15]">
                    <div className=" top-4">
                        <BackIcon title="Order NFC Card" theme="Carbon"></BackIcon>

                    </div>
                    <div className={"flex  flex-wrap items-center justify-between px-4 mt-[96px] hiddenScrollBar h-dvh overflow-y-scroll pb-[300px] pt-[32px]"}>
                    {nfcCards.map((el) => {
                        return (
                            <>
                                <CardOrderNFCProduct imgSrc={el.image} listColorBadge={el.colors} price={el.price} title={el.title}/>
                            </>
                        )
                    })}
                    </div>
                </div>
            </>
        </>
    );
};
