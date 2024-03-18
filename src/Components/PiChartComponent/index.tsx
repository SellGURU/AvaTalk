import { useState } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";

interface DataItem {
  name: string;
  value: number;
  color: string;
}

const initialData: DataItem[] = [
  { name: "Link", value: 400, color: "rgba(133, 92, 248, 0.4)" },
  { name: "QR Code", value: 300, color: "rgba(133, 92, 248, 0.8)" },
  { name: "Email", value: 300, color: "rgba(38, 50, 56, 1)" },
  { name: "SMS", value: 200, color: "rgba(38, 50, 56, 0.16)" },
];
interface Props {
  theme?: string;
}
const PiChartComponent: React.FC<Props> = ({ theme }) => {
  const [data, setData] = useState<DataItem[]>(initialData);
  const [legendItems, setLegendItems] = useState<boolean[]>(initialData.map(() => true));

  const handleLegendClick = (index: number) => {
    const newLegendItems = [...legendItems];
    newLegendItems[index] = !newLegendItems[index];
    setLegendItems(newLegendItems);

    const newData = initialData.filter((_, dataIndex) => newLegendItems[dataIndex]);
    setData(newData);
  };

  const renderLegend = () => (
    <ul className=" space-y-2">
      {initialData.map((entry, index) => (
        <li
          className={`${theme}-PiChartComponent-listItem `}
          key={`legend-${index}`}
          onClick={() => handleLegendClick(index)}
          style={{ textDecoration: legendItems[index] ? "" : "line-through", color: entry.color }}
        >
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
          <p className="text-xs text-gray-400">{entry.name}</p>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`${theme}-PiChartComponent-container`}>
      <p className={`${theme}-PiChartComponent-text`}>Type of Views</p>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Legend layout="vertical" verticalAlign="top" align="right" content={renderLegend} />
          <Pie startAngle={-270} data={data} cx="50%" cy="50%" labelLine={false} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PiChartComponent;
