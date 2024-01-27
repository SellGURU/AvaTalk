import Calendar from 'react-calendar';
import Modal from 'react-modal';
import { Button } from 'symphony-ui';

interface BookMarkProps {
    isOpen : boolean
    onClose: () => void
    theme?:string
    onAfterOpen?:() =>void
}

const BookMark:React.FC<BookMarkProps> = ({isOpen,onAfterOpen,onClose,theme}) => {
    return (
        <>
        <Modal
            isOpen={isOpen}
            onAfterOpen={onAfterOpen}
            onRequestClose={onClose}
            style={{content:{borderRadius:'24px'},overlay:{backgroundColor:'rgba(0,0,0,0.7)'}}}
            contentLabel="Example Modal"
        >
            <div className='flex w-full justify-between items-start'>
                <div>
                    <div className='text-gray-700 text-base font-semibold contactNameShadow'>Book a Meeting</div>
                    <div className='text-gray-400 text-xs font-medium'>with Farzin Azami</div>
                </div>
                <Button theme='Carbon-back'>
                    <div className={`${theme}-Profile-closeIcon`}></div>
                </Button>
            </div>

            <div>
                <Calendar onChange={() => {}} value={new Date()} />
            </div>
        </Modal>        
        </>
    )
}

export default BookMark