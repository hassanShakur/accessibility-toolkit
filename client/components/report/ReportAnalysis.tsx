import analyzer from './analyzer';
import type Report from '@/types/report';

interface PropType {
  report: {
    status: string;
    data: Report;
  };
}

const ReportAnalysis = (props: PropType) => {
  const report = props.report.data;
  const analyzedData = report ? analyzer(report) : null;
  console.log(analyzedData);

  return <div>ReportAnalysis</div>;
};

export default ReportAnalysis;
