import GeneralChart from '../chart/GeneralChart';
import PageInfo from '../chart/PageInfo';
import PageStruct from '../chart/PageStruct';
import analyzer from './analyzer';
import type Report from '@/types/report';
import './reportAnalysis.scss'
import './reportCard.scss'
import FormField from '../chart/FormField';
import HeadingStruct from '../chart/HeadingStruct';

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
          <FormField data={analyzedData.formField} />
          <HeadingStruct data={analyzedData.headingStruct} />
        </section>
      )}
    </div>
  );
};

export default ReportAnalysis;
