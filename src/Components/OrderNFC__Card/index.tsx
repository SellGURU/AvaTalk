interface Props {
    listColorBadge:string[],
    title:string,
    price:string,
    imgSrc:string
}

export const CardOrderNFCProduct = ({listColorBadge,title,price,imgSrc}:Props) => {

    return (

        <div className={"Carbon-Card-Product-container"}>
            <div><img src={imgSrc}  alt={""}/></div>
                <h1 className={"text-[10px] text-[#374151] font-bold"}>{title}</h1>
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
    );
};
