import {BackIcon} from "../../Components";
import {useState} from "react";

export const NFCBusinessCard = () => {
    // const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState([{color:'purple',count:1}]);

    const listColorBadge=["#5B21B6","#000000","#DBBB6A"]
    // const handleQuantityChange = (action: string) => {
    //     if (action === 'increment') {
    //         setQuantity(quantity + 1);
    //     } else if (action === 'decrement' && quantity > 1) {
    //         setQuantity(quantity - 1);
    //     }
    // };
    return (
        <div className=" w-full bg-[#FDFDFE] hiddenScrollBar h-dvh top-[0px]  z-[15]">
            <div className=" top-4">
                <BackIcon title="Avatalk NFC Business Card" theme="Carbon"></BackIcon>

            </div>
            <div
                className="max-w-sm mx-auto p-4 rounded-lg  px-6 mt-[96px] hiddenScrollBar h-dvh overflow-y-scroll pb-[300px] pt-[10px]">
                <div className="flex flex-col justify-center items-center">
                    <div className="flex w-[184px] h-[190px] ">
                        <img
                            src="/Carbon/nfcCard.png"
                            alt="Product"
                            className="w-full rounded-lg"
                        />
                    </div>
                    <div className={"bg-white shadow-md w-full p-5 rounded-xl"}>
                        <h2 className="text-[14px] font-semibold text-[#374151]">
                            Avatalk NFC Business Card
                        </h2>
                        <div className="flex items-center mt-2">
                            <div className="flex text-[#9CA3AF] font-normal text-[16px]">price:<p
                                className={"text-purple-500 text-lg font-semibold"}>£7</p></div>
                        </div>
                        <div className="text-[#374151] font-normal text-[12px]">
                            Tax included. Shipping calculated at checkout.
                        </div>
                        {selectedColor.map(item=>{
                            return (
                                <div className="mt-4 flex justify-between items-center">
                                    <div className={"flex gap-3"}>
                                        {listColorBadge.map((color: string) => (
                                            <div className={`w-[32px] h-[32px] rounded-md bg-[${color}]`}>
                                            </div>
                                        ))}
                                    </div>


                                    <div className={"bg-[#EEEFF3] flex items-center justify-between px-2 w-[128px] h-[40px] rounded-2xl"}>
                                        <button  className={"bg-[#5B21B6] text-white w-8 h-8 rounded-full"}>+</button>
                                        {







                                            item.count}
                                        <button  className={"bg-white text-[#5B21B6] w-8 h-8 rounded-full"}>-</button>

                                    </div>
                                </div>
                            )
                        })}

                        <p className={"text-[14px] mt-5 font-medium text-[#5B21B6]"}
                           onClick={() => setSelectedColor((prv) => [{color:"purpule",count:1}, ...prv])}>+ Add New Color</p>
                    </div>

                </div>
                <button className="mt-4 w-full bg-[#5B21B6] text-white py-2 px-4 rounded-full">
                    Checkout
                </button>
                <div className="mt-4">
                    <details className="mb-2 bg-[#F3F4F6] rounded-3xl text-[14px] font-bold text-[#374151] px-4 py-2">
                        <summary className="font-bold text-gray-800">Description</summary>
                        <p className="text-gray-600 mt-2">
                            Your product description goes here.
                        </p>
                    </details>
                    <details className="mb-2 bg-[#F3F4F6] rounded-3xl text-[14px] font-bold text-[#374151] px-4 py-2">
                        <summary className="font-bold text-gray-800">Key Features</summary>
                        <p className="text-gray-600 mt-2">Key features of the product.</p>
                    </details>
                    <details>
                        <summary className="font-bold text-gray-800 bg-[#F3F4F6] rounded-3xl text-[14px] font-bold text-[#374151] px-4 py-2">Why Choose this Product?</summary>
                        <p className="text-gray-600 mt-2">
                            Reasons why this product is a great choice.
                        </p>
                    </details>
                </div>
            </div>

        </div>
    );
};

