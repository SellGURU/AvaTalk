import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const data = [
  {
    name: "Socials",
    value: 450,
  },
  {
    name: "Links",
    value: 200,
  },
  {
    name: "Videos",
    value: 300,
  },
  {
    name: "Gallery",
    value: 220,
  },
  {
    name: "Contact",
    value: 380,
  },
  {
    name: "About",
    value: 300,
  },
  {
    name: "Al",
    value: 420,
  },
];

const BarChartComponent = () => {
  return (
    <div className=" rounded-[24px] bg-gray-100 pt-10 pb-4  boxShadow-Gray">
      <p className=" text-gray-700 leading-[21px] text-[14px] font-[500] pl-16 pb-2">Clicks per Category</p>
      <BarChart
        width={500}
        height={300}
        data={data}
        // margin={{
        //   top: 5,
        //   right: 30,
        //   left: 20,
        //   bottom: 5,
        // }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" fontSize={12} stroke="#9CA3AF" />
        <YAxis fontSize={12} stroke="#9CA3AF" />
        {/* <Tooltip /> */}
        {/* <Legend /> */}
        <Bar dataKey="value" fill="#5048E5" radius={[4, 4, 0, 0]} />
      </BarChart>
    </div>
  );
};

export default BarChartComponent;
