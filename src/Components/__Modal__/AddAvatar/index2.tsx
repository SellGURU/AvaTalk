/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutableRefObject } from 'react';
interface AddSocialsProps {
    isOpen: boolean;
    isCanRemove:boolean;
    onClose: () => void;
    value: string;
    refEl:MutableRefObject<HTMLDivElement|null>;
    title: string;
    theme?: string;
    name: string;
    onComplete: (res:string) => void;
    onTakePhoto:() => void
    onRemove:() => void
    onAfterOpen?: () => void;
}


const AddSocials: React.FC<AddSocialsProps> = ({ refEl,onTakePhoto,isCanRemove ,onRemove,onComplete}) => {

    const handleChooseFromLibrary = () => {
        // Programmatically trigger the file input click
        const fileInput = document.getElementById('file-input');
        if (fileInput) {
            fileInput.click();
        }
    };

    return (
        <> 
            <div ref={refEl} className='bg-white max-w-xl pb-6 rounded-t-[27px] px-10 w-full'>
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
                    // accept="*"
                     accept="image/*"
                    style={{ display: 'none' }}
                />
            </div>
            
        </>
    );
}

export default AddSocials;
