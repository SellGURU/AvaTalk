/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"

const Notification = () => {
    const [menu,setMenu] = useState<'All'|'Unread'>('All')

    const notifs:any = {
        "Today":[
            {
                title:'Number of Image Uploads',
                content:'Limit Alert! 🚀 Your Pro subscription has expired, and your image uploads are now limited to 5 images. Renew within a month to regain unlimited uploads and access your saved images.',
                isRead:false,
                date:'time'
            },
            {
                title:'Number of Image Uploads',
                content:'Limit Alert! 🚀 Your Pro subscription has expired, and your image uploads are now limited to 5 images. Renew within a month to regain unlimited uploads and access your saved images.',
                isRead:false,
                date:'time'
            }            
        ],
        "Yesterday":[
            {
                title:'Number of Image Uploads',
                content:'Limit Alert! 🚀 Your Pro subscription has expired, and your image uploads are now limited to 5 images. Renew within a month to regain unlimited uploads and access your saved images.',
                isRead:false,
                date:'Aug 14'
            },
            {
                title:'Number of Image Uploads',
                content:'Limit Alert! 🚀 Your Pro subscription has expired, and your image uploads are now limited to 5 images. Renew within a month to regain unlimited uploads and access your saved images.',
                isRead:false,
                date:'Aug 14'
            }            
        ],        
    }

    return (
        <>
            <div className="absolute z-30 px-4 py-6 rounded-[27px] boxShadow-Gray top-[110px] left-4 bg-white h-[320px] w-[320px]">
                <div className="w-full text-sm  flex justify-between">
                    <div onClick={() => {
                        setMenu('All')
                    }} className={`${menu =='All'? 'text-primary-color':'text-[#9CA3AF] '} cursor-pointer font-medium`}>All (26) </div>
                    <div onClick={() => {
                        setMenu('Unread')
                    }} className={`${menu =='Unread'? 'text-primary-color':'text-[#9CA3AF] '} cursor-pointer font-medium`}>Unread (3)</div>
                    <div className="text-primary-color cursor-pointer font-medium">Mark all as read</div>
                </div>
                <div className="w-full border-b border-[#E5E7EB] mt-4"></div>

                <div className="w-full h-[250px] py-3 hiddenScrollBar overflow-y-scroll">
                    {Object.keys(notifs).map(el => {
                        return (
                            <>
                                <div className="text-[12px] text-left my-2 text-[#9CA3AF]">{el}</div>
                                {
                                    notifs[el].map((value:any) => {
                                        return (
                                            <>
                                                <div className="text-left">
                                                    <div className="flex justify-between">
                                                        <div className="text-text-primary text-sm">{value.title}</div>
                                                        <div className="text-text-primary flex items-center gap-1 text-sm">3h ago <div className="w-[8px] h-[8px] rounded-full bg-primary-color"></div></div>
                                                    </div>
                                                    <div className="text-[#6B7280] text-[12px] mt-1 " >{value.content}</div>
                                                </div>                                            
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