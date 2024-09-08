interface PlanCardProps {
    theme?:string
}

const PlanCard:React.FC<PlanCardProps> = () => {
    return (
        <>
            <div className="w-full h-[222px] relative bg-primary-color rounded-[24px]">
                <div className="absolute w-full opacity-10 left-0 top-0">
                    <img className="w-full  " src="./icons/backPlanCard.png" alt="" />              
                    {/* <div className="Carbon-Card-overly"></div> */}
                </div>
                <div className="pt-10">
                    <div className="text-white text-center font-semibold mt-2">Go Premium</div>
                </div>
                <div className="flex justify-center mt-3">
                    <div className="text-white text-[14px] text-center w-[309px]">
                        Unlock all the power of this app and enjoy networking experience like never before!
                    </div>

                </div>
                <div className="absolute right-7 cursor-pointer bottom-6 flex">
                    <div className="text-[#F3F4F6] mr-2 text-[14px] font-medium">Upgrade your plan</div>
                    <img src={"./Carbon/arrow-right.svg"} alt="" />
                </div>
            </div>
        </>
    )
}
export default PlanCard