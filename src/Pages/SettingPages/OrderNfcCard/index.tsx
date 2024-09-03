import {BackIcon} from "../../../Components";
import {CardOrderNFCProduct} from "../../../Components/OrderNFC__Card";

export const OrderNfcCard = () => {
    return (
        <>
            <>
                <div className=" w-full hiddenScrollBar h-dvh top-[0px] bg-white z-[15]">
                    <div className=" top-4">
                        <BackIcon title="Order NFC Card" theme="Carbon"></BackIcon>

                    </div>
                    <div className={"flex  flex-wrap gap-2 px-6 mt-[96px] hiddenScrollBar h-dvh overflow-y-scroll pb-[300px] pt-[32px]"}>

                    <CardOrderNFCProduct imgSrc={"/Carbon/nfcCard.png"} listColorBadge={["#5B21B6","#000000","#DBBB6A"]} price={"7"} title={"Avatalk NFC Business Card"}/>
                    <CardOrderNFCProduct imgSrc={"/Carbon/nfcTag.png"} listColorBadge={["#5B21B6","#000000"]} price={"5"} title={"Avatalk NFC Tag"}/>
                    <CardOrderNFCProduct imgSrc={"/Carbon/nfcCard_Tag.png"} listColorBadge={["#5B21B6","#000000"]} price={"10"} title={"Avatalk NFC Tag and Business Card Bundle"}/>
                    </div>
                </div>
            </>
        </>
    );
};
