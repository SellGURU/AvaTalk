import {BackIcon} from "../../Components";
import {CartTu} from "./card-tutorial.tsx";

export const Tutorial=()=>{
    return(
        <div className={"w-full bg-[#FDFDFE] hiddenScrollBar h-dvh top-[0px]  z-[15]"}>
            <div className=" top-4">
                <BackIcon title="Tutorial Videos" theme="Carbon"></BackIcon>

            </div>
            <div className={"max-w-sm mx-auto p-4 rounded-lg  px-6 mt-[96px] hiddenScrollBar h-dvh overflow-y-scroll pb-[300px] pt-[10px]"}>

            <CartTu/>
            <CartTu/>
            <CartTu/>
            <CartTu/>
            <CartTu/>
            </div>
        </div>
    )
}

