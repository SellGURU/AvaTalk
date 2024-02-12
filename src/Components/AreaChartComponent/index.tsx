// import React, { PureComponent } from "react";
import React from "react";
import { Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart } from "recharts";

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
// class CartesianGridNoDashVertical extends CartesianGrid {
//   renderVertical(verticalPoints: number[]): JSX.Element {
//     const element = super.renderVertical(verticalPoints);
//     const lines = element.props.children.map((el: JSX.Element) => React.cloneElement(el, { strokeDasharray: "0" }));
//     return React.cloneElement(element, [], lines);
//   }
// }
const AreaChartComponent = () => {
  return (
    <section className=" rounded-[24px] bg-gray-100 pt-10 pb-4 px-4 ">
      {/* <ResponsiveContainer width="100%" height="100%"> */}
      <p className=" text-gray-700 leading-[21px] text-[14px] font-[500]">Page Views</p>
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
        <XAxis dataKey="name" strokeWidth="0px" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="view" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
      {/* </ResponsiveContainer> */}
    </section>
  );
};

export default AreaChartComponent;
