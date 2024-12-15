// SuccessModal.js
import React, { useRef } from "react";
import useModalAutoClose from "../../hooks/useModalAutoClose";
import { Button } from "symphony-ui";
type SuccessModalProps = {
  onClose: () => void;
};

export const SuccessModal: React.FC<SuccessModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useModalAutoClose({
    refrence: modalRef,
    buttonRefrence: buttonRef,
    close: () => {
      onClose();
    },
  });
  return (
    <div
      className="  fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 px-4"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className=" slideupModal w-[355px] h-[184px] rounded-3xl bg-white  relative flex items-center justify-center"
      >
        {/* <div
          ref={buttonRef}
          onClick={onClose}
          className="absolute right-3 top-3 p-2 rounded-full shadow-lg flex items-center justify-center"
        >
          <img src="./Carbon/Add.svg" alt="" />
        </div> */}
        <div className={"absolute right-3 top-3"}>
          <Button onClick={() => {
              onClose
          }} data-mode="profile-review-button-2" theme="Carbon-Google">
              <div className="Carbon-Profile-closeIcon Carbon-Footer-Vectors m-0 "></div>
          </Button>        

        </div>
        <div className=" mt-2 flex flex-col items-center gap-4 justify-center text-lg font-semibold text-[#374151]">
          <img src="./Carbon/tick-circle.svg" alt="" />
          Password Successfully Changed!
        </div>
      </div>
    </div>
  );
};
