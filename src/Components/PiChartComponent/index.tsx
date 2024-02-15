import { useState } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";

interface DataItem {
  name: string;
  value: number;
  color: string;
}

const initialData: DataItem[] = [
  { name: "Link", value: 400, color: "#ad97ea" },
  { name: "QR Code", value: 300, color: "#855CF8" },
  { name: "Email", value: 300, color: "#000000" },
  { name: "SMS", value: 200, color: "#263238" },
];

const PiChartComponent = () => {
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
    <ul className="legend">
      {initialData.map((entry, index) => (
        <li
          className="cursor-pointer flex items-center space-x-2"
          key={`legend-${index}`}
          onClick={() => handleLegendClick(index)}
          style={{ textDecoration: legendItems[index] ? "" : "line-through", color: entry.color }}
        >
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
          <p>{entry.name}</p>
        </li>
      ))}
    </ul>
  );

  return (
    <div style={{ width: "100%", height: 300 }} className="rounded-[24px] bg-gray-100 pt-[20px] px-4 flex flex-col justify-center boxShadow-Gray">
      <p className="text-gray-700 leading-[21px] text-[14px] font-[600]">Type of Views</p>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Legend layout="vertical" verticalAlign="top" align="right" content={renderLegend} />
          <Pie startAngle={-270} data={data} cx="50%" cy="50%" labelLine={false} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PiChartComponent;
