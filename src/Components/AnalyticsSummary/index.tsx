const AnalyticsSummary = () => {
  return (
    <div className="space-y-4">
      <div className="flex space-x-4 w-full justify-between items-center">
        <div className="bg-gray-100 rounded-[24px] w-[220px] h-[97px] boxShadow-Gray">
          <p className="leading-[21px] text-[14px] font-[600] text-gray-700 pt-[13px] pl-3 md:pl-6 whitespace-nowrap  pb-2">Page Views</p>
          <p className="leading-[36px] text-[24px] font-[600]  flex justify-center text-violet-700/80">2386</p>
        </div>
        <div className="bg-gray-100 rounded-[24px] w-[220px] h-[97px] boxShadow-Gray">
          <p className="leading-[21px] text-[14px] font-[600] text-gray-700 pt-[13px] pl-3 md:pl-6 whitespace-nowrap  pb-2">Save Contact</p>
          <p className="leading-[36px] text-[24px] font-[600] text-violet-700/80 flex justify-center">854</p>
        </div>
      </div>
      <div className="flex space-x-4 w-full justify-between items-center">
        <div className="bg-gray-100 rounded-[24px] w-[220px] h-[97px] boxShadow-Gray">
          <p className="leading-[21px] text-[14px] font-[600] text-gray-700 pt-[13px] pl-3 md:pl-6 whitespace-nowrap  pb-2">CTR</p>
          <p className="leading-[36px] text-[24px] font-[600] text-violet-700/80 flex justify-center">56%</p>
        </div>
        <div className="bg-gray-100 rounded-[24px] w-[220px] h-[97px] boxShadow-Gray">
          <p className="leading-[21px] text-[14px] font-[600] text-gray-700 pt-[13px] pl-3 md:pl-6 whitespace-nowrap  pb-2">Exchange Contact</p>
          <p className="leading-[36px] text-[24px] font-[600] text-violet-700/80 flex justify-center">105</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSummary;
