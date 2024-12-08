/* eslint-disable @typescript-eslint/no-explicit-any */
import {useNavigate, useParams} from "react-router-dom";
import { Button } from "symphony-ui"
const supportMenus = [
    {
        key: 'Welcome_to_Avatalk',
        title: 'Welcome to Avatalk',
        header: 'Introduction to the App',
        description: 'Welcome to Avatalk, your AI-powered networking assistant. Here\'s how to get the most out of Avatalk:\nProfile Setup: Begin by creating your professional profile. Input your details, including your contact information, job role, and key skills. This profile will form the basis of your AI persona.\nAI Persona Creation: Once your profile is complete, Avatalk will generate a personalized AI persona. This persona can interact on your behalf, sharing your contact details and responding intelligently to inquiries.\nNetworking: Use Avatalk to exchange contacts via NFC or QR codes effortlessly. Your AI persona will continue to engage with contacts, even when you\'re unavailable, ensuring ongoing professional presence.\nScheduling: Avatalk’s AI can also schedule meetings for you. Sync your calendar to ensure seamless scheduling of appointments, directly from interactions.\nAnalytics Dashboard: Track the performance of your AI persona through Avatalk’s analytics. Review interaction metrics to optimize and refine your networking approach.\nAvatalk is designed to enhance your networking efforts, making each connection meaningful and tailored to your professional goals.',
        stepBySteps: [],
        endSection: 'Avatalk is designed to enhance your networking efforts, making each connection meaningful and tailored to your professional goals. Whether you\'re freelancing, part of a small business, or with a large enterprise, Avatalk scales with you, ensuring your professional presence is always impactful.',
        limitations: {
            free: "Limited access to AI features, analytics, and profile customizations.",
            pro: "Full access to all features including unlimited profile customizations, enhanced AI settings, and in-depth analytics."
        }
    },
    {
        key: 'Profile_Mastery',
        title: 'Profile_Mastery',
        header: 'Setting Up and Editing Your Profile',
        description: 'The "Edit Profile" section in the Avatalk app is your go-to hub for creating a professional and personalized digital presence. Here’s how to get started:',
        stepBySteps: [
            {
                title: 'Update Your Avatar:',
                description: 'Choose or upload an image that represents your professional identity. This visual will be the face of your AI persona.',
                image: '/Carbon/manualview/Profile_Mastery/1.png'
            },
            {
                title: 'AI Settings:',
                description: 'Tailor how your AI interacts with others by adjusting communication styles and professional goals. Ensure your persona reflects your unique voice.',
                image: '/Carbon/manualview/Profile_Mastery/2.png'
            },
            {
                title: 'Contact Information:',
                description: 'Input and share your contact details, social media profiles, and personal websites. Make it easy for others to connect with you through multiple channels.',
                image: '/Carbon/manualview/Profile_Mastery/3.png'
            },
            {
                title: 'Add Multimedia:',
                description: 'Enhance your profile by uploading files, images, or videos. Showcase your work, projects, or portfolio to create a dynamic and engaging profile.',
                image: '/Carbon/manualview/Profile_Mastery/4.png'
            },
            {
                title: 'Appointment Scheduling:',
                description: 'Integrate appointment scheduling tools to allow others to book meetings with you directly from your profile.',
                image: '/Carbon/manualview/Profile_Mastery/5.png'
            }
        ],
        endSection: 'By following these steps, the "Edit Profile" section transforms your digital persona into a vibrant, interactive, and professional representation of yourself. Make every interaction count.',
        limitations: {
            free: "Limited profile customizations and multimedia options.",
            pro: "Unlimited profile customizations, multimedia uploads, and enhanced appointment scheduling features."
        }
    },
    {
        key: 'AI_Persona_Magic',
        title: 'AI_Persona_Magic',
        header: 'Customizing Your AI Persona',
        description: 'With Avatalk’s "AI Settings," you can customize your AI-driven persona for professional networking. Here’s a quick guide:',
        stepBySteps: [
            {
                title: 'Navigate to "AI Settings":',
                description: 'Open the app and navigate to the "AI Settings" section to begin customizing your persona.',
                image: '/Carbon/manualview/AI_Persona_Magic/1.png'
            },
            {
                title: 'Modify AI Information:',
                description: 'Use the text editor to modify or input new information your AI will use in conversations.',
                image: '/Carbon/manualview/AI_Persona_Magic/2.png'
            },
            {
                title: 'Analyze with AI:',
                description: 'Tap the "Analyze with AI" button to review your input and ensure accurate, engaging responses.',
                image: '/Carbon/manualview/AI_Persona_Magic/3.png'
            },
            {
                title: 'Review AI Suggestions:',
                description: 'Tap on the "Analyzed" button to review AI-generated suggestions and refine your persona further.',
                image: '/Carbon/manualview/AI_Persona_Magic/4.png'
            },
            {
                title: 'Test the AI:',
                description: 'Test your AI with text and voice interactions to ensure it handles questions appropriately.',
                image: '/Carbon/manualview/AI_Persona_Magic/5.png'
            }
        ],
        endSection: 'During the free trial, you get full access to these features only for once. After the trial, upgrade to Pro for unlimited access and ongoing customization options.',
        limitations: {
            free: "One-time full access during the trial period.",
            pro: "Unlimited access with ongoing customization, and additional AI features."
        }
    },
    {
        key: 'Dynamic_Galleries',
        title: 'Dynamic_Galleries',
        header: 'Managing and Sharing Visuals with Avatalk',
        description: 'The "Edit Gallery" feature in Avatalk is your go-to tool for managing and curating the visual aspects of your digital profile. It allows you to upload, organize, and update images that represent your professional identity, making sure you present yourself in the best light to your network.',
        stepBySteps: [
            {
                title: 'Upload Images:',
                description: 'Navigate to the "Edit Gallery" section within the app, and click the "Choose File" button to upload images from your device (JPEG and PNG formats supported).',
                image: '/Carbon/manualview/Dynamic_Galleries/1.png'
            },
            {
                title: 'Manage Your Gallery:',
                description: 'Once uploaded, manage your images by replacing or deleting outdated visuals.',
                image: '/Carbon/manualview/Dynamic_Galleries/2.png'
            },
            {
                title: 'Review Your Gallery:',
                description: 'Review your gallery to ensure it reflects your current personal or professional brand.',
                image: '/Carbon/manualview/Dynamic_Galleries/3.png'
            }
        ],
        endSection: 'Regularly updating your gallery ensures that your digital presence remains fresh and professional, helping you stand out in every interaction. Upgrade to Pro for a more seamless and customizable experience.',
        limitations: {
            free: "Limited image uploads and management options.",
            pro: "Unlimited image uploads and enhanced gallery management features."
        }
    },
    {
        key: 'Social_Connections',
        title: 'Social_Connections',
        header: 'Integrating and Managing Social Links',
        description: 'The "Socials" feature in Avatalk allows you to seamlessly integrate your social media profiles into your AI-driven networking experience. By linking platforms like LinkedIn, Telegram, Instagram, Facebook, Twitter/X, or YouTube, you can centralize your online presence and make it easier for connections to engage with you.',
        stepBySteps: [
            {
                title: 'Add Social Media Links:',
                description: 'Go to the "Socials" section in Avatalk, enter a title for your social media card, and select the social media platforms you wish to link.',
                image: '/Carbon/manualview/Social_Connections/1.png'
            },
            {
                title: 'Save Links:',
                description: 'Add your account information for each platform, and once saved, these links will appear on your Avatalk profile.',
                image: '/Carbon/manualview/Social_Connections/2.png'
            }
        ],
        endSection: 'Integrating your social media profiles in Avatalk enriches your networking by making your digital presence easily accessible. Upgrade to Pro for a more comprehensive experience and better control over your online connections.',
        limitations: {
            free: "Limited social media integrations and management.",
            pro: "Unlimited social media integrations with enhanced management features."
        }
    },
    {
        key: 'Adding_Links',
        title: 'Adding_Links',
        header: 'Maximizing Your Networking Using Links',
        description: 'The "Links" section in the Avatalk app allows you to effectively manage and share essential web resources, amplifying your professional networking. This tool helps you store, organize, and showcase crucial links, including portfolios, social media, or company websites, directly in your digital business card.',
        stepBySteps: [
            {
                title: 'Add New Link:',
                description: 'Navigate to the "Links" section in the Avatalk app, tap "Add New Link," enter a title and URL.',
                image: '/Carbon/manualview/Adding_Links/1.png'
            },
            {
                title: 'Edit or Remove Links:',
                description: 'To edit a link, select the desired link, make adjustments, and save. To delete outdated links, simply select and remove them.',
                image: '/Carbon/manualview/Adding_Links/2.png'
            }
        ],
        endSection: 'Start using the "Links" section today and make your digital business card more effective. With Avatalk, you can ensure that your network always has access to the most relevant information.',
        limitations: {
            free: "Limited link management and sharing capabilities.",
            pro: "Unlimited links with enhanced management options."
        }
    },
    {
        key: 'File_Sharing',
        title: 'File Sharing',
        header: 'Managing Your Digital Assets in Avatalk',
        description: 'Avatalk\'s "Files" section allows users to efficiently manage and store crucial digital assets for professional interactions. This feature is designed to ensure that important documents, such as presentations, contracts, and portfolios, are easily accessible during conversations.',
        stepBySteps: [
            {
                title: 'Upload Files:',
                description: 'Navigate to the "Files" section in Avatalk, tap "Choose File"',
                image: '/Carbon/manualview/File_Sharing/1.png'
            }
        ],
        limitations: {
            free: "Limited file storage and sharing options.",
            pro: "Unlimited file uploads and enhanced sharing capabilities."
        }
    }
];

const ManualView = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const data: any = supportMenus.find((item) => item.key === id) || null;

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
                        {data.stepBySteps.map((el: any, index: number) => {
                            return (
                                <>
                                    <div key={el.title} className="flex  justify-between items-start">
                                        <div className="flex-grow mt-2 order-2">
                                            <div className="text-[12px] font-semibold text-[#374151]">
                                                {index + 1}. {el.title}
                                            </div>
                                            <div className="text-justify mt-1 text-[#374151] text-[12px]">
                                                {el.description}
                                            </div>
                                        </div>
                                        <div
                                            className={`min-w-[138px] w-[40%] ${index % 2 != 0 ? 'order-first' : 'order-last'} `}>
                                            <img
                                                src={el.image.length >= 1 ? el.image : "/icons/manual/Card-Fill-Preview.png"}
                                                alt=""/>
                                        </div>
                                    </div>

                                </>
                            )
                        })}

                    </div>
                    <div className="text-[#374151] text-[12px] mt-6 text-justify">
                        <div className="text-[12px] font-semibold text-[#374151]">
                            Free vs. Pro Limitations
                        </div>
                        <div className={"space-y-1.5"}>
                            <div className={"text-[#374151] pt-1.5  flex gap-1.5  items-start justify-start text-[12px] text-justify text-wrap "}>
                                <div className={"text-[12px] font-semibold text-[#374151]"}>
                                pro:
                                </div>
                                <div>

                                {data.limitations.pro}
                                </div>
                            </div>
                            <div className={"text-[#374151] flex  gap-1.5 items-start justify-start  text-[12px] text-justify text-wrap "} >
                                <div className={" text-[12px] font-semibold text-[#374151]"}>

                                    free:
                                </div>
                                <div>

                                {data.limitations.free}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-[#374151] text-[12px] mt-6 text-justify">{data.endSection}</div>
                </div>
            </div>
        </>
    )
}

export default ManualView