import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
// import {useState} from "react";

interface PlanCardProps {
  theme?: string;
  onClose:() => void
}

interface TrailCardProps {
  onClose:() => void
}

const  FreeCard = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full h-[230px] pt-7 relative bg-primary-color rounded-[24px] flex flex-col items-center justify-start ">
        <img className={"w-[50px] relative z-50 h-[50px]"} src={"/Carbon/L-Shield Done.svg"}/>
        <div className=" overflow-hidden  rounded-3xl h-full  absolute w-full opacity-100 left-0 top-0">
          <img className="w-full rounded-xl " src="/icons/backPlanBg.svg" alt="" />

        </div>
        <div className="pt-2 w-full flex items-center justify-center">
          <div className="text-white text-center relative z-50 font-semibold mt-2">
            Go Premium
          </div>
        </div>
        <div className="flex justify-center  mt-3">
          <div className="text-white text-[14px]  relative z-50  text-center w-[309px]">
            Unlock all the power of this app and enjoy networking experience
            like never before!
          </div>
        </div>
        <div onClick={()=>{navigate("service")}} className="absolute right-7 cursor-pointer bottom-6 flex">
          <div  className="text-[#F3F4F6] mr-2 text-[14px] font-medium">
            Upgrade your plan
          </div>
          <img src={"/Carbon/arrow-right.svg"} alt="" />
        </div>
      </div>     
    </> 
  )
}

const TrailCard:React.FC<TrailCardProps> = ({onClose}) => {
  const navigate = useNavigate();
  const auth = useAuth();
  return (
    <>
      <div className="w-full pt-6 h-[232px] relative bg-primary-color rounded-[24px] flex flex-col justify-start items-center">
        <img className={"w-[50px]  relative z-50  h-[50px]"} src={"/Carbon/F-Rocket.svg"}/>

        <div className="overflow-hidden  rounded-3xl h-full  absolute w-full opacity-100 left-0 top-0">
          <img className="w-full  " src="/icons/backPlanCard.png" alt=""/>
      
        </div>

        <img width={32} height={32} className="w-8 h-8 cursor-pointer absolute top-4 right-6 " src="/icons/Add.svg" onClick={onClose} alt=""/>

        <div className="pt-2 w-full flex items-center justify-center">
        </div>
        <div className="flex justify-center mt-3">
          <div className="text-white text-[14px]  relative z-50  text-center w-[309px]">
            Unlock all the power of this app and enjoy networking experience
            like never before!
          </div>
        </div>
        <div className=" w-full max-w-[309px] flex flex-col items-center justify-center gap-2">
          <div
              className={` mt-2 h-[20px] relative w-full  rounded-[8px] bg-[#E1E1E1] `}
          >
            <div
                className={`absolute rounded-[8px]  h-[20px]  `}
                style={{
                  background: 'linear-gradient(to right, #FECA06 50%, #FECA06 100%)',
                  width: `${auth.currentUser.type_of_account.getPercentDayReminded()}%`,
                }}
            ></div>
          </div>
          <div
              className="text-[#F9FAFB] text-sm font-medium self-start "> {auth.currentUser.type_of_account.getDaysReminded()}/14
            Day
          </div>
        </div>
        <div onClick={() => {
          navigate("service")
        }} className="absolute right-7 cursor-pointer bottom-6 flex">
          <div className="text-[#F3F4F6] mr-2 text-[14px] font-medium">

            Upgrade your plan
          </div>
          <img src={"/Carbon/arrow-right.svg"} alt=""/>
        </div>
      </div>     
    </>
  )
}

const PlanCard: React.FC<PlanCardProps> = ({onClose}) => {
  const auth = useAuth();
  
  const resolveCard =() => {
    if(auth.currentUser.type_of_account.getType() == 'Free') {
      return <FreeCard></FreeCard>
    }else {
      return <TrailCard onClose={onClose}></TrailCard>
    }
  }
  return (
    <>
      {resolveCard()}
    </>
  );
};
export default PlanCard;
