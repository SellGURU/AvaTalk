import { AnalyticsSummary, AreaChartComponent, BarChartComponent, DatePicker, PiChartComponent } from "..";

const Analytics = () => {
  return (
    <div className="  py-20 overflow-y-scroll hiddenScrollBar mt-4 h-screen px-4">
      <p className="text-gray-700 leading-[24px] text-[16px] font-[600] mb-[20px]">Analytics</p>
      <div className="mb-6">
        <DatePicker />
      </div>
      <div className="mb-4">
        <AnalyticsSummary />
      </div>
      <div className="mb-4">
        <AreaChartComponent />
      </div>
      <div className="mb-4">
        <PiChartComponent />
      </div>
      <div>
        <BarChartComponent />
      </div>
    </div>
  );
};

export default Analytics;
