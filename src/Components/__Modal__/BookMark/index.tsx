/* eslint-disable @typescript-eslint/no-explicit-any */
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import { Button } from 'symphony-ui';
import './index.scss';
import { useState } from 'react';
import { BackIcon, TextArea, TextField } from '../..';
import TimezoneSelect, { type ITimezone } from 'react-timezone-select'
import { toast } from 'react-toastify';

interface BookMarkProps {
    isOpen : boolean
    onClose: () => void
    theme?:string
    onAfterOpen?:() =>void
}

const BookMark:React.FC<BookMarkProps> = ({isOpen,onAfterOpen,onClose,theme}) => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const [step,setStep] = useState(1)
    const [times] = useState([
        {
            title:'09:00 am'
        },
        {
            title:'09:30 am'
        },
        {
            title:'10:00 am'
        },
        {
            title:'10:30 am'
        },
        {
            title:'11:00 am'
        },
        {
            title:'11:30 am'
        },
        {
            title:'12:00 pm'
        },
        {
            title:'12:30 pm'
        }                                                           
    ])
    const [selectedTimezone, setSelectedTimezone] = useState<ITimezone>(
        Intl.DateTimeFormat().resolvedOptions().timeZone
    )    
    const [time,selectTime] = useState<any>(null)
    const [day,selectedDay] = useState(new Date())
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [detail,setDetail] = useState('')
    return (
        <>
        <Modal
            isOpen={isOpen}
            onAfterOpen={onAfterOpen}
            onRequestClose={() => {
                setStep(1)
                onClose()
                selectTime(null)
            }}
            style={{content:{borderRadius:'24px',width:'100%',maxWidth:'360px',maxHeight:'550px',background:'rgba(243, 244, 246, 1)'},overlay:{backgroundColor:'rgba(0,0,0,0.7)'}}}
            contentLabel="Example Modal"
        >
   
            <div className='flex w-full justify-between items-start'>
            {
                step == 1 ?
                    <div>
                        <div className='text-gray-700 text-base font-semibold contactNameShadow'>Book a Meeting</div>
                        <div className='text-gray-400 text-xs font-medium'>with Farzin Azami</div>
                    </div>
                :
                <>
                    <div className='relative'>
                        <BackIcon action={() => {
                            setStep(step -1)
                        }} dataMode='modal' title='' theme='Carbon'></BackIcon>
                    </div>
                </>
            }                 
                
                <Button onClick={onClose} theme='Carbon-back'>
                    <div className={`${theme}-Profile-closeIcon`}></div>
                </Button>
            </div>
            {step == 1 ?
                <>
                    <div className='w-full mt-[27px] px-4'>
                        {/* <div className='flex justify-start'>
                            <img src="./Carbon/global.svg" alt="" />
                            <div className='text-sm font-medium text-gray-700 ml-2'>Time Zone</div>
                        </div>
                        <div className='mt-[8px] flex justify-between items-center'>
                            <div className='text-gray-400 text-sm'>Eastern Time - US & Canada (3:51 pm)</div>
                            <img className='' src="./Carbon/bottomVector.svg" alt="" />
                        </div> */}
                        <TimezoneSelect 

                        value={selectedTimezone}
                        onChange={setSelectedTimezone}
                        />
                    </div>
                    <div className='mt-4'>
                        <Calendar formatShortWeekday={(_locale, date) => days[date.getDay()]} onChange={(e) => {
                            selectedDay(e as Date)
                            setTimeout(() => {
                                setStep(2)
                            }, 1000);
                        }} value={day} />
                    </div>

                </>
            :
            undefined
            }
            {
                step == 2 ?
                    <>
                        <div className='w-full mt-[27px] px-4'>
                            {/* <div className='flex justify-start'>
                                <img src="./Carbon/global.svg" alt="" />
                                <div className='text-sm font-medium text-gray-700 ml-2'>Time Zone</div>
                            </div>
                            <div className='mt-[8px] flex justify-between items-center'>
                                <div className='text-gray-400 text-sm'>Eastern Time - US & Canada (3:51 pm)</div>
                                <img className='' src="./Carbon/bottomVector.svg" alt="" />
                            </div> */}
                            <TimezoneSelect 

                            value={selectedTimezone}
                            onChange={setSelectedTimezone}
                            />
                        </div>           
                        <div className='border py-5 rounded-[27px] mt-5 px-4 border-white w-full'>
                            <div className='text-center text-gray-700 text-base'>Select a Time</div>
                            <div className='flex justify-center mt-4'>
                                <div>
                                    <div className='grid grid-cols-2 mb-4 justify-between gap-x-4 gap-y-2'>
                                        {
                                            times.map((item) => {
                                                return (
                                                    <>
                                                        <div onClick={() => {
                                                            selectTime(item)
                                                        }} className={` ${time?.title == item.title ? 'Carbon-ShareContact-CardItems-active':'Carbon-ShareContact-CardItems'}`}>{item.title}</div>
                                                    </>
                                                )
                                            })
                                        }

                                    </div>
                                    {time!= null ?
                                        <Button onClick={() => {
                                            setStep(3)
                                        }} theme='Carbon'>Continue</Button>
                                    :undefined}
                                </div>
                            </div>
                        </div>     
                    </>
                :undefined
            }
            {
                step == 3 ?
                    <>
                        <div className='w-full mt-[27px] px-4'>
                            <div>
                                <div className='flex justify-start items-center mb-2'>
                                    <div className='bookMarkLayoutIcon global-Icons ' />
                                    <div className='text-xs font-medium text-gray-500 ml-2'>Eastern Time - US & Canada</div>
                                </div>
                                <div className='flex justify-start items-center'>
                                    <div className='bookMarkLayoutIcon calender-Icons'></div>
                                    <div className='text-xs font-medium text-gray-500 ml-2'>12:00 pm - 12:30 pm, Tursday, January 17, 2024</div>
                                </div>
                            </div>
                        </div>              
                        <div className='border py-5 rounded-[27px] mt-5 px-4 border-white w-full'>
                            <div className='text-center text-gray-700 text-base'>More Details</div>
                            <div className='flex justify-center mt-4'>
                                <div className='w-full'>
                                    <div className='mb-3'>
                                        <TextField inValid={false} placeholder='Enter your full name...' name={name} label='Name' required onBlur={() => {}} onChange={(e) =>{setName(e.target.value)}} type='text' value={name} theme='Carbon'></TextField>
                                    </div>
                                    <div className='mb-3'>
                                        <TextField inValid={false} placeholder='Enter your email address...' name='Email' label='Email' required onBlur={() => {}} onChange={(e) =>{setEmail(e.target.value)}} type='email' value={email} theme='Carbon'></TextField>
                                    </div>
                                    <div className='mb-4'>
                                        <TextArea inValid={false} placeholder='Write details to prepare our meeting  ...' name='Details' label='Details' theme='Carbon' textAreaHeight='136px' onBlur={() => {}} onChange={(e) =>{setDetail(e.target.value)}} value={detail}></TextArea>
                                    </div>
                                    <Button onClick={() => {
                                        toast.success("Booked Successfully!")
                                        onClose()
                                    }} theme='Carbon'>Book Meeting</Button>
                                </div>
                            </div>
                        </div>    
                    </>
                :undefined
            }
        </Modal>        
        </>
    )
}

export default BookMark