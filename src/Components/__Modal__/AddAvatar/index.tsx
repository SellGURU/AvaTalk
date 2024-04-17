import Modal from 'react-modal';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useEffect, useState } from 'react';

interface AddSocialsProps {
    isOpen: boolean;
    onClose: () => void;
    value: string;
    title: string;
    theme?: string;
    name: string;
    onComplete: (name: string, value: string) => void;
    onAfterOpen?: () => void;
}

const validationSchema = Yup.object().shape({
    url: Yup.string().required(),
});

const AddSocials: React.FC<AddSocialsProps> = ({ isOpen, name, value, title, onComplete, onAfterOpen, onClose, theme }) => {
    const initialValue = {
        name: name ? name : '',
        url: value ? value : '',
    };

    const formik = useFormik({
        initialValues: initialValue,
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    useEffect(() => {
        formik.setFieldValue('name', name)
    }, [name]);

    useEffect(() => {
        formik.setFieldValue('url', value)
    }, [value]);

    const [avatarVideo, setAvatarVideo] = useState("");
    const [Cropper, setCropper] = useState("");

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

                        <div className='flex items-center gap-2 cursor-pointer'>
                            <img className='w-8 h-8' src='./Carbon/camera.svg' />
                            Take Photo
                        </div>

                        <div className='flex items-center gap-2 cursor-pointer'>
                            <img className='w-8 h-8' src='./Carbon/gallery-remove.svg' />
                            Remove Photo
                        </div>
                    </div>
                    <input
                        id="file-input"
                        onChange={(res: any) => {
                            setAvatarVideo("");
                            const reader = new FileReader();
                            reader.readAsDataURL(res.target.files[0]);
                            reader.onload = function () {
                                setCropper(reader.result as string);
                            };
                            reader.onerror = function (error) {
                                console.log("Error: ", error);
                            };
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
