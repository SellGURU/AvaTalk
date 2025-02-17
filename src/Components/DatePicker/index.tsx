/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import Litepicker from "../../Litepicker";
import { useAuth } from "../../hooks/useAuth";
import useModalAutoClose from "../../hooks/useModalAutoClose";

const DatePicker = ({ day, setDay }: any) => {
  const context = useAuth();
  const [isOpen, setisOpen] = useState(true);
  const [isVisible] = useState(
    context.currentUser.type_of_account.getType() !== "Free"
  );
  const datepickerRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useModalAutoClose({
    refrence: datepickerRef,
    buttonRefrence: btnRef,
    close: () => setisOpen(true),
  });
  const handleDateChange = (value: string) => {
    const [startDateString, endDateString] = value.split(" - ");
    const newDates = {
      startDate: new Date(startDateString),
      endDate: new Date(endDateString),
    };
    setDay(newDates);
    localStorage.setItem("selectedDates", JSON.stringify(newDates));
  };

  return (
    <div className="flex mt-4 relative items-center">
      <div
        onClick={() => {
          if (isOpen) {
            document.getElementById("dataPicker")?.click();
          }
          setisOpen(!isOpen);
        }}
        className={`h-[44px] ${
          isVisible ? "" : "opacity-20"
        } flex justify-between rounded-[21px] w-full borderBox-GrayBox boxShadow-Gray`}
      >
        <div
          onClick={() => {
            // document.getElementById("dataPicker")?.click();
            // setisOpen(true);
            // setisOpen(!isOpen);
          }}
          className="h-full flex items-center justify-between w-full px-2"
        >
          <div className="flex justify-start items-center">
            <div
              className={`Carbon-Profile-EditProfileBtnVector6 px-3 Carbon-Footer-Vectors text-[#8290a3] w-6 h-6 ms-2`}
            ></div>

            <div ref={datepickerRef}>
              <Litepicker
                id="dataPicker"
                className="text-gray-700 z-50 text-sm min-w-[240px] lg:min-w-[230px] tracking-widest h w-full pl-2 bg-inherit cursor-pointer"
                value={`${day.startDate.toLocaleDateString()} - ${day.endDate.toLocaleDateString()}`}
                onChange={handleDateChange}
                options={{
                  autoApply: false,
                  format: "YYYY-MM-DD",
                  singleMode: false,
                  numberOfColumns: 1,
                  numberOfMonths: 1,
                  showWeekNumbers: true,
                  dropdowns: {
                    minYear: 1990,
                    maxYear: null,
                    months: true,
                    years: true,
                  },
                }}
              />
            </div>
          </div>
          <div
            className={`Carbon-Card-Vector me-2 cursor-pointer transition-transform ${
              isOpen ? "rotate-90" : "-rotate-90"
            } `}
          ></div>
        </div>
      </div>
      {!isVisible && (
        <div className="w-full h-full bg-[#5B21B626] absolute z-30 rounded-[25px] left-0 top-0"></div>
      )}
    </div>
  );
};

export default DatePicker;
