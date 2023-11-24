'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Spinner from '@/components/spinner';
import type { ReportState } from '@/redux/reportSlice';
import ReportAnalysis from '@/components/report/ReportAnalysis';

const Report = () => {
  const { report, loading, error } = useSelector<
    RootState,
    ReportState
  >((state) => state.report);

  if (loading) return <Spinner />;

  if (error) return <p>Error occured: {error}</p>;

  return <ReportAnalysis report={report} />;
};

export default Report;
