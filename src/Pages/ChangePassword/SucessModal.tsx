// SuccessModal.js
import React, { useRef } from "react";
import useModalAutoClose from "../../hooks/useModalAutoClose";
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
        <div
          ref={buttonRef}
          onClick={onClose}
          className="absolute right-3 top-1 p-2 rounded-full shadow-lg flex items-center justify-center"
        >
          <img src="./Carbon/Add.svg" alt="" />
        </div>
        <div className=" mt-2 flex flex-col items-center gap-4 justify-center text-lg font-semibold text-[#374151]">
          <img src="./Carbon/tick-circle.svg" alt="" />
          Password Successfully Changed!
        </div>
      </div>
    </div>
  );
};
