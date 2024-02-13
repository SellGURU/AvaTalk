import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

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
    <div style={{ width: "100%", height: 300 }} className="boxShadow-Gray bg-gray-100 py-10 px-4 rounded-[24px]">
      <p className="text-gray-700 leading-[21px] text-[14px] font-[500] pl-16 pb-2">Clicks per Category</p>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
          <Bar dataKey="value" fill="#5048E5" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
