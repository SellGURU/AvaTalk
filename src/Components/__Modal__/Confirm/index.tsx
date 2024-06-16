/* eslint-disable @typescript-eslint/no-explicit-any */

import { MutableRefObject } from "react";
import { Button } from "symphony-ui";
import useModalAutoClose from "../../../hooks/useModalAutoClose";

interface ConfirmProps {
    title:string
    refrence:MutableRefObject<HTMLDivElement | null>
    content:string
    onClose:() =>void   
    onConfirm:() =>void
}

const Confirm: React.FC<ConfirmProps> = ({title,content,refrence,onClose,onConfirm}) => {
  const theme = 'Carbon'
  useModalAutoClose({
    refrence:refrence,
    close:() => {
        onClose()
    }
  })
  return (
    <>
        <div ref={refrence} className={`${theme}-Cofirm-container`}>
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
