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
             <NumberSeparator number={data.filter((el) =>el.name== 'Page Views')[0].value} />
            :
            <NumberSeparator number={0} />
            }
          </p>
        </div>
        <div className={`${theme}-AnalyticsSummary-cardContainer`}>
          <p className={`${theme}-AnalyticsSummary-text`}>Save Contact</p>
          <p className={`${theme}-AnalyticsSummary-number`}>{data.length>0? data.filter((el) =>el.name== 'Save Contact')[0].value : 0}</p>
        </div>
      </div>
      <div className={`${theme}-AnalyticsSummary-rowContainer`}>
        <div className={`${theme}-AnalyticsSummary-cardContainer`}>
          <p className={`${theme}-AnalyticsSummary-text`}>CTR</p>
          <p className={`${theme}-AnalyticsSummary-number`}>{data.length>0? data.filter((el) =>el.name== 'CTR')[0].value :'0%'}</p>
        </div>
        <div className={`${theme}-AnalyticsSummary-cardContainer`}>
          <p className={`${theme}-AnalyticsSummary-text`}>Exchange Contact</p>
          <p className={`${theme}-AnalyticsSummary-number`}>{data.length>0? data.filter((el) =>el.name== 'Exchange Contact')[0].value :'0%'}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSummary;
