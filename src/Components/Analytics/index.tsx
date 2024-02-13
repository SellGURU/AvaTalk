import { AnalyticsSummary, AreaChartComponent, BarChartComponent, DatePicker, PiChartComponent } from "..";

const Analytics = () => {
  return (
    <div className="  py-20 overflow-y-scroll hiddenScrollBar mt-4 h-screen px-4">
      <p className="text-gray-700 leading-[24px] text-[16px] font-[600]">Analytics</p>
      <div></div>
      <div className="space-y-[15px] ">
        <DatePicker />
        <AnalyticsSummary />
        <AreaChartComponent />
        <PiChartComponent />
        <BarChartComponent />
      </div>
    </div>
  );
};

export default Analytics;
