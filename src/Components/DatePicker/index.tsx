/* eslint-disable @typescript-eslint/no-explicit-any */
import Litepicker from "../../Litepicker";
// import { Button } from "symphony-ui";

const DatePicker = (props:any) => {
  // const startDate = new Date()
  // startDate.setMonth(startDate.getMonth() -1)
  // const [day, setDay] = useState({
  //   startDate: startDate,
  //   endDate: new Date(),
  // });

  return (
    <div className="flex mt-4 space-x-3  items-center ">
      <div onClick={() => {
        document.getElementById("dataPicker")?.click()
       }} className=" h-[44px] flex justify-between rounded-[21px] w-full borderBox-GrayBox boxShadow-Gray ">
        <div className="h-full flex items-center justify-between w-full px-2">
       <div  className=" flex justify-start items-center">
          <div className={`Carbon-Profile-EditProfileBtnVector6  px-3 Carbon-Footer-Vectors
                          text-[#8290a3] w-6 h-6 ms-2
                          `}></div>
            {/* <img src="../../../Carbon/Calendar-new.svg" className="w-6 h-6 ms-2 " alt="" /> */}
            <Litepicker
              id="dataPicker"
              className="text-gray-700 text-sm lg:min-w-[230px] w-full pl-1 bg-inherit cursor-pointer"
              value={`${props.day.startDate.toLocaleDateString()} - ${props.day.endDate.toLocaleDateString()}`}
              onChange={(value) => {
                console.log(value)
                const [startDateString, endDateString] = value.split(" - ");
                props.setDay({
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
          <img src="../../../Carbon/leftVector.svg" className="w-4 h-4 me-2 -rotate-90 " alt="" />
        </div>

      </div>
      {/* <div className=" w-2/6">
        <Button theme="Carbon">
          <div className="space-x-1 flex items-center">
            <img src="../../../Carbon/export.svg" alt="" />
            <p>Export</p>
          </div>
        </Button>
      </div> */}
    </div>
  );
};

export default DatePicker;
