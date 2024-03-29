import React from "react";
import NumberSeparator from "../../utils/NumberSeparator";

interface Props {
  theme?: string;
}

const AnalyticsSummary: React.FC<Props> = ({ theme }) => {
  return (
    <div className={`${theme}-AnalyticsSummary-container`}>
      <div className={`${theme}-AnalyticsSummary-rowContainer`}>
        <div className={`${theme}-AnalyticsSummary-cardContainer`}>
          <p className={`${theme}-AnalyticsSummary-text`}>Page Views</p>
          <p className={`${theme}-AnalyticsSummary-number`}>
            <NumberSeparator number={2386} />
          </p>
        </div>
        <div className={`${theme}-AnalyticsSummary-cardContainer`}>
          <p className={`${theme}-AnalyticsSummary-text`}>Save Contact</p>
          <p className={`${theme}-AnalyticsSummary-number`}>854</p>
        </div>
      </div>
      <div className={`${theme}-AnalyticsSummary-rowContainer`}>
        <div className={`${theme}-AnalyticsSummary-cardContainer`}>
          <p className={`${theme}-AnalyticsSummary-text`}>CTR</p>
          <p className={`${theme}-AnalyticsSummary-number`}>56%</p>
        </div>
        <div className={`${theme}-AnalyticsSummary-cardContainer`}>
          <p className={`${theme}-AnalyticsSummary-text`}>Exchange Contact</p>
          <p className={`${theme}-AnalyticsSummary-number`}>105</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSummary;
