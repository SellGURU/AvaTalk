/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { AnalyticsSummary, AreaChartComponent, BarChartComponent, DatePicker, PiChartComponent } from "..";
import { useConstructor } from "../../help";
import { Auth } from "../../Api";

interface Props {
  theme?: string;
}
const Analytics: React.FC<Props> = ({ theme }) => {
  const [data,setData] = useState<Array<any>>([])
  useConstructor(() => {
    Auth.getAnalytics((data) => {
      console.log(data.reports)
      setData(data.reports)
    })
  })
  useEffect(() => {
    console.log(data)
  })
  return (
    <div className={`${theme}-Analytics-container`}>
      <p className={`${theme}-Analytics-text`}>Analytics</p>
      <div className={`${theme}-Analytics-divider1`}>
        <DatePicker />
      </div>
      <div className={`${theme}-Analytics-divider2`}>
        <AnalyticsSummary theme={theme} />
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
        <BarChartComponent theme={theme} />
      </div>
    </div>
  );
};

export default Analytics;
