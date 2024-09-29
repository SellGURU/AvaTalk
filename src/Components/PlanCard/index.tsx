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
      <div className="w-full h-[230px] pt-7 px-6 relative bg-primary-color rounded-[24px] flex flex-col items-center justify-start ">
        <img className={"w-[50px] relative z-50 h-[50px]"} src={"/Carbon/L-Shield Done.svg"}/>
        <div className=" overflow-hidden  rounded-3xl h-full  absolute  w-full opacity-100 left-0 bottom-0 right-0 top-0">
          <img className="w-full scale-150 h-full rounded-xl " src="/icons/backPlanBg.svg" alt="" />
        </div>
        <div className="pt-2 w-full flex items-center justify-center">
          <div className="text-white text-center relative z-50 font-semibold mt-2">
            Go Premium
          </div>
        </div>
        <div className="flex justify-center  mt-3">
          <div className="text-white text-[14px]  relative z-50  text-center w-full">
            Unlock the full potential of this app and elevate your networking experience like never before!
          </div>
        </div>
        <div onClick={() => {
          navigate("service")
        }} className=" relative z-20 mt-2 cursor-pointer w-full justify-end flex">
          <div className="text-[#F3F4F6] cursor-pointer mr-2 text-[14px] font-medium">

            Upgrade your plan
          </div>
          <img src={"/Carbon/arrow-right.svg"} alt=""/>
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
      <div className="w-full pt-6 px-6 overflow-hidden h-[232px] relative bg-primary-color rounded-[24px] flex flex-col justify-start items-center">
        <div className="w-full relative z-30 flex justify-end">
          <img width={32} height={32} className="w-8 h-8 cursor-pointer  " src="/icons/Add.svg" onClick={onClose} alt=""/>

        </div>
        <div className="absolute z-30">
          <img className={"w-[50px]   relative z-50  h-[50px]"} src={"/Carbon/F-Rocket.svg"}/>
        </div>

        <div className=" rounded-3xl h-full scale-110 absolute w-full opacity-100 left-[-8px] top-[-8px]">
          <img className="w-full  " src="/icons/backPlanCard.png" alt=""/>
      
        </div>



        <div className="pt-2 w-full flex items-center justify-center">
        </div>
        <div className="flex justify-center mt-3">
          <div className="text-white text-[14px]  relative z-50  text-center w-full">
            Unlock the full potential of this app and elevate your networking experience like never before!
          </div>
        </div>
        <div className=" w-full  flex flex-col items-center justify-center gap-2">
          <div
              className={` mt-2 h-[20px] relative w-full  rounded-[16px] p-[1px] px-[2px] bg-[#E1E1E1] `}
          >
            <div
                className={`absolute rounded-[16px]  h-[17px]  `}
                style={{
                  background: 'linear-gradient(to right, #FECA06 50%, #FECA06 100%)',
                  width: `${auth.currentUser.type_of_account.getPercentDayUsed()}%`,
                }}
            ></div>
          </div>
          <div
              className="text-[#F9FAFB] text-sm font-medium self-start "> {auth.currentUser.type_of_account.getDayUsed()}/14
            Day
          </div>
        </div>
        <div onClick={() => {
          navigate("service")
        }} className=" relative z-20 cursor-pointer w-full justify-end flex">
          <div className="text-[#F3F4F6] cursor-pointer mr-2 text-[14px] font-medium">

            Upgrade your plan
          </div>
          <img src={"/Carbon/arrow-right.svg"} alt=""/>
        </div>
      </div>     
    </>
  )
}

const ProCard:React.FC<TrailCardProps> = ({onClose}) => {
  const navigate = useNavigate();
  const auth = useAuth();
  return (
    <>
      <div className="w-full pt-6 px-6 h-[232px] relative bg-primary-color rounded-[24px] flex flex-col justify-start items-center">
        <div className="w-full relative z-30 flex justify-end">
          <img width={32} height={32} className="w-8 h-8 cursor-pointer  " src="/icons/Add.svg" onClick={onClose} alt=""/>

        </div>
        <div className="absolute z-30">
          <img className={"w-[50px]   relative z-50  h-[50px]"} src={"/Carbon/F-Rocket.svg"}/>
        </div>

        <div className="overflow-hidden  rounded-3xl h-full  absolute w-full opacity-100 left-0 top-0">
          <img className="w-full  " src="/icons/backPlanCard.png" alt=""/>

        </div>



        <div className="pt-2 w-full flex items-center justify-center">
        </div>
        <div className="flex justify-center mt-3">
          <div className="text-white text-[14px]  relative z-50  text-justify w-full">
            {auth.currentUser.type_of_account.getDayremindToExpired()} days left! Renew now to keep enjoying premium networking tools without interruption.
          </div>
        </div>
        <div className=" w-full  flex flex-col items-center justify-center gap-2">
          <div
              className={` mt-2 h-[20px] relative w-full overflow-hidden  rounded-[16px] p-[1px] px-[2px] bg-[#E1E1E1] `}
          >
            <div
                className={`absolute rounded-[16px]  h-[17px]  `}
                style={{
                  background: 'linear-gradient(to right, #FECA06 50%, #FECA06 100%)',
                  width: `${auth.currentUser.type_of_account.getDayremindToExpiredFrom7DayPercent()}%`,
                }}
            ></div>
          </div>
          <div
              className="text-[#F9FAFB] text-sm font-medium self-start "> {auth.currentUser.type_of_account.getDayremindToExpiredFrom7Day()}/7
            Day
          </div>
        </div>
        <div onClick={() => {
          navigate("service")
        }} className=" relative z-20 cursor-pointer w-full justify-end flex">
          <div className="text-[#F3F4F6] cursor-pointer mr-2 text-[14px] font-medium">

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
    }else if(auth.currentUser.type_of_account.getType() == 'Trial')  {
      return <TrailCard onClose={onClose}></TrailCard>
    }else {
      return <ProCard onClose={onClose}></ProCard>
    }
  }
  return (
    <>
      {resolveCard()}
    </>
  );
};
export default PlanCard;
