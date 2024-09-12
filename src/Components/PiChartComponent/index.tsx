/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";
import { useAuth } from "../../hooks/useAuth";

interface DataItem {
  name: string;
  value: number;
  color: string;
}


interface Props {
  theme?: string;
  chartData:Array<any>
}
const PiChartComponent: React.FC<Props> = ({ theme ,chartData }) => {
  const context = useAuth()
  const resolveColor = (name:string) => {
    if(name == 'QR Code') {
      return 'rgba(133, 92, 248, 0.8)'
    }else  if(name == 'SMS'){
      return 'rgba(133, 92, 248, 0.4)'
    }else  if(name == 'Email'){
      return '#c8f7ab'
    }else {
      return '#e4bbfc'
    }
  }
  // const initialData: DataItem[] = chartData.map(el => {
  //   return {
  //     name:el.type,
  //     value:el.count,
  //     color:resolveColor()
  //   }
  // }) 
  // [
    // { name: "Link", value: 400, color: "rgba(133, 92, 248, 0.4)" },
    // { name: "QR Code", value: 300, color: "rgba(133, 92, 248, 0.8)" },
    // { name: "Email", value: 300, color: "rgba(38, 50, 56, 1)" },
    // { name: "SMS", value: 200, color: "rgba(38, 50, 56, 0.16)" },
  // ];  
  const [data, setData] = useState<DataItem[]>(chartData.map(el => {
    return {
      name:el.type,
      value:el.count,
      color:resolveColor(el.type)
    }
  }));
  const [filteredData,setFilterdData] = useState(chartData.map(el => {
    return {
      name:el.type,
      value:el.count,
      color:resolveColor(el.type)
    }
  }))
  useEffect(() => {
    setData(chartData.map(el => {
      return {
        name:el.type,
        value:el.count,
        color:resolveColor(el.type)
      }
    }))
    setFilterdData(chartData.map(el => {
      return {
        name:el.type,
        value:el.count,
        color:resolveColor(el.type)
      }
    }))    
  },[chartData])
  const [legendItems, setLegendItems] = useState<boolean[]>(data.map(() => true));

  const handleLegendClick = (index: number) => {
    const newLegendItems = [...legendItems];
    newLegendItems[index] = !newLegendItems[index];
    setLegendItems(newLegendItems);

    const newData = data.filter((_, dataIndex) => newLegendItems[dataIndex]);
    setFilterdData(newData);
  };

  const renderLegend = () => (
    <ul className=" space-y-2">
      {data.map((entry, index) => (
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
    <div className="relative w-[100%] ">
    {context.currentUser.type_of_account.getType() == 'Free'?
      <>
        <p className={`${theme}-AreaChartComponent-text absolute top-4 left-4 z-10`}>Type of Share</p>
        <img className=" scale-[1.027] w-full z-20 " src="./icons/chartBlur4.png" alt="" />
      </>    
    :
      <div className={`${theme}-PiChartComponent-container`}>
        <p className={`${theme}-PiChartComponent-text`}>Type of Views</p>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Legend layout="vertical" verticalAlign="top" align="right" content={renderLegend} />
            <Pie startAngle={-270} data={filteredData} cx="50%" cy="50%" labelLine={false} dataKey="value">
              {filteredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    }
    </div>
  );
};

export default PiChartComponent;
