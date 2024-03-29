import React from "react";
import { AnalyticsSummary, AreaChartComponent, BarChartComponent, DatePicker, PiChartComponent } from "..";
import { useConstructor } from "../../help";
import { Auth } from "../../Api";

interface Props {
  theme?: string;
}
const Analytics: React.FC<Props> = ({ theme }) => {
  useConstructor(() => {
    Auth.getAnalytics()
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
        <AreaChartComponent theme={theme} />
      </div>
      <div className={`${theme}-Analytics-divider2`}>
        <PiChartComponent theme={theme} />
      </div>
      <div className="mb-12">
        <BarChartComponent theme={theme} />
      </div>
    </div>
  );
};

export default Analytics;
