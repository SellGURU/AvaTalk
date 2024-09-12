/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { useAuth } from "../../hooks/useAuth";

// const data = [
//   {
//     name: "Socials",
//     value: 450,
//   },
//   {
//     name: "Links",
//     value: 200,
//   },
//   {
//     name: "Videos",
//     value: 300,
//   },
//   {
//     name: "Gallery",
//     value: 220,
//   },
//   {
//     name: "Contact",
//     value: 380,
//   },
//   {
//     name: "About",
//     value: 300,
//   },
//   {
//     name: "Al",
//     value: 420,
//   },
// ];
interface Props {
  theme?: string;
  data:Array<any>
}
const BarChartComponent: React.FC<Props> = ({ theme ,data}) => {
  const context = useAuth()
  const [filterdata, setFilterData] = useState<Array<any>>(data.map(el => {
    return {
      name:el.type,
      value:el.count,
    }
  }));  
  useEffect(() => {
    setFilterData(data.map(el => {
      return {
        name:el.type,
        value:el.count,
      }
    }))     
  },[data])
  return (
    <div className="relative w-[100%] ">
    {context.currentUser.type_of_account.getType() == 'Free'?
      <div className={`bg-[#F3F4F6] ${theme}-BarChartComponent-container-notShow`}>
        <p className={`${theme}-AreaChartComponent-text absolute top-4 left-4 z-10`}>Clicks per Category</p>
        <div>
                <img className=" scale-[.9] w-full z-20 " src="/Carbon/notDAtaToShow.svg" alt="" />
                 <p className={"text-[#6B7280] text-[12px] font-medium"}>No data to show</p>
        </div>
      </div>
    :
      <div className={`${theme}-BarChartComponent-container`}>
        <p className={`${theme}-BarChartComponent-text`}>Clicks per Category</p>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={filterdata}
            margin={{
              top: 10,
              right: 10,
              left: -30,
              bottom: 0,
            }}
            barSize={28}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="name" fontSize={12} stroke="#9CA3AF" />
            <YAxis fontSize={12} stroke="#9CA3AF" />
            <Tooltip cursor={false} />
            <Bar dataKey="value" fill="#5048E5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    }
    </div>
  );
};

export default BarChartComponent;
