/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutableRefObject, useEffect, useState } from 'react';
import { User } from '../../../Model';
import { Button } from 'symphony-ui';
import { Auth } from '../../../Api';
// import { useAuth } from '../../../hooks/useAuth';
import ConfettiExplosion from 'react-confetti-explosion';
import TooltipText from '../../TooltipText';
interface ShowUserProps {
    isOpen: boolean;
    onClose: () => void;
    refEl:MutableRefObject<HTMLDivElement|null>;
    theme?: string;
    user:User
    mode?:string
}

const createVCard = (contact:any) => {
  return `
BEGIN:VCARD
VERSION:2.1
N:${contact.lastName};${contact.firstName}
FN:${contact.firstName} ${contact.lastName}
EMAIL:${contact.email}
TEL:${contact.phone}
URL:${contact.url}
${contact.socialProfiles.twitter ? `URL:${contact.socialProfiles.twitter}` : ""}
${contact.socialProfiles.linkedin ? `URL:${contact.socialProfiles.linkedin}` : ""}
${contact.socialProfiles.instagram ? `URL:${contact.socialProfiles.instagram}` : ""}
END:VCARD
  `.trim();
};
const ShowUser: React.FC<ShowUserProps> = ({ refEl,mode,user,theme,onClose}) => {
    // const auth = useAuth();
    const [step,setStep] = useState(0)
    const [explotaion,setExplotaion] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setExplotaion(true)
        }, 1200);
    })
    // const userInfo=useAuth();

    const mettingBox:any = user?.boxs.filter((el) =>el.getTypeName() == 'MeetingBox')[0]
    const socialsBox:any = user?.boxs.filter((el) =>el.getTypeName() == 'SocialBox')[0]
    return (
        <> 
         <div ref={refEl} className="rounded-[27px] px-6 py-6 max-w-[32rem] h-auto max-h-[678px] pb-10 rounded-b-none slideupModal  bg-white w-full">
            {step == 0 ?
                <>
                    <div className='flex w-full pt-6 justify-between items-start'>
                        <Button onClick={onClose} theme="Carbon-back">
                            <div className={`${theme}-back-Button-vector`}></div>
                        </Button>
                        <div>
                            <div className='text-text-primary text-[18px] font-medium contactNameShadow'>{user.information?.firstName+'  '+user.information?.lastName}</div>
                                <div className={`text-text-primary ${user.information?.company && user.information?.job ? 'visible':'invisible'} mt-1 text-center text-xs flex justify-center items-center `}>{
                                <TooltipText tooltipValue={user.information?.job as string}>
                                    <>
                                        user.information?.job
                                    </>
                                </TooltipText>
                                }
                                    {" @ "}  
                                    <span className='ml-1'>
                                        <img className={`w-[16px] ${user.information?.logo?'block':'hidden'} h-[16px]`} src={user.information?.logo} alt="" />
                                    </span>
                                    {user.information?.company}
                                </div>
                        </div>
                        <div className="invisible">
                            <Button onClick={onClose} theme="Carbon-back">
                                <div className={`${theme}-back-Button-vector`}></div>
                            </Button>
                        </div>
                    </div>
                    <div className="my-4 flex flex-col gap-5 font-medium text-sm">

                    <a href={'https://portal.avatalk.me'+user?.resolveLink()}
                    className={`${theme}-ContactDetails-container5`}>
                    <div className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}>
                        <div className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-avatalkIcon ${theme}-ContactDetails-ActiveVectors`}></div>
                    </div>
                    <p className={`${theme}-ContactDetails-textItem cursor-pointer`}>{'portal.avatalk.me'+user?.resolveLink()}</p>
                    </a>
                
                    {user?.information?.phone ?
                        <a      href={`tel:+${user?.information?.phone}`}
                        className={`${theme}-ContactDetails-container5`}>
                        <div className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}>
                            <div className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-phoneIcon ${theme}-ContactDetails-ActiveVectors`}></div>
                        </div>
                        <p className={`${theme}-ContactDetails-textItem cursor-pointer`}>{'+'+user?.information?.phone}</p>
                        </a>
                    :undefined}
                    {user?.information?.personlEmail ?
                        <a       href={`mailto:${user?.information?.personlEmail}`}
                        className={`${theme}-ContactDetails-container5`}>
                        <div className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}>
                            <div className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-emailIcon ${theme}-ContactDetails-ActiveVectors`}></div>
                        </div>
                        <p className={`${theme}-ContactDetails-textItem cursor-pointer`}>{user?.information?.personlEmail}</p>
                        </a>
                    :undefined}   
                    {user?.information?.address ?
                        <a  
                        className={`${theme}-ContactDetails-container5 `}>
                        <div className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}>
                            <div className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-locationIcon ${theme}-ContactDetails-ActiveVectors`}></div>
                        </div>
                        <p className={`${theme}-ContactDetails-textItem cursor-pointer`}>{user?.information?.address}</p>
                        </a>
                    :undefined}      
                    {user?.boxs.filter((el) =>el.getTypeName() == 'MeetingBox').length>0 && mettingBox.getUrl()!=''?
                        <a  
                        href={mettingBox.getUrl()}
                        className={`${theme}-ContactDetails-container5 `}>
                        <div className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}>
                            <div className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-calendarIcon  ${theme}-ContactDetails-ActiveVectors`}></div>
                        </div>
                        <p className={`${theme}-ContactDetails-textItem cursor-pointer`}>{mettingBox.getUrl().substring(0,50)}</p>
                        </a>
                    :undefined}    
                    {user?.boxs.filter((el) =>el.getTypeName() == 'SocialBox').length>0 && socialsBox.getSocialMedias().length>0 ?
                        <a  
                        className={`${theme}-ContactDetails-container5 `}>
                            <div className='flex justify-center w-full'>
                                {
                                    socialsBox.resolveShowProfileRender("Carbon")
                                }

                            </div>
                        {/* <p className={`${theme}-ContactDetails-textItem cursor-pointer`}>{mettingBox.getUrl().substring(0,50)}</p> */}
                        </a>
                    :undefined}                                                                 
                    <Button onClick={() => {
                        const socialProfiles:any ={
                        }
                        if(socialsBox){
                            socialsBox.getSocialMedias().map((el:any) => {
                                if(el.type =='LinkedIn'){
                                    socialProfiles.linkedin = el.value
                                }
                                if(el.type =='Instagram'){
                                    socialProfiles.instagram = el.value
                                }  
                                if(el.type =='Facebook'){
                                    socialProfiles.facebook = el.value
                                }     
                                if(el.type =='Youtube'){
                                    socialProfiles.youtube = el.value
                                }    
                                if(el.type =='Telegram'){
                                    socialProfiles.telegram = el.value
                                }                                                                                                                                                                      
                            })
                        }
                        const contact = {
                            lastName:user.information?.lastName,
                            firstName: user.information?.firstName as string,
                            phone: user.information?.phone as string,
                            email: user.information?.personlEmail as string ,
                            url:'https://portal.avatalk.me'+user?.resolveLink(),
                            company:user.information?.company as string,
                            address:user.information?.address as string,
                            job:user.information?.job as string,
                            socialProfiles: socialProfiles                            
                        };

                        // create a vcard file
                        const vcard = createVCard(contact)
                        const blob = new Blob([vcard], { type: "text/vcard" });
                        const url = URL.createObjectURL(blob);

                        const newLink = document.createElement('a');
                        newLink.download = contact.firstName+contact.lastName + ".vcf";
                        newLink.textContent = contact.firstName;
                        newLink.href = url;
                        Auth.addEvent({
                            event_type:'save_contact',
                            sub_event_category:'view_link',
                            userid:user.information?.userId as string
                        })
                        newLink.click();     
                        setStep(1)     
                        setExplotaion(true)    
                        // onClose()         
                    }} theme='Carbon'>Save Contact</Button>                          
                    </div>
                </>
            :
                <>
                    <div>
                    <div className='flex pt-4 w-full justify-between items-center'>
                        <div className="invisible">
                            <Button onClick={() => {
                            setStep(0)
                            onClose()
                            }} theme="Carbon-back">
                                <div className={`${theme}-Profile-closeIcon`}></div>
                            </Button>
                        </div>
                        <div>
                            <div className='text-text-primary text-[14px] font-semibold contactNameShadow'>Contact Saved!</div>
                        </div>
                        <div className="z-30">
                            <Button onClick={onClose} theme="Carbon-back">
                                <div className={`${theme}-Profile-closeIcon`}></div>
                            </Button>
                        </div>

                    </div>
                    <div className="text-[14px] font-medium mt-6 text-center text-text-primary">
                        Want to manage your network this easily? Activate your free Avatalk trial and take control
                    </div>
                    <div className="w-full flex justify-center mt-5">
                        <div className="w-[240px] h-[368px] bg-primary-color rounded-[30px]">
                        <div className="w-full flex justify-center mt-4">
                            <img className="ml-[-30px]" src="./icons/CardProf2.png" alt="" />
                        </div>
                        <div>
                            <div className="text-white text-[18px] font-semibold  text-center">Your Name</div>
                            <div className="text-white text-[12px] font-medium opacity-85  text-center">Job Title/ Company</div>
                        </div>
                        <div className="w-full flex justify-center mt-4">
                            <img src="./icons/qrcode.png" alt="" />
                        </div>
                        </div>
                        { explotaion &&
                            <ConfettiExplosion onEnded={() => {
                                setExplotaion(false)
                            }} zIndex={40} />
                        }
                    </div>
                    <div className='absolute w-full flex justify-center pt-28 top-0 left-0'>
                        <img className='' src="./icons/illo.png" alt="" />
                    </div>
                    <div className="mt-10 mb-4">
                        <Button disabled={mode!='share'} onClick={() => {
                        onClose()
                        setStep(0)
                        window.open('https://portal.avatalk.me/')
                        }} theme="Carbon">
                        <div >Create Your Avatalk for Free</div>
                        </Button>
                    </div>
                    </div>                     
                </>
            }
         </div>
            
        </>
    );
}

export default ShowUser;
