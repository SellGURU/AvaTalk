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
  onDelete:() =>void
}

const DeleteContact: React.FC<AddContactProps> = ({ isOpen,onDelete, onAfterOpen, onClose, theme }) => {
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
          <div className={`${theme}-DeleteContact-container`}>
            <div className={`${theme}-DeleteContact-content`}>
              <p className={`${theme}-DeleteContact-deleteContact`}>Delete Contact</p>
              <p className={`${theme}-DeleteContact-question`}>Are you sure you want to delete this contact?</p>
            </div>
            <div className={`${theme}-DeleteContact-buttonContainer`}>
              <Button onClick={onClose} theme="Carbon-Outline">
                Cancel
              </Button>
              <Button onClick={onDelete} theme="Carbon">
                Delete
              </Button>

            </div>
          </div>
        </>
      </Modal>
    </>
  );
};

export default DeleteContact;
