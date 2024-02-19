import { Area, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, ResponsiveContainer } from "recharts";

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

interface Props {
  theme?: string;
}
const AreaChartComponent: React.FC<Props> = ({ theme }) => {
  return (
    <div className={`${theme}-AreaChartComponent-container`}>
      <p className={`${theme}-AreaChartComponent-text`}>Page Views</p>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -40,
            bottom: 0,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="name" strokeWidth="0px" fontSize={12} stroke="#9CA3AF" />
          <YAxis fontSize={12} stroke="#9CA3AF" />
          <Tooltip />
          <Area type="monotone" dataKey="view" stroke="#6D28D9" opacity={0.5} fill="#6D28D9" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartComponent;
