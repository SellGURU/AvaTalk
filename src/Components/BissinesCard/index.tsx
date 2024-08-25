import { useAuth } from "../../hooks/useAuth"

const BissinesCard = () => {
    const context = useAuth()
    console.log(context.siginUpOptions)
    const resolveProfImage = () => {
        if(context.siginUpOptions.avatar_pic_url != ''){
            return context.siginUpOptions.avatar_pic_url
        }
        if(context.siginUpOptions.gender == 'female'){
            return './icons/FemaleFace.png'
        }
        return './icons/MaleFace.png'
    }
    const resolveCardName = () => {
        if(context.siginUpOptions.firstName == '' && context.siginUpOptions.lastName == ''){
            return 'Your Name'
        }
        return context.siginUpOptions.firstName + " " +context.siginUpOptions.lastName
    }

    const resolveCompanyJob = () => {
        if(context.siginUpOptions.job == '' && context.siginUpOptions.company == ''){
            return 'Company/ Job Title'
        }
        return context.siginUpOptions.company + "/ " +context.siginUpOptions.job        
    }
    return (
        <>
            <div className="bg-primary-color relative flex justify-between items-center px-4 w-[247px] h-[134px] rounded-[16px]">
                <div className="absolute right-0 top-0">
                    <img src="./icons/cardVisitBack.png" alt="" />
                </div>
                <div className="relative  ml-10">
                    <div className="w-[24px] h-[24px] flex justify-center top-[60px] left-[-4px] boxShadow-bisinesCard bg-white absolute rounded-full">
                        <img className="w-[16px] opacity-30" src="./icons/cardVisit/Apple.svg" alt="" />
                    </div>
                    <div className="w-[24px] h-[24px] flex justify-center top-[38px] left-[-25px] boxShadow-bisinesCard bg-white absolute rounded-full">
                        <img className="w-[16px] opacity-30" src="./icons/cardVisit/linkdin.svg" alt="" />                        
                    </div>
                    <div className="w-[24px] h-[24px] flex justify-center top-[8px] left-[-28px] boxShadow-bisinesCard bg-white absolute rounded-full">
                        <img className="w-[16px] opacity-30" src="./icons/cardVisit/global.svg" alt="" />                         
                    </div>
                    <div className="w-[24px] h-[24px] flex justify-center top-[-18px] left-[-12px] boxShadow-bisinesCard bg-white absolute rounded-full">
                        <img className={`w-[16px] ${context.siginUpOptions.email!= ''?'opacity-100':'opacity-30'}`} src="./icons/cardVisit/sms.svg" alt="" />                          
                    </div>
                    <div className="w-[24px] flex justify-center h-[24px] top-[-28px] left-[16px] boxShadow-bisinesCard bg-white absolute rounded-full">
                        <img className={`w-[16px] ${context.siginUpOptions.phone!= ''?'opacity-100':'opacity-30'}`} src="./icons/cardVisit/call.svg" alt="" />                          
                    </div>
                    <div className="w-[62px] h-[62px] overflow-hidden bg-white rounded-full boxShadow-bisinesCard">
                        <img className={`h-full  ${context.siginUpOptions.gender == ''?'opacity-30':'opacity-100'}`} src={resolveProfImage()} alt="" />
                    </div>
                </div>
                <div>
                    <div className="text-[12px] text-white font-semibold mb-1" style={{letterSpacing:'0.95px'}}>{resolveCardName()}</div>
                    <div className="text-[8px] opacity-80 text-white font-semibold">{resolveCompanyJob()}</div>
                </div>
            </div>
        </>
    )
}

export default BissinesCard