/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

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
  );
};

export default BarChartComponent;
