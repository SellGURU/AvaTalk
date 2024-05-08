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
    name:string
    onComplete:(name:string,value:string) =>void
    onAfterOpen?:() =>void    
}
const validationSchema = Yup.object().shape({
    url:Yup.string().required(),
});

const AddSocials:React.FC<AddSocialsProps> = ({isOpen,name,value,title,onComplete,onAfterOpen,onClose,theme}) => {
    const initialValue= {
        name:name?name:'',
        url:value? value :'',
    };
    
    const formik = useFormik({
        initialValues: initialValue,
        validationSchema,
        onSubmit: (values) => {
        console.log(values);
        },
    });
    useEffect(() => {
        formik.setFieldValue('name',name)
    },[name])   
    useEffect(() => {
        formik.setFieldValue('url',value)
    },[value])               
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
                <TextField  {...formik.getFieldProps("name")}  label={'Name'} placeholder="website" theme="Carbon" name="name" type="text" errorMessage="" inValid={false} />
              </div>  
              <div className="my-4">
                <TextField  {...formik.getFieldProps("url")}  label={'URL'} placeholder="https://facebook.com/" theme="Carbon" name="url" type="text" errorMessage="" inValid={false} />
              </div>                 
              <Button onClick={() => {
                onComplete(formik.values.name,formik.values.url)
                onClose()
                formik.setFieldValue('url','')
                formik.setFieldValue('name','')
                }} theme='Carbon'>save</Button>            
            </div>
        </Modal>        
        </>
    )
}

export default AddSocials