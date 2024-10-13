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
    console.log("user",user)
    return (
        <> 
            <div ref={refEl} className='bg-white overflow-hidden max-w-xl pb-6 rounded-t-[27px] px-10 w-full'>
                {step == 0 ?
                    <>
                        <div className='flex w-full pt-6 justify-between items-start'>
                            <Button onClick={onClose} theme="Carbon-back">
                                <div className={`${theme}-back-Button-vector`}></div>
                            </Button>
                            <div>
                                <div className='text-text-primary text-[18px] font-medium contactNameShadow'>{auth.currentUser.information?.firstName+'  '+auth.currentUser.information?.lastName}</div>
                                <div className='text-text-primary mt-1 text-center text-xs flex justify-start items-center '>{auth.currentUser.information?.job}
                                     {" @ "}  
                                    <span className='ml-1'>
                                        <img className='w-[16px] h-[16px]' src={auth.currentUser.information?.logo} alt="" />
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
                            {/* <button className='flex items-center gap-2 cursor-pointer' onClick={handleChooseFromLibrary}>
                                <img className='w-8 h-8' src='./Carbon/gallery-import.svg' />
                                Choose From Library
                            </button>

                            <div className='flex  items-center gap-2 cursor-pointer'>
                                <img className='w-8 h-8' src='./Carbon/camera.svg' />
                                Take Photo
                            </div> */}
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
                                <img className="ml-[-30px]" src="./icons/CardProf.png" alt="" />
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
                            {/* <div className="text-[12px] text-[#6B7280] text-center mt-2 mb-5">We don’t sell your contact details</div> */}
                        </div>
                        </div>                     
                    </>
                }
                {/* <div className='w-full flex text-base font-semibold justify-center'>{user.information?.firstName +' '+user.information?.lastName}</div> */}
            </div>
            
        </>
    );
}

export default ShowUser;
