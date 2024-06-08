/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutableRefObject } from 'react';
import { User } from '../../../Model';
import { Button } from 'symphony-ui';
import { Auth } from '../../../Api';
interface ShowUserProps {
    isOpen: boolean;
    onClose: () => void;
    refEl:MutableRefObject<HTMLDivElement|null>;
    theme?: string;
    user:User
}


const ShowUser: React.FC<ShowUserProps> = ({ refEl,user,theme,onClose}) => {


    return (
        <> 
            <div ref={refEl} className='bg-white overflow-hidden max-w-xl pb-6 rounded-t-[27px] px-10 w-full'>
                <div className='w-full flex justify-center my-4'>
                    <div className='w-[64px] h-[4px] bg-[#CBD5E1] rounded-full'></div>
                </div>
                <div className='w-full flex text-base font-semibold justify-center'>{user.information?.firstName +' '+user.information?.lastName}</div>
                <div className="my-4 flex flex-col gap-5 font-medium text-sm">
                {user?.information?.phone ?
                    <div className={`${theme}-ContactDetails-container5`} onClick={() => {
                        window.open(user?.information?.phone); 
                        }}>
                    <div className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}>
                        <div className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-phoneIcon ${theme}-ContactDetails-ActiveVectors`}></div>
                    </div>
                    <p className={`${theme}-ContactDetails-textItem cursor-pointer`}>{user?.information?.phone}</p>
                    </div>
                :undefined}
                {user?.information?.personlEmail ?
                    <div className={`${theme}-ContactDetails-container5`} onClick={() => {
                        window.open(user?.information?.personlEmail); 
                        }}>
                    <div className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}>
                        <div className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-emailIcon ${theme}-ContactDetails-ActiveVectors`}></div>
                    </div>
                    <p className={`${theme}-ContactDetails-textItem cursor-pointer`}>{user?.information?.personlEmail}</p>
                    </div>
                :undefined}    
                <Button onClick={() => {
                      const contact = {
                        name: user.information?.lastName as string,
                        phone: user.information?.phone as string,
                        email: user.information?.personlEmail as string };

                      // create a vcard file
                      const vcard = "BEGIN:VCARD\nVERSION:4.0\nFN:" + contact.name + "\nTEL;TYPE=work,voice:" + contact.phone + "\nEMAIL:" + contact.email + "\nEND:VCARD";
                      const blob = new Blob([vcard], { type: "text/vcard" });
                      const url = URL.createObjectURL(blob);

                      const newLink = document.createElement('a');
                      newLink.download = contact.name + ".vcf";
                      newLink.textContent = contact.name;
                      newLink.href = url;
                      Auth.addEvent({
                        event_type:'add_contact',
                        sub_event_category:'share_link',
                        userid:user.information?.userId as string
                      })
                      newLink.click();              
                      onClose()         
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
            </div>
            
        </>
    );
}

export default ShowUser;
