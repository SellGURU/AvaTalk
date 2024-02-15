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
      <div className=" h-[44px] flex justify-center  bg-slate-100 rounded-[21px] w-4/6  boxShadow-Gray">
        <div className="h-full flex items-center justify-start">
          <img src="../../../Carbon/Calendar-new.svg" className="w-6 h-6 " alt="" />
        </div>
        <Litepicker
          className="bg-slate-100 block w-56 "
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
