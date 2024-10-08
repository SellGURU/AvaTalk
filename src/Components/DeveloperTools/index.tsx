import { useEffect, useState } from "react"
import { Button } from "symphony-ui"
import { TimeManegar } from "../../Model"
import { publish } from "../../utils/event"
import { useAuth } from "../../hooks/useAuth"
import Select from "../Select"

interface DeveloperToolsInterface {

}

const DeveloperTools:React.FC<DeveloperToolsInterface> = () => {
    const [showMenu,setShowMenu] = useState(false)
    const [time ,setTime] = useState(TimeManegar.renderDate())
    const auth = useAuth()
    const [plan,setPlan] = useState(auth.currentUser.type_of_account.getType())
    const updateTime = () => {
        setTime(TimeManegar.renderDate())
    }
    useEffect(() => {
        const interval = setInterval(updateTime, 15000);     
        return () => clearInterval(interval);
    },[])
    return (
        <>
            {showMenu ?
                <div className="w-[400px] px-3 absolute shadow-xl right-0 top-0 h-screen bg-gray-300">
                    <div className="p-4 absolute right-2">
                        <img onClick={() => {
                            setShowMenu(false)
                        }} className="cursor-pointer" src="./Acord/cross.svg" alt="" />
                    </div>

                    <div className=" mt-10 mb-3 text-gray-700 w-full text-center">Developer Tools</div>
                    <hr />

                    <div className="mt-3">
                        <div className="px-10 gap-2 flex flex-col">
                            <div>time is : {time}</div>
                            <div>expired is : {auth.currentUser.type_of_account.getDateExpired()}</div>
                            <div>user is : {auth.currentUser.type_of_account.getType()}</div>
                            <Button onClick={() => {
                                TimeManegar.nextDay()
                                setTime(TimeManegar.renderDate())
                                publish("nextPage",{})
                            }} theme="Carbon"> next day</Button>
                            <Button onClick={() => {
                                TimeManegar.nextMonth()
                                setTime(TimeManegar.renderDate())
                                publish("nextPage",{})
                            }} theme="Carbon"> next month</Button>

                            <Button onClick={() => {
                                TimeManegar.previousDay()
                                setTime(TimeManegar.renderDate())
                                publish("nextPage",{})
                            }} theme="Carbon"> previous  day</Button>
                            <div>
                                <Select theme="Carbon" valueElement={plan}>
                                    <div onClick={() => {
                                        auth.currentUser.type_of_account.setType("Free")
                                        setPlan("Free")
                                    }} className="ml-4 my-2 cursor-pointer font-normal text-[14px]">Free</div>
                                    <div onClick={() => {
                                        auth.currentUser.type_of_account.setType("Trial")
                                        setPlan("Trial")
                                    }} className="ml-4 my-2 cursor-pointer font-normal text-[14px]">Trial</div>
                                    <div onClick={() => {
                                        auth.currentUser.type_of_account.setType("Pro")
                                        setPlan("Pro")
                                    }} className="ml-4 my-2 cursor-pointer font-normal text-[14px]">Pro</div>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
            :
                <div className="absolute right-0 top-0">
                    <div onClick={() => {
                        setShowMenu(true) 
                    }} className="w-[120px]  py-3 px-2 cursor-pointer bg-gray-300 text-gray-700 text-[13px]">
                        developer tools
                    </div>
                </div>
            }
        </>
    )
}

export default DeveloperTools