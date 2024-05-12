/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from 'react-modal';
interface AddSocialsProps {
    isOpen: boolean;
    isCanRemove:boolean;
    onClose: () => void;
    value: string;
    title: string;
    theme?: string;
    name: string;
    onComplete: (res:string) => void;
    onTakePhoto:() => void
    onRemove:() => void
    onAfterOpen?: () => void;
}


const AddSocials: React.FC<AddSocialsProps> = ({ isOpen,onTakePhoto,isCanRemove ,onRemove,onComplete,onAfterOpen, onClose,}) => {

    const handleChooseFromLibrary = () => {
        // Programmatically trigger the file input click
        const fileInput = document.getElementById('file-input');
        if (fileInput) {
            fileInput.click();
        }
    };

    return (
        <>
        
            <Modal
                isOpen={isOpen}
                onAfterOpen={onAfterOpen}
                onRequestClose={onClose}
                style={{
                    content: { borderRadius: '24px', width: '100%', maxWidth: '360px', background: 'rgba(243, 244, 246, 1)' },
                    overlay: { backgroundColor: 'rgba(0,0,0,0.7)' }
                }}
                contentLabel="Example Modal"
            >
                <div>
                    <div className="my-4 flex flex-col gap-5 font-medium text-sm">
                        <button className='flex items-center gap-2 cursor-pointer' onClick={handleChooseFromLibrary}>
                            <img className='w-8 h-8' src='./Carbon/gallery-import.svg' />
                            Choose From Library
                        </button>

                        <div onClick={onTakePhoto} className='flex  items-center gap-2 cursor-pointer'>
                            <img className='w-8 h-8' src='./Carbon/camera.svg' />
                            Take Photo
                        </div>
                        {
                            isCanRemove?
                                <div onClick={onRemove} className='flex items-center gap-2 cursor-pointer'>
                                    <img className='w-8 h-8' src='./Carbon/gallery-remove.svg' />
                                    Remove Photo
                                </div>
                            :
                            undefined
                        }
                    </div>
                    <input
                        id="file-input"
                        onChange={(res:any) => {
                            onComplete(res.target.files[0])
                        }}
                        className={`Carbon-ImageUploader-uploader-input`}
                        type="file"
                        accept="*"
                        style={{ display: 'none' }}
                    />
                </div>
            </Modal>
        </>
    );
}

export default AddSocials;
