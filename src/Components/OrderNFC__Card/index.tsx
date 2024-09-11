import {Link} from "react-router-dom";

interface Props {
    listColorBadge:string[],
    title:string,
    price:string,
    imgSrc:string
}

export const CardOrderNFCProduct = ({listColorBadge,title,price,imgSrc}:Props) => {

    return (
        <Link rel="stylesheet" to="/settings/NFCBusinessCard">
        <div className={"Carbon-Card-Product-NfcCard-container"}>
            <div className={"w-full flex items-center justify-center"}>
                <img src={imgSrc} className={"h-[115px] w-fit"}  alt={""}/>
            </div>
                <h1 className={"text-[10px] h-10 text-[#374151] font-bold"}>{title}</h1>
            <div className={"text-[10px] text-[#6B7280] flex gap-2 items-center"}>
                Colors:
                {listColorBadge.map((color:string) => (
                    <div className={`w-[17px] h-[17px] rounded-md bg-[${color}]`}>
                    </div>
                ))}
            </div>
            <div className={"flex items-center justify-between"}>
                <p className={"text-[#5B21B6] font-semibold text-[14px]"}>£{price}</p>


                <div className={"Carbon-Card-product-Vector-container"}>
                    <div className={"Carbon-Card-product-Vector"}></div>
                </div>
            </div>
        </div>
                </Link>
    );
};
