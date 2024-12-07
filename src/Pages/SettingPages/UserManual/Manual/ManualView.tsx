/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { Button } from "symphony-ui"

const ManualView = () => {
    const navigate = useNavigate();
    const data = {
        key:'Profile_Mastery',
        title:'Profile Mastery',
        header:'Setting Up and Editing Your Profile',
        description:'The "Edit Profile" section in the Avatalk app is your go-to hub for creating a professional and personalized digital presence. Here’s how to get started:',
        stepBySteps:[
            {
                title:'Update Your Avatar:',
                description:'Choose or upload an image that represents your professional identity. This visual will be the face of your AI persona.',
                image:''
            },
            {
                title:'AI Settings:',
                description:'Tailor how your AI interacts with others by adjusting communication styles and professional goals. Ensure your persona reflects your unique voice.',
                image:''
            },
            {
                title:'Contact Information:',
                description:'Input and share your contact details, social media profiles, and personal websites. Make it easy for others to connect with you through multiple channels.',
                image:''
            } ,
            {
                title:'Add Multimedia:',
                description:'Enhance your profile by uploading files, images, or videos. Showcase your work, projects, or portfolio to create a dynamic and engaging profile.',
                image:''
            } , 
            {
                title:'Appointment Scheduling:',
                description:'Integrate appointment scheduling tools to allow others to book meetings with you directly from your profile.',
                image:''
            }                                                   
        ],
        endSection:'By following these steps, the "Edit Profile" section transforms your digital persona into a vibrant, interactive, and professional representation of yourself. Make every interaction count'
    }
    return (
        <>
            <div className={`Carbon-ChatDetails-container`}>
                <div className="flex px-6 items-center space-x-4 absolute top-8">
                    <Button
                    onClick={() => navigate(-1)}
                    theme={`Carbon-back`}
                    >
                    <div className={`Carbon-back-Button-vector`}></div>
                    </Button>
                    <p className={`Carbon-ChatDetails-title`}>{data.title}</p>
                </div>     
                <div className=" px-6 mt-[60px] hiddenScrollBar h-dvh overflow-y-scroll pb-[300px] pt-[4px]">
                    <div className="text-[#374151] text-[14px] font-medium mt-4">{data.header}</div>
                    <div className="text-[#374151] text-[12px] mt-6 text-justify">{data.description}</div>
                    <div className="mt-3">
                        {data.stepBySteps.map((el:any,index:number) => {
                            return (
                                <>
                                    <div className="flex  justify-between items-start">
                                        <div className="flex-grow mt-2 order-2">
                                            <div className="text-[12px] font-semibold text-[#374151]">
                                                {index+1}. {el.title}
                                            </div>
                                            <div className="text-justify mt-1 text-[#374151] text-[12px]">
                                                {el.description}
                                            </div>
                                        </div>
                                        <div className={`min-w-[138px] w-[40%] ${index %2 != 0 ? 'order-first':'order-last'} `}>
                                            <img src="./icons/manual/Card-Fill-Preview.png" alt="" />
                                        </div>
                                    </div>
                                </>
                            )
                        })}

                    </div>
                    <div className="text-[#374151] text-[12px] mt-6 text-justify">{data.endSection}</div>    
                </div>           
            </div>        
        </>
    )
}

export default ManualView