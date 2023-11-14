'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Spinner from '@/components/spinner';
import type { ReportState } from '@/redux/reportSlice';

const Report = () => {
  const { report, loading, error } = useSelector<
    RootState,
    ReportState
  >((state) => state.report);

  if (loading) return <Spinner />;

  return <div>Report</div>;
};

export default Report;
