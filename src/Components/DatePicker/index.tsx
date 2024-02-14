import { useState } from "react";
import Litepicker from "../../Litepicker";
import { Button } from "symphony-ui";

const DatePicker = () => {
  const [day] = useState();
  return (
    <div className="flex mt-4 space-x-3  items-center ">
      {/* <div className="h-10 px-3 cursor-pointer bg-white ml-2 rounded-md w-56 flex items-center" style={{
          border: "1px solid rgba(0, 0, 0, 0.1)",
        }}>
          <div className="flex mr-[14px]">
            <img style={{width:'13px',marginRight:'10px'}} src="./icons/date.svg" />
            <div className="bg-[#00000080] opacity-40 h-10 w-[1px]"></div>
          </div>
       
        </div> */}
      <div className=" h-[44px] flex justify-center  bg-slate-100 rounded-[21px] w-4/6  boxShadow-Gray">
        <div className="h-full flex items-center justify-start">
          <img src="../../../Carbon/Calendar-new.svg" className="w-6 h-6 " alt="" />
        </div>
        <Litepicker
          className="bg-slate-100 "
          value={day}
          // onChange={(value) => {
          //   setDay(value);
          //   // console.log(value)
          //   setReports([]);
          //   setOverViewList([]);
          //   report.show(getCurrentBotId(), value?.split(" - ")[0], value?.split(" - ")[1], (res) => {
          //     setReports(res.data.reports);
          //     // setOverViewList(res.data.overview);
          //     // setMassageVolumeChart(
          //     //   res.data.reports.filter((item: any) => item.name == "Message Volume")[0]
          //     // );
          //     setCxTrends(res.data.reports.filter((item: any) => item.name == "Reason For Requests")[0].value.data);
          //   });
          //   report.overview(getCurrentBotId(), value?.split(" - ")[0], value?.split(" - ")[1], (res) => {
          //     setOverViewList(res.data.overview);
          //   });
          // }}
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
          //   className="block w-56 "
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
