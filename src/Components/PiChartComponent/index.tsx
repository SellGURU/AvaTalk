import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Link", value: 400 },
  { name: "QR Code", value: 300 },
  { name: "Email", value: 300 },
  { name: "SMS", value: 200 },
];

const COLORS = ["#ad97ea", "#855CF8", "#000000", "#263238"];

const PiChartComponent = () => {
  return (
    <div style={{ width: "100%", height: 300 }} className="rounded-[24px] bg-gray-100 pt-[20px]  px-4 flex flex-col justify-center boxShadow-Gray">
      <p className="text-gray-700 leading-[21px] text-[14px] font-[600]  ">Type of Views</p>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Legend layout="vertical" verticalAlign="top" align="right" />
          <Pie startAngle={-270} data={data} cx="50%" cy="50%" labelLine={false} fill="#8884d8" dataKey="value">
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PiChartComponent;
