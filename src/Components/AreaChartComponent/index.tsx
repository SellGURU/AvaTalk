// import React, { PureComponent } from "react";

import { Area, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart } from "recharts";

const data = [
  {
    name: "Jan",
    view: 10,
  },
  {
    name: "Feb",
    view: 12,
  },
  {
    name: "Mar",
    view: 2,
  },
  {
    name: "Apr",
    view: 6,
  },
  {
    name: "May",
    view: 20,
  },
  {
    name: "Jun",
    view: 22,
  },
  {
    name: "Jul",
    view: 16,
  },
  {
    name: "Aug",
    view: 5,
  },
  {
    name: "Sep",
    view: 20,
  },
  {
    name: "Oct",
    view: 25,
  },
  {
    name: "Nov",
    view: 7,
  },
  {
    name: "Dec",
    view: 18,
  },
];

const AreaChartComponent = () => {
  return (
    <div className=" rounded-[24px] bg-gray-100 pt-10 pb-4 boxShadow-Gray ">
      {/* <ResponsiveContainer width="100%" height="100%"> */}
      <p className=" text-gray-700 leading-[21px] text-[14px] font-[500] pl-16 pb-2">Page Views</p>
      <AreaChart
        width={500}
        height={400}
        data={data}
        // margin={{
        //   top: 10,
        //   right: 30,
        //   left: 0,
        //   bottom: 0,
        // }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" strokeWidth="0px" fontSize={12} stroke="#9CA3AF" />
        <YAxis fontSize={12} stroke="#9CA3AF" />
        <Tooltip />
        <Area type="monotone" dataKey="view" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
      {/* </ResponsiveContainer> */}
    </div>
  );
};

export default AreaChartComponent;
