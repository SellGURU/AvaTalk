/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "symphony-ui";

interface ConfirmProps {
    title:string
    content:string
    onClose:() =>void   
    onConfirm:() =>void
}

const Confirm: React.FC<ConfirmProps> = ({title,content,onClose,onConfirm}) => {
  const theme = 'Carbon'
  return (
    <>
        <div className={`${theme}-Cofirm-container`}>
        <div className={`${theme}-Cofirm-content`}>
            <p className={`${theme}-Cofirm-Cofirm`}>{title}</p>
            <p className={`${theme}-Cofirm-question`}>{content}</p>
        </div>
        <div className={`${theme}-Cofirm-buttonContainer`}>
            <Button onClick={onClose}  theme="Carbon-Outline">
            Cancel
            </Button>
            <Button onClick={() => {
            // onCompelete()
                onConfirm()
                onClose()
            }} theme="Carbon">
            Delete
            </Button>

        </div>
        </div>
    </>
  );
};

export default Confirm;
