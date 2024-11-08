/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutableRefObject, useEffect, useState } from 'react';
import { User } from '../../../Model';
import { Button } from 'symphony-ui';
import { Auth } from '../../../Api';
import { useAuth } from '../../../hooks/useAuth';
import ConfettiExplosion from 'react-confetti-explosion';
interface ShowUserProps {
    isOpen: boolean;
    onClose: () => void;
    refEl:MutableRefObject<HTMLDivElement|null>;
    theme?: string;
    user:User
}


const ShowUser: React.FC<ShowUserProps> = ({ refEl,user,theme,onClose}) => {
    const auth = useAuth();
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
    console.log(socialsBox)
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
                            <div className='text-text-primary text-[18px] font-medium contactNameShadow'>{auth.currentUser.information?.firstName+'  '+auth.currentUser.information?.lastName}</div>
                                <div className={`text-text-primary ${auth.currentUser.information?.company && auth.currentUser.information?.job ? 'visible':'invisible'} mt-1 text-center text-xs flex justify-start items-center `}>{auth.currentUser.information?.job}
                                    {" @ "}  
                                    <span className='ml-1'>
                                        <img className={`w-[16px] ${auth.currentUser.information?.logo?'block':'hidden'} h-[16px]`} src={auth.currentUser.information?.logo} alt="" />
                                    </span>
                                    {auth.currentUser.information?.company}
                                </div>
                        </div>
                        <div className="invisible">
                            <Button onClick={onClose} theme="Carbon-back">
                                <div className={`${theme}-back-Button-vector`}></div>
                            </Button>
                        </div>
                    </div>
                    <div className="my-4 flex flex-col gap-5 font-medium text-sm">
                    {user?.information?.phone ?
                        <a      href={`tel:${user?.information?.phone}`}
                        className={`${theme}-ContactDetails-container5`}>
                        <div className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}>
                            <div className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-phoneIcon ${theme}-ContactDetails-ActiveVectors`}></div>
                        </div>
                        <p className={`${theme}-ContactDetails-textItem cursor-pointer`}>{user?.information?.phone}</p>
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
                    {user?.boxs.filter((el) =>el.getTypeName() == 'MeetingBox').length>0 ?
                        <a  
                        href={mettingBox.getUrl()}
                        className={`${theme}-ContactDetails-container5 `}>
                        <div className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}>
                            <div className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-calendarIcon  ${theme}-ContactDetails-ActiveVectors`}></div>
                        </div>
                        <p className={`${theme}-ContactDetails-textItem cursor-pointer`}>{mettingBox.getUrl().substring(0,50)}</p>
                        </a>
                    :undefined}    
                    {user?.boxs.filter((el) =>el.getTypeName() == 'SocialBox').length>0 ?
                        <a  
                        className={`${theme}-ContactDetails-container5 `}>
                        <div className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}>
                            <div className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-share  ${theme}-ContactDetails-ActiveVectors`}></div>
                        </div>
                        {
                            socialsBox.resolveShowProfileRender("Carbon")
                        }
                        {/* <p className={`${theme}-ContactDetails-textItem cursor-pointer`}>{mettingBox.getUrl().substring(0,50)}</p> */}
                        </a>
                    :undefined}                                                                 
                    <Button onClick={() => {
                        const contact = {
                            name: user.information?.lastName as string,
                            phone: user.information?.phone as string,
                            email: user.information?.personlEmail as string ,
                            company:user.information?.company as string,
                            address:user.information?.address as string,
                            job:user.information?.job as string,
                        };

                        // create a vcard file
                        const vcard = "BEGIN:VCARD\nVERSION:4.0\nFN:" + contact.name + "\nTEL;TYPE=work,voice:" + contact.phone + "\nCOMPANY:" + contact.company + "JOB:" + contact.job + "ADDRESS:" + contact.address + "\nEMAIL:" + contact.email + "\nEND:VCARD";
                        const blob = new Blob([vcard], { type: "text/vcard" });
                        const url = URL.createObjectURL(blob);

                        const newLink = document.createElement('a');
                        newLink.download = contact.name + ".vcf";
                        newLink.textContent = contact.name;
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
                        <Button  onClick={() => {
                        onClose()
                        setStep(0)
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
