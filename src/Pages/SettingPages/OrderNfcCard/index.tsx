import { useState } from "react";
import {BackIcon} from "../../../Components";
import {CardOrderNFCProduct} from "../../../Components/OrderNFC__Card";
import NFC from '../../../Api/Data/NFC.json'

export const OrderNfcCard = () => {
    const [nfcCards] = useState(NFC)
    return (
        <>
            <>
                <div className=" w-full hiddenScrollBar h-dvh top-[0px] bg-white z-[15]">
                    <div className=" top-4">
                        <BackIcon title="Order NFC Card" theme="Carbon"></BackIcon>

                    </div>
                    <div className={"flex  flex-wrap items-center justify-between px-4 mt-[76px] hiddenScrollBar h-dvh overflow-y-scroll pb-[300px] pt-[32px]"}>
                    {nfcCards.map((el) => {
                        return (
                            <>
                                <CardOrderNFCProduct oldPrice={el.oldPrice} id={el.id} imgSrc={el.image} listColorBadge={el.colors} price={el.price} title={el.title}/>
                            </>
                        )
                    })}
                    </div>
                </div>
            </>
        </>
    );
};
