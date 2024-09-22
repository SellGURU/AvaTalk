/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { Notification as NotificationApi } from "../../Api"

interface NotificationProps {
    notifs:any
    setNotifs:(notifs:any) => void
}

const Notification:React.FC<NotificationProps> = ({notifs,setNotifs}) => {
    const [menu,setMenu] = useState<'All'|'Unread'>('All')
    
    const markAsRead = (id:string, day:string) => {
        setNotifs((prevNotifications:any) => ({
            ...prevNotifications,
            [day]: prevNotifications[day].map((notification:any) => 
                notification.id === id 
                    ? { ...notification, isRead: true } 
                    : notification
            )
        }));
    };
    const markAllAsRead = () => {
        setNotifs((prevNotifications:any) => {
            const updatedNotifications:any = {};
            Object.keys(prevNotifications).forEach(day => {
                updatedNotifications[day] = prevNotifications[day].map((notification:any) => ({
                    ...notification,
                    isRead: true
                }));
            });
            return updatedNotifications;
        });
        NotificationApi.markAll()
    };
    const resolveDateAgo = (date:Date) => {
        const now = new Date();
        // console.log(date)
        const secondsPast = Math.floor((now.getTime() - date.getTime() ) / 1000);

        if (secondsPast < 60) {
            return `${secondsPast} second${secondsPast === 1 ? '' : 's'} ago`;
        }
        if (secondsPast < 3600) {
            const minutes = Math.floor(secondsPast / 60);
            return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
        }
        if (secondsPast < 86400) {
            const hours = Math.floor(secondsPast / 3600);
            return `${hours} hour${hours === 1 ? '' : 's'} ago`;
        }
        if (secondsPast < 2592000) { // 30 days
            const days = Math.floor(secondsPast / 86400);
            return `${days} day${days === 1 ? '' : 's'} ago`;
        }
        if (secondsPast < 31536000) { // 365 days
            const months = Math.floor(secondsPast / 2592000);
            return `${months} month${months === 1 ? '' : 's'} ago`;
        }
        const years = Math.floor(secondsPast / 31536000);
        return `${years} year${years === 1 ? '' : 's'} ago`;
    }
    const resolveNotifLength = (data:any,config?:any) => {
        let length = 0
        Object.keys(data).forEach(key => {
            if(!config?.isUnread){
                length = length + data[key].length
            }else{
                length = length + data[key].filter((el:any) => el.isRead == false).length
            }
        })
        return length
    } 
    return (
        <>
            <div className="absolute z-30 px-4 py-6 rounded-[27px] boxShadow-button-gray top-[110px] left-4 bg-white h-[320px] w-[320px]">
                <div className="w-full text-sm  flex justify-between">
                    <div onClick={() => {
                        setMenu('All')
                    }} className={`${menu =='All'? 'text-primary-color':'text-[#9CA3AF] '} cursor-pointer font-medium`}>All ({resolveNotifLength(notifs)}) </div>
                    <div onClick={() => {
                        setMenu('Unread')
                    }} className={`${menu =='Unread'? 'text-primary-color':'text-[#9CA3AF] '} cursor-pointer font-medium`}>Unread ({resolveNotifLength(notifs,{isUnread:true})})</div>
                    <div onClick={() => {
                        markAllAsRead()                        
                    }} className="text-primary-color cursor-pointer font-medium">Mark all as read</div>
                </div>
                <div className="w-full border-b border-[#E5E7EB] mt-4"></div>

                <div className="w-full h-[250px] py-3 hiddenScrollBar overflow-y-scroll">
                    {Object.keys(notifs).map((el:any) => {
                        return (
                            <>
                                {/* <div>{notifs[el].map((val:any) => val.isRead ).filter((val:any) => val == true).length}</div> */}
                                {menu == 'Unread' && notifs[el].map((val:any) => val.isRead ).filter((val:any) => val == false).length >0 ?
                                <div className="text-[12px] text-left my-2 text-[#9CA3AF]">{el}</div>
                                :
                                <>
                                    {menu == 'All' &&
                                     <div className="text-[12px] text-left my-2 text-[#9CA3AF]">{el}</div>
                                    }
                                </>
                                }

                                {
                                    notifs[el].map((value:any) => {
                                        return (
                                            <>
                                                {
                                                     menu == 'Unread' ?
                                                     <>
                                                        {!value.isRead &&
                                                            <div onClick={() => {
                                                                NotificationApi.readNotification(value.id)
                                                                markAsRead(value.id,el)
                                                            }} className="text-left my-2">
                                                                <div className="flex justify-between">
                                                                    <div className="text-text-primary text-sm">{value.title}</div>
                                                                    <div className="text-text-primary flex items-center gap-1 text-sm">{resolveDateAgo(new Date(value.date))} {!value.isRead && 
                                                                        <div className="w-[8px] h-[8px] rounded-full bg-primary-color"></div>
                                                                    }</div>
                                                                </div>
                                                                <div className="text-[#6B7280] text-[12px] mt-1 " >{value.content}</div>
                                                            </div>                                                      
                                                        }
                                                     </>
                                                     :

                                                    <div onClick={() => {
                                                        NotificationApi.readNotification(value.id)
                                                    }} className="text-left my-2">
                                                        <div className="flex justify-between">
                                                            <div className="text-text-primary text-sm">{value.title}</div>
                                                            <div className="text-text-primary flex items-center gap-1 text-sm">{resolveDateAgo(new Date(value.date))} {!value.isRead && 
                                                                <div className="w-[8px] h-[8px] rounded-full bg-primary-color"></div>
                                                            }</div>
                                                        </div>
                                                        <div className="text-[#6B7280] text-[12px] mt-1 " >{value.content}</div>
                                                    </div>                                            
                                                }
                                            </>
                                        )
                                    })
                                }
                            </>
                        )
                    })}
                </div>
            </div>  
        </>
    )
}

export default Notification