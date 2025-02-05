/* eslint-disable @typescript-eslint/no-explicit-any */
import {useNavigate, useParams} from "react-router-dom";
import { Button } from "symphony-ui"
const supportMenus = [
    {
        key: 'Welcome_to_Avatalk',
        title: 'Welcome to Avatalk',
        header: 'Introduction to the App',
        description: `Welcome to Avatalk, your AI-powered networking assistant. Here's how to get the most out of Avatalk:`,
        stepBySteps: [
            {
                title: 'Profile Setup:',
                description: 'Begin by creating your professional profile. Input your details, including your contact information, job role, and key skills. This profile will form the basis of your AI persona.',
                image: '/Carbon/manualview/Welcome To Avatalk/1-t.png'
            },
            {
                title: 'AI Persona Creation:',
                description: 'Once your profile is complete, Avatalk will generate a personalized AI persona. This persona can interact on your behalf, sharing your contact details and responding intelligently to inquiries.',
                image: '/Carbon/manualview/Welcome To Avatalk/2.jpeg'
            },
            {
                title: 'Networking:',
                description: `Use Avatalk to exchange contacts via NFC or QR codes effortlessly. Your AI persona will continue to engage with contacts, even when you're unavailable, ensuring ongoing professional presence.`,
                image: '/Carbon/manualview/Welcome To Avatalk/4.jpeg'
            },
            {
                title: 'Scheduling:',
                description: 'Avatalk’s AI can also schedule meetings for you. Sync your calendar to ensure seamless scheduling of appointments, directly from interactions.',
                image: '/Carbon/manualview/Welcome To Avatalk/3-t.png'
            },
            {
                title: 'Analytics Dashboard:',
                description: 'Track the performance of your AI persona through Avatalk’s analytics. Review interaction metrics to optimize and refine your networking approach.',
                image: '/Carbon/manualview/Welcome To Avatalk/5.jpeg'
            }            
        ],
        endSection: `Avatalk is designed to enhance your networking efforts, making each connection meaningful and tailored to your professional goals. Whether you're freelancing, part of a small business, or with a large enterprise, Avatalk scales with you, ensuring your professional presence is always impactful.`,
        limitations: {
        }
    },
    {
        key: 'Profile_Mastery',
        title: 'Profile Mastery',
        header: 'Setting Up and Editing Your Profile',
        description: 'The "Edit Profile" section in the Avatalk app is your go-to hub for creating a professional and personalized digital presence. Here’s how to get started:',
        stepBySteps: [
            {
                title: 'Update Your Avatar',
                description: 'Choose or upload an image that represents your professional identity. This visual will be the face of your AI persona.',
                image: '/Carbon/manualview/Profile_Mastery/1.jpeg'
            },
            {
                title: 'AI Settings:',
                description: 'Tailor how your AI interacts with others by adjusting communication styles and professional goals. Ensure your persona reflects your unique voice.',
                image: '/Carbon/manualview/Profile_Mastery/2.jpeg'
            },
            {
                title: 'Contact Information:',
                description: 'Input and share your contact details, social media profiles, and personal websites. Make it easy for others to connect with you through multiple channels.',
                image: '/Carbon/manualview/Profile_Mastery/3.jpeg'
            },
            {
                title: 'Add Multimedia:',
                description: 'Enhance your profile by uploading files, images, or videos. Showcase your work, projects, or portfolio to create a dynamic and engaging profile.',
                image: '/Carbon/manualview/Profile_Mastery/4-t.png'
            },
            {
                title: 'Appointment Scheduling:',
                description: 'Integrate appointment scheduling tools to allow others to book meetings with you directly from your profile.',
                image: '/Carbon/manualview/Profile_Mastery/5-t.png'
            }
        ],
        endSection: 'By following these steps, the "Edit Profile" section transforms your digital persona into a vibrant, interactive, and professional representation of yourself. Make every interaction count.',
        limitations: {
        }
    },
    {
        key: 'AI_Persona_Magic',
        title: 'AI Persona Magic',
        header: '',
        description: 'With Avatalk’s "AI Settings," you can customize your AI-driven persona for professional networking. Here’s a quick guide:',
        stepBySteps: [
            {
                title: 'Access AI Settings',
                description: 'Navigate to "AI Settings" in the app to begin customizing your persona.',
                image: '/Carbon/manualview/AI_Persona_Magic/1.png'
            },
            {
                title: 'Edit AI Knowledge:',
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
                description: 'Tap on the "Analyzed" button to have a look at the AI review and read the suggestions.',
                image: '/Carbon/manualview/AI_Persona_Magic/4.png'
            },
            {
                title: 'Test Your AI:',
                description: 'Test your AI with text and voice interactions to ensure it handles questions appropriately.',
                image: '/Carbon/manualview/AI_Persona_Magic/5.png'
            },
            {
                title: 'Refine AI Responses:',
                description: `If the AI's responses aren't complete, add more details to the AI Knowledge section.`,
                image: '/Carbon/manualview/AI_Persona_Magic/6.png'
            },
            {
                title: 'Choose AI Voice:',
                description: 'Choose your AI’s voice gender from the dropdown menu to match your professional style.',
                image: '/Carbon/manualview/AI_Persona_Magic/7.png'
            },
            {
                title: 'Save Changes:',
                description: 'After adjusting, click "Save Changes" to apply.',
                image: '/Carbon/manualview/AI_Persona_Magic/8.png'
            }                                    
        ],
        endSection: 'During the free trial, you get full access to these features only for once. After the trial, upgrade to Pro for unlimited access and ongoing customization options.',
        limitations: {
            // free: "One-time full access during the trial period.",
            // pro: "Unlimited access with ongoing customization, and additional AI features."
        }
    },
    {
        key: 'Dynamic_Galleries',
        title: 'Dynamic Galleries',
        header: 'Managing and Sharing Visuals with Avatalk',
        description: 'The "Edit Gallery" feature in Avatalk is your go-to tool for managing and curating the visual aspects of your digital profile. It allows you to upload, organize, and update images that represent your professional identity, making sure you present yourself in the best light to your network.',
        stepBySteps: [
            {
                title: 'Open the Gallery:',
                description: 'Navigate to the "Edit Gallery" section within the app.',
                image: '/Carbon/manualview/Dynamic_Galleries/1.png'
            },
            {
                title: 'Upload Images:',
                description: 'Click the "Choose File" button to upload images from your device (JPEG and png formats supported).',
                image: '/Carbon/manualview/Dynamic_Galleries/4.png'
            },
            {
                title: 'Manage Your Gallery:',
                description: 'Replace or delete outdated visuals.',
                image: '/Carbon/manualview/Dynamic_Galleries/2.jpeg'
            },
            {
                title: 'Review & Update:',
                description: 'Ensure your gallery reflects your current personal or professional brand.',
                image: '/Carbon/manualview/Dynamic_Galleries/3.png'
            }            
        ],
        endSection: 'Regularly updating your gallery ensures that your digital presence remains fresh and professional, helping you stand out in every interaction. Upgrade to Pro for a more seamless and customizable experience.',
        limitations: {
            free: "You can upload up to 5 images and are limited to basic management features.",
            pro: ` Unlimited image uploads, advanced organization tools, and priority customer support. Upgrade to Pro for enhanced flexibility and control over your gallery.`
        }
    },
    {
        key: 'Social_Connections',
        title: 'Social Connections',
        header: 'Integrating and Managing Social Links',
        description: 'The "Socials" feature in Avatalk allows you to seamlessly integrate your social media profiles into your AI-driven networking experience. By linking platforms like LinkedIn, Telegram, Instagram, Facebook, Twitter/X, or YouTube, you can centralize your online presence and make it easier for connections to engage with you.',
        stepBySteps: [
            {
                title: 'Go to Socials:',
                description: ' Navigate to the "Socials" section in Avatalk.',
                image: '/Carbon/manualview/Social_Connections/1-t.png'
            },
            {
                title: 'Title Your Social Media Card:',
                description: 'Enter a title for your social media links.',
                image: '/Carbon/manualview/Social_Connections/2-t.png'
            },
            {
                title: 'Select Platforms:',
                description: 'Choose the social media platforms you want to link.',
                image: '/Carbon/manualview/Social_Connections/3-t.png'
            },
            {
                title: 'Add Account Information:',
                description: 'Input your account details for each platform.',
                image: '/Carbon/manualview/Social_Connections/4-t.png'
            } ,

            {
                title: 'Save & Display:',
                description: ' Once saved, these links will appear on your Avatalk profile.',
                image: '/Carbon/manualview/Social_Connections/5-t.png'
            }                                                            
        ],
        endSection: 'Integrating your social media profiles in Avatalk enriches your networking by making your digital presence easily accessible. Upgrade to Pro for a more comprehensive experience and better control over your online connections.',
        limitations: {
            // free: "Limited social media integrations and management.",
            // pro: "Unlimited social media integrations with enhanced management features."
        }
    },
    {
        key: 'Adding_Links',
        title: 'Adding Links',
        header: 'Maximizing Your Networking Using Links',
        description: 'The "Links" section in the Avatalk app allows you to effectively manage and share essential web resources, amplifying your professional networking. This tool helps you store, organize, and showcase crucial links, including portfolios, social media, or company websites, directly in your digital business card.',
        stepBySteps: [
            {
                title: 'Open the Links Section:',
                description: 'Navigate to the "Links" section in the Avatalk app.',
                image: '/Carbon/manualview/Adding_Links/1.png'
            },
            {
                title: 'Add a New Link:',
                description: 'Tap "Add New Link" to enter a title and URL. This ensures your link is clearly labeled and relevant.',
                image: '/Carbon/manualview/Adding_Links/2.png'
            },
            {
                title: 'Edit Links:',
                description: 'To edit a link, select the desired link, make adjustments, and save.',
                image: '/Carbon/manualview/Adding_Links/3.png'
            },
            {
                title: 'Delete Outdated Links:',
                description: 'Remove outdated links by selecting and deleting them to keep your profile current and streamlined.',
                image: '/Carbon/manualview/Adding_Links/4.jpeg'
            }                        
        ],
        endSection: 'Start using the "Links" section today and make your digital business card more effective. With Avatalk, you can ensure that your network always has access to the most relevant information.',
        limitations: {
            free: "Free Version: Limited to 2 links in your profile, which restricts the amount of information you can share.",
            pro: "Pro Version: Enjoy unlimited links and advanced organizational features to create a more comprehensive digital presence."
        }
    },
    {
        key: 'File_Sharing',
        title: 'File Sharing',
        header: 'Managing Your Digital Assets in Avatalk',
        description: `Avatalk's "Files" section allows users to efficiently manage and store crucial digital assets for professional interactions. This feature is designed to ensure that important documents, such as presentations, contracts, and portfolios, are easily accessible during conversations, enhancing the depth of your interactions.`,
        stepBySteps: [
            {
                title: 'Go to Files Section:',
                description: 'Navigate to the "Files" section in the Avatalk app.',
                image: '/Carbon/manualview/File/1.png'
            },
            {
                title: 'Upload Files:',
                description: 'Tap on the "Choose File" button to upload files in supported formats like PDF, DOCX, XLSX, PSD, and AI.',
                image: '/Carbon/manualview/File/2.png'
            },
            {
                title: 'Save Changes:',
                description: 'After selecting the file, click "Save Changes" to confirm its addition to your digital asset library.',
                image: '/Carbon/manualview/File/3.png'
            },
            {
                title: 'Access Files Anytime:',
                description: 'Your file is now securely stored and ready for your persona to share during conversations.',
                image: '/Carbon/manualview/File/4.png'
            }                                    
        ],
         endSection: 'Avatalk makes managing your professional assets easy, but for maximum file capacity and flexibility, upgrading to Pro is recommended. This will help ensure all your important files are always ready when you need them.',
        limitations: {
            free: "Free users can upload up to 1 file with a maximum size of 10MB.",
            pro: "Pro users enjoy up to 50 uploads with a higher maximum file size (50MB), enabling them to store and share larger assets."
        }
    },
    {
        key: 'Adding_Location',
        title: 'Adding Location',
        header: 'Map Your Connections with Avatalk’s Address Feature',
        description: `The Address section in the Avatalk app makes managing and sharing your professional location details quick and easy. Whether updating your office address, sharing your current location, or saving frequent destinations, this tool simplifies location management for seamless networking.`,
        stepBySteps: [
            {
                title: 'Open Google Map Section:',
                description: 'Open the Avatalk app and navigate to the “Google Map” section.',
                image: '/Carbon/manualview/location/3-t.png'
            },
            {
                title: 'View Current Location:',
                description: 'View your current location on the interactive map, marked by a red pin.',
                image: '/Carbon/manualview/location/2-t.png'
            },
            {
                title: 'Search a New Location:',
                description: ' Use the “Search your location...” bar to type in an address or location name.',
                image: '/Carbon/manualview/location/5-t.png'
            },
            {
                title: 'Set Location:',
                description: 'Once the desired location is displayed, click to set it.',
                image: '/Carbon/manualview/location/4-t.png'
            },
            {
                title: 'Save Changes:',
                description: 'Press the “Save Change” button to confirm and update your professional address.',
                image: '/Carbon/manualview/location/22-T.png'
            }                                                    
        ],
         endSection: 'Avatalk’s address feature ensures that your professional information stays up-to-date, supporting smooth interactions and effortless networking. Stay ahead by keeping your location accurate with just a few clicks.',
        limitations: {
        }
    },
    {
        key: 'Adding_Videos',
        title: 'Adding Videos',
        header: 'Videos in Avatalk',
        description: `The "Video" section in Avatalk helps you enhance your digital business card by uploading and managing video content. This feature enables you to create a dynamic professional profile by adding video links directly to your Avatalk profile, boosting engagement and showcasing your expertise.`,
        stepBySteps: [
            {
                title: 'Go to Video Section: ',
                description: 'Open the Avatalk app and navigate to the "Video" section.',
                image: '/Carbon/manualview/videos/2-t.png'
            },
            {
                title: 'Add a Video Link: ',
                description: 'Tap "Add New Link," input a video title, and paste your video link.',
                image: '/Carbon/manualview/videos/3-t.png'
            },
            {
                title: 'Edit or Delete:',
                description: ' Edit or delete links to keep your video content relevant.',
                image: '/Carbon/manualview/videos/4-t.png'
            },
            {
                title: 'Save Changes:',
                description: ` Once you're done, tap "Save Change" to update your profile instantly.`,
                image: '/Carbon/manualview/videos/1-t.png'
            },                                                
        ],
         endSection: 'With Avatalk, you can easily enrich your digital business card with engaging video content. Consider upgrading to Pro for enhanced features and limitless customization options.',
        limitations: {
            free: "Limited to 1 video upload.",
            pro: " Up to 50 video uploads and advanced management tools. Upgrade to Pro for greater flexibility."            
        }
    },
    {
        key: 'Setting_Appointments',
        title: 'Setting Appointments',
        header: 'Appointment Mastery: Setting Up and Managing Appointments',
        description: `Avatalk’s appointment scheduling feature helps you seamlessly manage your meetings and networking. By integrating with Calendly, you allow others to book meetings with you directly from your Avatalk profile. This guide walks you through the setup process, ensuring your professional availability is accessible and well-organized.`,
        stepBySteps: [
            {
                title: 'Access the Appointments Section:',
                description: 'Go to the "Appointments" section in Avatalk.',
                image: '/Carbon/manualview/appointment/2.PNG'
            },
            {
                title: 'Enter a Title:',
                description: 'Provide a title for your booking page (e.g., "Book with me").',
                image: '/Carbon/manualview/appointment/4.PNG'
            },
            {
                title: 'Paste Your Calendly Link:',
                description: ' Insert your unique Calendly URL in the designated field.',
                image: '/Carbon/manualview/appointment/3.PNG'
            },
            {
                title: 'Save Your Changes:',
                description: `Click "Save" to activate the link on your Avatalk profile.`,
                image: '/Carbon/manualview/appointment/1.PNG'
            },                                                
        ],
         endSection: 'Enhance Your Professional Networking: By setting up appointments on Avatalk, you streamline your communication and eliminate the back-and-forth hassle of scheduling. Upgrade to the Pro version for unlimited access and added features to boost your efficiency.',
        limitations: {
            free: "You can send and receive a limited number of messages, and only the first 3 responses will be visible. After this, the messages will be blurred, limiting your ability to fully engage.",
            pro: "  Unlock unlimited chats and the ability to review past conversations, ensuring you never miss an important connection."            
        }
    },
    {
        key: 'Analytics',
        title: 'Analytics',
        header: '',
        description: `The "Analytics" section in Avatalk is designed to give you a comprehensive understanding of how your AI-powered business persona is performing. With detailed insights, you can monitor and refine your networking efforts, ensuring each interaction is purposeful and effective.`,
        stepBySteps: [
            {
                title: 'Navigate to Analytics:',
                description: ' Open the "Analytics" tab in your Avatalk dashboard.',
                image: '/Carbon/manualview/analyse/1.PNG'
            },
            {
                title: 'Customize Your View:',
                description: 'Adjust the date range to analyze specific periods of activity.',
                image: '/Carbon/manualview/analyse/3.PNG'
            },
            {
                title: 'Review Key Metrics: ',
                description: 'Examine profile views, AR usage, chat interactions, and file clicks.',
                image: '/Carbon/manualview/analyse/2.PNG'
            },
            {
                title: 'Visualize Your Data:',
                description: `Use pie charts and bar graphs for a quick overview of your performance.`,
                image: '/Carbon/manualview/analyse/4.PNG'
            },                                                
        ],
         endSection: ` By leveraging Avatalk’s Analytics, you can continuously improve your networking strategy. Whether you're using the free or Pro version, these tools are essential for making informed decisions and ensuring that your digital interactions lead to meaningful connections.`,
        limitations: {
            free: " In the free version of Avatalk, you can access basic analytics such as profile views and limited AR usage statistics.  After this, the graphs will be blurred, limiting your ability to fully understand the data.",
            pro: "The Pro version provides a more comprehensive view, empowering you to optimize your networking strategy effectively. For more detailed insights, including advanced metrics and customizable data exports, upgrading to the Pro version is recommended."            
        }
    }                             
];

const ManualView = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const data: any = supportMenus.find((item) => item.key === id) || null;

    return (
        <>
            <div className={`Carbon-ChatDetails-container pb-[100px]`}>
                <div className="flex px-6 items-center space-x-4 absolute top-8">
                    <Button
                    onClick={() => navigate(-1)}
                    theme={`Carbon-back`}
                    >
                    <div className={`Carbon-back-Button-vector`}></div>
                    </Button>
                    <p className={`Carbon-ChatDetails-title`}>{data.title}</p>
                </div>
                <div className=" px-6 mt-[60px] hiddenScrollBar h-dvh overflow-y-scroll pb-[200px]  pt-[4px]">
                    <div className="text-[#374151] text-[14px] font-medium mt-4">{data.header}</div>
                    <div className="text-[#374151] text-[12px] mt-6 text-justify">{data.description}</div>
                    <div className="mt-3 grid gap-4">
                        {data.stepBySteps.map((el: any, index: number) => {
                            return (
                                <>
                                    <div key={el.title} className="flex  justify-between items-start">
                                        <div className="flex-grow mt-2 order-2">
                                            {el.title !="" &&
                                                <div className="text-[12px] font-semibold text-[#374151]">
                                                    {index + 1}. {el.title}
                                                </div>
                                            }
                                            <div className="text-justify mt-1 text-[#374151] text-[12px]">
                                                {el.description}
                                            </div>
                                        </div>
                                        {el.image!='' &&
                                            <div
                                                className={`min-w-[138px] mx-2 w-[40%] ${index % 2 != 0 ? 'order-first' : 'order-last'} `}>
                                                <img
                                                    src={el.image.length >= 1 ? el.image : "/icons/manual/Card-Fill-Preview.png"}
                                                    alt=""/>
                                            </div>
                                        }
                                    </div>

                                </>
                            )
                        })}

                    </div>
                    {data.limitations.pro &&
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
                    }
                    <div className="text-[#374151] text-[12px] mt-6 text-justify">{data.endSection}</div>
                </div>
            </div>
        </>
    )
}

export default ManualView