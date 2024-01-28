import Calendar from 'react-calendar';
import Modal from 'react-modal';
import { Button } from 'symphony-ui';
import './index.scss';

interface BookMarkProps {
    isOpen : boolean
    onClose: () => void
    theme?:string
    onAfterOpen?:() =>void
}

const BookMark:React.FC<BookMarkProps> = ({isOpen,onAfterOpen,onClose,theme}) => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    return (
        <>
        <Modal
            isOpen={isOpen}
            onAfterOpen={onAfterOpen}
            onRequestClose={onClose}
            style={{content:{borderRadius:'24px',width:'100%',maxWidth:'360px',background:'rgba(243, 244, 246, 1)'},overlay:{backgroundColor:'rgba(0,0,0,0.7)'}}}
            contentLabel="Example Modal"
        >
            <div className='flex w-full justify-between items-start'>
                <div>
                    <div className='text-gray-700 text-base font-semibold contactNameShadow'>Book a Meeting</div>
                    <div className='text-gray-400 text-xs font-medium'>with Farzin Azami</div>
                </div>
                <Button onClick={onClose} theme='Carbon-back'>
                    <div className={`${theme}-Profile-closeIcon`}></div>
                </Button>
            </div>

            <div className='mt-4'>
                <Calendar formatShortWeekday={(_locale, date) => days[date.getDay()]} onChange={() => {}} value={new Date()} />
            </div>
            <div className='w-full mt-[27px]'>
                <div className='flex justify-start'>
                    <img src="./Carbon/global.svg" alt="" />
                    <div className='text-sm font-medium text-gray-700 ml-2'>Time Zone</div>
                </div>
                <div className='mt-[8px] flex justify-between items-center'>
                    <div className='text-gray-400 text-sm'>Eastern Time - US & Canada (3:51 pm)</div>
                    <img className='' src="./Carbon/bottomVector.svg" alt="" />
                </div>
            </div>
        </Modal>        
        </>
    )
}

export default BookMark