import {Link} from "react-router-dom";

interface Props {
    listColorBadge:string[],
    title:string,
    price:string,
    oldPrice:string|undefined
    imgSrc:string
    id:string
}

export const CardOrderNFCProduct = ({listColorBadge,oldPrice,title,price,imgSrc,id}:Props) => {
    const resolveBackGround = (color:string) => {
        if(color == 'sevenColor'){
            return 'radial-gradient(circle, #9873D2CC, #FFFAEE)'
        }
        return color
    }
    return (
        <Link rel="stylesheet" to={"/settings/NFCBusinessCard/"+id}>
            <div className={"Carbon-Card-Product-NfcCard-container overflow-hidden "} style={{padding:'0px'}}>
                <div className={"w-full flex items-center justify-center  "} style={{
                    boxShadow:'inset 4px 1px 14px 2px #E2E8F0,inset -4px -1px 9px 2px #FFFFFF99',
                }}>
                    <img src={imgSrc} className={"h-[115px] w-fit"}  alt={""}/>
                </div>
                <div className="p-4 px-3 bg-white mt-0 ">
                    <h1 className={"text-[12px]  h-[35px] text-[#374151] font-medium"} style={{lineHeight:'1rem'}}>{title}</h1>
                    <div className={"text-[12px] mt-2 text-[#6B7280]  flex gap-2 items-center"}>
                        Colors:
                        {listColorBadge.map((color:string) => (
                            <>  
                            {color!='sevenColor' 
                            ?
                                <div className={`w-[20px] h-[20px] rounded-md flex justify-center items-center `} style={{background:resolveBackGround(color)}}>
                                    {/* {index == 0 && <img className="w-[10px]" src="./Carbon/tick-white.svg" />} */}
                                </div>
                            :
                                <div>
                                    <img className="w-[20px] h-[20px]  rounded-md" src="./icons/bussinesCards/sevenColor.jpg" alt="" />
                                </div>
                            }
                            </>
                        ))}
                    </div>
                    <div className={"flex items-center justify-between mt-4"}>
                        <p className={"text-[#5B21B6] font-semibold text-[16px]"}>
                            {oldPrice &&<span className="text-[#94A3B8] text-[16px] mr-1 line-through">£{oldPrice}</span>}
                            £{price}</p>


                        <div className={"Carbon-Card-product-Vector-container hover:border hover:border-white"}>
                            <div className={"Carbon-Card-product-Vector"}></div>
                        </div>
                    </div>

                </div>
            </div>
        </Link>
    );
};
