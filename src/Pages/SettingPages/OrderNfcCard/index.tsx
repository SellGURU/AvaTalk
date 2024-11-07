import {  useState } from "react";
import {BackIcon} from "../../../Components";
import {CardOrderNFCProduct} from "../../../Components/OrderNFC__Card";
import NFC from '../../../Api/Data/NFC.json'
import {  useSearchParams } from "react-router-dom";
import { Service } from "../../../Api";
// import { publish } from "../../../utils/event";
import Modal from "react-modal";
import { Button } from "symphony-ui";
// import { publish } from "../../../utils/event";

export const OrderNfcCard = () => {
    const [nfcCards] = useState(NFC)
    const [isOpen, setIsOpen] = useState(false);
    // const navigate = useNavigate();
    const [searchParametr] = useSearchParams()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [used,setUsed] = useState(false)
    rewardful('ready', () => {
        if(!used){
            console.log('Rewardful Ready!')
            if(searchParametr.get("status") == "success"){
                setTimeout(() => {
                    Service.payRedirect(searchParametr.get("sassionid")||"").then(() => {
                        setIsOpen(true)
                        setUsed(true)
                        // publish("refreshPage",{})
                        rewardful('convert', { email: searchParametr.get("email") });
                        // console.log(location.pathname)
                        // navigate(location.pathname+'?Successfulpayment=true', { replace: true });                  
                    })    
                }, 1000);
            }        
        }
    });
    // useEffect(() => {
    //     if(searchParametr.get("status") == "success"){
    //         setIsOpen(true)
    //         setTimeout(() => {
    //             Service.payRedirect(searchParametr.get("sassionid")||"").then(() => {
    //                 // publish("refreshPage",{})
    //                 rewardful('convert', { email: searchParametr.get("email") });
    //                 // console.log(location.pathname)
    //                 // navigate(location.pathname+'?Successfulpayment=true', { replace: true });                  
    //             })    
    //         }, 1000);
    //     }
    // })    
    return (
        <>
            <>
                <div className=" w-full hiddenScrollBar h-dvh top-[0px] bg-white z-[15] ">
                    <div className=" top-4">
                        <BackIcon title="Order NFC Card" theme="Carbon"></BackIcon>

                    </div>
                    <div className={"flex  flex-wrap items-center justify-between px-4 mt-[66px]  hiddenScrollBar h-dvh overflow-y-scroll pb-[130px]"}>
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
                        rewardful('convert', { email: searchParametr.get("email") });
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
        </>
    );
};
