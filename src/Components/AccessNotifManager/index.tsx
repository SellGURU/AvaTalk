import { useAuth } from "../../hooks/useAuth"

const AccessNotifManager = () => {
    const authContext = useAuth()
    const resolveText = () => {      
        if(authContext.currentUser.type_of_account.getType() == 'Trial') {
            return `
                Enjoy full access to all settings during your trial for a limited time. Upgrade to Pro to keep this control forever!            
            `
        }
        return ''
    }
    return (
        <>
            <div className="w-full py-4 px-6 rounded-[27px] bg-white borderBox-primary3 ">
                <div className="text-[14px] text-left text-[#374151]">{resolveText()}</div>
                <div className="w-full h-2 relative rounded-[12px] border-[#FFFFFF80] border mt-4" style={{
                    boxShadow: "inner 4px 4px 14px 2px #E2E8F0,inner -4px -4px 9px 2px #FFFFFF99"
                }}>
                    <div className={`absolute left-0 h-[7px] top-0 rounded-[12px] bg-[#FBBF24] `} style={{width:authContext.currentUser.type_of_account.getPercentDayUsed()+"%"}}></div>
                </div>
                <div className="text-[#94A3B8] text-xs text-left mt-2">
                     {authContext.currentUser.type_of_account.getDayUsed()}/14 Days
                </div>
                <div className="flex w-full font-medium mt-2 gap-6 justify-end items-center">
                    <div className="text-[#FBBF24] cursor-pointer text-[14px]">Upgrade to Pro</div>
                    <div className="text-[#94A3B8] cursor-pointer text-[14px]">Skip Now</div>
                </div>
            </div>
        </>
    )
}

export default AccessNotifManager