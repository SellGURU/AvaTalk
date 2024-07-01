/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import NumberSeparator from "../../utils/NumberSeparator";

interface Props {
  theme?: string;
  data:Array<any>
}

const AnalyticsSummary: React.FC<Props> = ({ theme ,data}) => {
  return (
    <div className={`${theme}-AnalyticsSummary-container`}>
      <div className={`${theme}-AnalyticsSummary-rowContainer`}>
        <div className={`${theme}-AnalyticsSummary-cardContainer`}>
          <p className={`${theme}-AnalyticsSummary-text`}>Page Views</p>
          <p className={`${theme}-AnalyticsSummary-number`}>
            {data.length >0 ?
             <NumberSeparator number={0} />
            :
            <NumberSeparator number={0} />
            }
          </p>
        </div>
        <div className={`${theme}-AnalyticsSummary-cardContainer`}>
          <p className={`${theme}-AnalyticsSummary-text`}>AR Usage</p>
          <p className={`${theme}-AnalyticsSummary-number`}>{0}</p>
        </div>
        <div className={`${theme}-AnalyticsSummary-cardContainer`}>
          <p className={`${theme}-AnalyticsSummary-text`}>Chat Count</p>
          <p className={`${theme}-AnalyticsSummary-number`}>{0}</p>
        </div>        
      </div>
      <div className={`${theme}-AnalyticsSummary-rowContainer`}>
        <div className={`${theme}-AnalyticsSummary-cardContainer`}>
          <p className={`${theme}-AnalyticsSummary-text`}>CTR</p>
          <div className="text-[12px] mt-[-8px] w-full text-center">(Click-Through Rate)</div>
          <p className={`${theme}-AnalyticsSummary-number`}>{data.length>0? '0%' :'0%'}</p>
        </div>
        <div className={`${theme}-AnalyticsSummary-cardContainer`}>
          <p className={`${theme}-AnalyticsSummary-text`}>Link Click</p>
          <p className={`${theme}-AnalyticsSummary-number`}>{'0'}</p>
        </div>
        <div className={`${theme}-AnalyticsSummary-cardContainer`}>
          <p className={`${theme}-AnalyticsSummary-text`}>File Click</p>
          <p className={`${theme}-AnalyticsSummary-number`}>{'0'}</p>
        </div>        
      </div>
    </div>
  );
};

export default AnalyticsSummary;
