/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "react-modal";

import "./index.scss";

import { Button } from "symphony-ui";

interface AddContactProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: string;
  onAfterOpen?: () => void;
  contactId: string | undefined;
}

const DeleteContact: React.FC<AddContactProps> = ({ isOpen, onAfterOpen, onClose }) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onAfterOpen={onAfterOpen}
        onRequestClose={onClose}
        style={{ content: { borderRadius: "24px", width: "100%", maxWidth: "450px", background: "rgba(255, 255, 255, 1)" }, overlay: { backgroundColor: "rgba(0,0,0,0.7)" } }}
        contentLabel="Example Modal"
      >
        <>
          <div className="h-[23vh] hiddenScrollBar  overflow-y-scroll">
            <div className="p-5">
              <div className="flex flex-col justify-center items-center">
                <p className="text-gray-700 pb-4  font-[600] text-[16px] leading-[24px]">Delete Contact</p>
                <p className="text-gray-700  font-[500] text-[14px] leading-[21px]">Are you sure you want to delete this Contact?</p>
              </div>
              <div className="mt-10 flex items-center space-x-3 px-10">
                <Button onClick={onClose} theme="Carbon-Delete">
                  Delete
                </Button>
                <Button onClick={onClose} theme="Carbon">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </>
      </Modal>
    </>
  );
};

export default DeleteContact;
