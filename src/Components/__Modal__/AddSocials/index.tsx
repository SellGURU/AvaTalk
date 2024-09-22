import Modal from 'react-modal';
import { Button } from 'symphony-ui';
import { TextField } from '../..';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useEffect } from 'react';

interface AddSocialsProps {
    isOpen : boolean
    onClose: () => void
    value:string
    title:string
    theme?:string
    label?:string
    onComplete:(url:string) =>void
    onAfterOpen?:() =>void    
}
const urlPatterns = {
  youtube: /^(https:\/\/(www\.)?youtube\.com\/|https:\/\/youtu\.be\/).+$/,
  linkedIn: /^https:\/\/(www\.)?linkedin\.com\/.+$/,
  instagram: /^https:\/\/(www\.)?instagram\.com\/.+$/,
  twitter: /^https:\/\/(www\.)?twitter\.com\/.+$/,
  facebook: /^https:\/\/(www\.)?facebook\.com\/.+$/,
  telegram: /^(https:\/\/t\.me\/([a-zA-Z0-9_]{5,32})|https:\/\/t\.me\/joinchat\/[a-zA-Z0-9_-]+)$/,
};




const AddSocials:React.FC<AddSocialsProps> = ({isOpen,value,title,onComplete,onAfterOpen,onClose,theme}) => {
    const initialValue= {
        url:value? value :'',
    };
    const validateUrl = (url: string | undefined) => {
        if(title == 'LinkedIn'){
            return Yup.string().matches(urlPatterns.linkedIn, "Invalid linkedin URL").isValidSync(url)
        }
        if(title == 'Instagram'){
            return Yup.string().matches(urlPatterns.instagram, "Invalid instagram URL").isValidSync(url)
        }
        if(title == 'Facebook'){
            return Yup.string().matches(urlPatterns.facebook, "Invalid facebook URL").isValidSync(url)
        }
        if(title == 'Twitter/ X'){
            return Yup.string().matches(urlPatterns.twitter, "Invalid Twitter/ X URL").isValidSync(url)
        }
        if(title == 'Youtube'){
            return Yup.string().matches(urlPatterns.youtube, "Invalid Youtube URL").isValidSync(url)
        }    
        if(title == 'Telegram'){
            return Yup.string().matches(urlPatterns.telegram, "Invalid Telegram URL").isValidSync(url)
        }                                        
        return Yup.string().isValidSync(url)
    };    
    const validationSchema = Yup.object().shape({
        url:Yup.string().required().test("url",(value) => {
            return validateUrl(value)
        }),
    });
    const formik = useFormik({
        initialValues: initialValue,
        validationSchema,
        onSubmit: (values) => {
        console.log(values);
        },
    });
    useEffect(() => {
        formik.setFieldValue("url",value)
    },[value])          
    const resolvePlaceholder =() => {
        if(title == 'Linkedin') {
            return 'https://linkedin.com/username'
        }
        if(title == 'Twitter/ X'){
            return 'https://twitter.com/username'
        }
        if(title == 'Facebook'){
            return 'https://facebook.com/username'
        }
        if(title == 'Instagram'){
            return 'https://instagram.com/username'
        }
        if(title == 'Telegram'){
            return 'https://t.me/username'
        }        
        return 'https://youtu.be/username'
    }   
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
                    <div className='text-gray-700 text-base font-semibold contactNameShadow'>{title}</div>
                    {/* <div className='text-gray-400 text-xs font-medium'>with Farzin Azami</div> */}
                </div>
                <Button onClick={onClose} theme='Carbon-back'>
                    <div className={`${theme}-Profile-closeIcon`}></div>
                </Button>
            </div>
            <div>
              <div className="my-4">
                <TextField  {...formik.getFieldProps("url")}  label={'URL'} placeholder={resolvePlaceholder()} theme="Carbon" name="url" type="text" errorMessage="" inValid={false} />
              </div>    
              <Button disabled={formik.values.url?.length == 0 || !formik.isValid} onClick={() => {
                formik.setFieldValue('url','')
                onClose()
                onComplete(formik.values.url)
                }} theme='Carbon'>save</Button>            
            </div>
        </Modal>        
        </>
    )
}

export default AddSocials