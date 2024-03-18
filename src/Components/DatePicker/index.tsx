import { useState } from "react";
import Litepicker from "../../Litepicker";
import { Button } from "symphony-ui";

const DatePicker = () => {
  const [day, setDay] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  return (
    <div className="flex mt-4 space-x-3  items-center ">
      <div className=" h-[44px] flex justify-center rounded-[21px] w-4/6 borderBox-GrayBox boxShadow-Gray ">
        <div className="h-full flex items-center justify-start">
          <img src="../../../Carbon/Calendar-new.svg" className="w-6 h-6 ms-2 " alt="" />
          <Litepicker
            className="text-gray-700 text-sm w-56 pl-1 bg-inherit cursor-pointer"
            value={`${day.startDate.toLocaleDateString()} - ${day.endDate.toLocaleDateString()}`}
            onChange={(value) => {
              const [startDateString, endDateString] = value.split(" - ");
              setDay({
                startDate: new Date(startDateString),
                endDate: new Date(endDateString),
              });
            }}
            options={{
              autoApply: false,
              format: "YYYY-MM-DD",
              singleMode: false,
              numberOfColumns: 1,
              numberOfMonths: 2,
              showWeekNumbers: true,
              dropdowns: {
                minYear: 1990,
                maxYear: null,
                months: true,
                years: true,
              },
            }}
          />
          <img src="../../../Carbon/leftVector.svg" className="w-4 h-4 me-2 -rotate-90 " alt="" />
        </div>

      </div>
      <div className=" w-2/6">
        <Button theme="Carbon">
          <div className="space-x-1 flex items-center">
            <img src="../../../Carbon/export.svg" alt="" />
            <p>Export</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default DatePicker;
