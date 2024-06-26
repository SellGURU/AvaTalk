/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { AnalyticsSummary, AreaChartComponent, BarChartComponent, DatePicker, PiChartComponent } from "..";
import { Auth } from "../../Api";

interface Props {
  theme?: string;
}
const Analytics: React.FC<Props> = ({ theme }) => {
  const [data,setData] = useState<Array<any>>([])
  const startDate = new Date()
  startDate.setMonth(startDate.getMonth() -1)
  const [day, setDay] = useState({
    startDate: startDate,
    endDate: new Date(),
  });  
  const [dataBox,setDataBox] = useState([])
  useEffect(() => {
    Auth.getAnalytics(day.startDate.toISOString().split('T')[0],day.endDate.toISOString().split('T')[0],(data) => {
      if(data.reports){
        setData(data.reports)
      }
    })
    Auth.getInfoBox(day.startDate.toISOString().split('T')[0],day.endDate.toISOString().split('T')[0],(data) => {
      if(data.reports){
        setDataBox(data.reports)
      }
    })
  },[day])
  return (
    <div className={`${theme}-Analytics-container`}>
      <p className={`${theme}-Analytics-text`}>Analytics</p>
      <div className={`${theme}-Analytics-divider1`}>
        <DatePicker day={day} setDay={setDay} />
      </div>
      <div className={`${theme}-Analytics-divider2`}>
        <AnalyticsSummary data={dataBox} theme={theme} />
      </div>
      <div className={`${theme}-Analytics-divider2`}>
        {data.length > 0 ? 
          <AreaChartComponent data={data.filter((item) =>item.name == 'Page Views')[0].value.data} theme={theme} />
        :
          <AreaChartComponent data={[]} theme={theme} />
        }
      </div>
      <div className={`${theme}-Analytics-divider2`}>
        {data.length > 0 ? 
        <PiChartComponent chartData={data.filter((el) => el.name == 'Types of Views')[0].value.data} theme={theme} />
        :
        <PiChartComponent chartData={[]} theme={theme} />
        }
      </div>
      <div className="mb-12">
        {data.length > 0 ?
        <BarChartComponent data={data.filter((el) => el.name == 'Clicks per Category')[0].value.data} theme={theme} />
        :
        <BarChartComponent data={[]} theme={theme} />
         }
      </div>
    </div>
  );
};

export default Analytics;
