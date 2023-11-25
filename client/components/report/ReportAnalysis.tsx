import GeneralChart from '../chart/GeneralChart';
import PageInfo from '../chart/PageInfo';
import analyzer from './analyzer';
import type Report from '@/types/report';
import './reportAnalysis.scss'
import './reportCard.scss'
import PageStruct from '../chart/PageStruct';

interface PropType {
  report: {
    status: string;
    data: Report;
  };
}

const ReportAnalysis = (props: PropType) => {
  const report = props.report.data;
  const analyzedData = report ? analyzer(report) : null;

  return (
    <div id='analysis-page'>
      {/* <h1>Report Analysis</h1> */}

      {analyzedData && (
        <section id='charts'>
          <GeneralChart siteData={analyzedData} />
          <PageInfo data={analyzedData.pageInfo} />
          <PageStruct data={analyzedData.pageStruct} />
        </section>
      )}
    </div>
  );
};

export default ReportAnalysis;
