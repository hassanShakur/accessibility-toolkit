import GeneralChart from '../chart/GeneralChart';
import PageInfo from '../chart/PageInfo';
import PageStruct from '../chart/PageStruct';
import analyzer from './analyzer';
import type ReportType from '@/types/report';
import FormField from '../chart/FormField';
import HeadingStruct from '../chart/HeadingStruct';
import ImageStruct from '../chart/ImageStruct';
import LinkStruct from '../chart/LinkStruct';
import SiteDetails from './SiteDetails';
import './reportAnalysis.scss';
import './reportCard.scss';

interface PropType {
  url: string;
  data: ReportType;
}

const ReportAnalysis = (props: PropType) => {
  const report = props.report.data;
  const url = props.report.url;
  const analyzedData = report ? analyzer(report) : null;

  return (
    <div id='analysis-page'>
      <h1>Report Analysis</h1>
      <SiteDetails data={analyzedData?.siteDetails} url={url} />

      {analyzedData && (
        <section id='charts'>
          <GeneralChart siteData={analyzedData} />
          <PageInfo data={analyzedData.pageInfo} />
          <PageStruct data={analyzedData.pageStruct} />
          <HeadingStruct data={analyzedData.headingStruct} />
          <ImageStruct data={analyzedData.imageStruct} />
          <FormField data={analyzedData.formField} />
          <LinkStruct data={analyzedData.linkStruct} />
        </section>
      )}
    </div>
  );
};

export default ReportAnalysis;
