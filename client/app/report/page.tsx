'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Spinner from '@/components/spinner';
import type { ReportState } from '@/redux/reportSlice';
import ReportAnalysis from '@/components/report/ReportAnalysis';
import { usePathname } from 'next/dist/client/components/navigation';
import { useDispatch } from 'react-redux';
import { reportActions } from '@/redux/reportSlice';
import { getReport } from '@/redux/reportSlice';
import { useEffect } from 'react';

const Report = () => {
  const { report, loading, error } = useSelector<
    RootState,
    ReportState
  >((state) => state.report);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reportActions.resetError());
    dispatch(reportActions.resetReport());

    const hashUrl = window && window.location.hash.slice(1);
    if (!hashUrl) return;

    dispatch(getReport(hashUrl) as any); // Explicitly type dispatch as any
  }, [dispatch]);

  if (loading) return <Spinner />;

  if (error) return <p>Error occured: {error}</p>;

  if (!report || !report.data) return <p>No report found!</p>;

  return <ReportAnalysis report={report} />;
};

export default Report;
