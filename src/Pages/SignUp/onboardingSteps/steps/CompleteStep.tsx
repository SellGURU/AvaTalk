import { Button } from "symphony-ui"
import { BissinesCard } from "../../../../Components"
import { useNavigate } from "react-router-dom";

const CompleteStep = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="mt-8">
                <div className="text-text-primary font-semibold text-center">Your Profile completed.</div>
                <div className="flex justify-center">
                    <div className="text-[#6B7280] text-[14px] mt-2 text-center w-[256px]">
                        You're all set to start using avatalk.                   
                    </div>
                </div> 
                <div className="flex justify-center my-6">
                    <div className="">
                        <BissinesCard></BissinesCard>
                    </div>
                </div>          
                <Button onClick={() => {
                    navigate("/?splash=true");
                }} theme="Carbon">Get Started</Button>         
            </div>        
        </>
    )
}

export default CompleteStep