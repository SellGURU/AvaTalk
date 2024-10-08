/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { AccessNotifManager, AnalyticsSummary, AreaChartComponent, BarChartComponent, DatePicker, PiChartComponent } from "..";
import { Auth } from "../../Api";
import { useAuth } from "../../hooks/useAuth";

interface Props {
  theme?: string;
}
const Analytics: React.FC<Props> = ({ theme }) => {
  const [data,setData] = useState<Array<any>>([])
  const startDate = new Date()
  const context = useAuth()
  startDate.setMonth(startDate.getMonth() -1)
  const [day, setDay] = useState({
    startDate: startDate,
    endDate: new Date(),
  });  
  const [dataBox,setDataBox] = useState<Array<any>>([])
  useEffect(() => {
    if(context.currentUser.type_of_account.getType() != 'Free'){
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
    }else {
      setDataBox([
        {
            "id": 1,
            "name": "Page View",
            "value": 10
        },
        {
            "id": 2,
            "name": "َAR Usage",
            "value": 4
        },
        {
            "id": 3,
            "name": "Chat Count",
            "value": 15
        },
        {
            "id": 4,
            "name": "Save Contact",
            "value": 7
        },
        {
            "id": 5,
            "name": "Link Click",
            "value": 95
        },
        {
            "id": 6,
            "name": "File Click",
            "value": 57
        }
    ])
    }
  },[day])
  return (
    <div className={`${theme}-Analytics-container`}>
      <p className={`${theme}-Analytics-text`}>Analytics</p>
      <div className="">
        <AccessNotifManager page="AnalysePage"></AccessNotifManager>

      </div>         
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
      <div className="mb-24 pb-4">
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
