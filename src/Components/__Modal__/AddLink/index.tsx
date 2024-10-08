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
    placeholder?: string;   
}
const validationSchema = Yup.object().shape({
    url:Yup.string().required(),
});

const AddSocials:React.FC<AddSocialsProps> = ({isOpen,name,value,title,onComplete,onAfterOpen,onClose,placeholder="https://www.example.com/",theme}) => {
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
            onRequestClose={() =>{
                formik.setFieldValue("name",'')
                formik.setFieldValue("url",'')
                onClose()
            }}
            style={{content:{borderRadius:'24px',width:'100%',maxWidth:'360px',background:'rgba(243, 244, 246, 1)'},overlay:{backgroundColor:'rgba(0,0,0,0.7)'}}}
            contentLabel="Example Modal"
        >
            <div className='flex w-full justify-between items-start'>
                <div>
                    <div className='text-gray-700 text-base font-semibold contactNameShadow'>{title}</div>
                    {/* <div className='text-gray-400 text-xs font-medium'>with Farzin Azami</div> */}
                </div>
                <Button onClick={() =>{
                    formik.setFieldValue("name",'')
                    formik.setFieldValue("url",'')
                    onClose()
                    }} theme='Carbon-back'>
                    <div className={`${theme}-Profile-closeIcon`}></div>
                </Button>
            </div>
            <div>
              <div className="my-4">
                <TextField  {...formik.getFieldProps("name")}  label={'Name'} placeholder="Website" theme="Carbon" name="name" type="text" errorMessage="" inValid={false} />
              </div>  
              <div className="my-4">
                <TextField  {...formik.getFieldProps("url")}  label={'URL'} placeholder={placeholder} theme="Carbon" name="url" type="text" errorMessage="" inValid={false} />
              </div>                 
              <Button disabled={!formik.isValid || !formik.values.url.includes('http')} onClick={() => {
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