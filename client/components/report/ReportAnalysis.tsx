import GeneralChart from '../chart/GeneralChart';
import PageInfo from '../chart/PageInfo';
import analyzer from './analyzer';
import type Report from '@/types/report';
import './reportAnalysis.scss'

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
    <div>
      <h1>Report Analysis</h1>

      {analyzedData && (
        <section id='charts'>
          <GeneralChart siteData={analyzedData} />
          <PageInfo data={analyzedData.pageInfo} />
        </section>
      )}
    </div>
  );
};

export default ReportAnalysis;
