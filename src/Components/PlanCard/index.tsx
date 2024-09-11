import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface PlanCardProps {
  theme?: string;
}

const PlanCard: React.FC<PlanCardProps> = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  console.log(auth.currentUser.type_of_account.getType());
console.log( auth.currentUser.type_of_account.getDaysReminded());
const daysRemaining = auth.currentUser.type_of_account.getDaysReminded();
const totalDays = 14; 
const percentageRemaining = (daysRemaining / totalDays) * 100;
  return (
    <>
      {auth.currentUser.type_of_account.getType() === "Free" ? (
        <div className="w-full h-[230px] pt-7 relative bg-primary-color rounded-[24px] flex flex-col items-center justify-start ">
          <img className={"w-[50px] relative z-50 h-[50px]"} src={"/Carbon/L-Shield Done.svg"}/>
          <div className=" overflow-hidden  rounded-3xl h-full  absolute w-full opacity-100 left-0 top-0">
            <img className="w-full rounded-xl " src="/public/icons/backPlanBg.svg" alt="" />
            {/* <div className="Carbon-Card-overly"></div> */}
          </div>
          <div className="pt-2 w-full flex items-center justify-center">
            {/* <img className="" src="/public/icons/L-Shield Done.svg" alt="" /> */}
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
            <img src={"./Carbon/arrow-right.svg"} alt="" />
          </div>
        </div>
      ) : auth.currentUser.type_of_account.getType() === "Trial" ? (
          <div
              className="w-full pt-6 h-[232px] relative bg-primary-color rounded-[24px] flex flex-col justify-start items-center">
            <img className={"w-[50px]  relative z-50  h-[50px]"} src={"/Carbon/F-Rocket.svg"}/>

            <div className="absolute w-full opacity-10 left-0 top-0">
              <img className="w-full  " src="./icons/backPlanCard.png" alt=""/>
              {/* <div className="Carbon-Card-overly"></div> */}
            </div>

            <img width={32} height={32} className="w-8 h-8 cursor-pointer absolute top-4 right-6 "
                 src="/public/icons/Add.svg" alt=""/>

            <div className="pt-2 w-full flex items-center justify-center">
              {/* <img className="" src="/public/icons/L-Shield Done.svg" alt="" /> */}
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
                      width: `${percentageRemaining}%`,
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
              <img src={"./Carbon/arrow-right.svg"} alt=""/>
            </div>
          </div>
      ) : null}
    </>
  );
};
export default PlanCard;
