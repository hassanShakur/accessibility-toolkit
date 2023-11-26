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
  const pathname = usePathname();
  const pathParts = pathname.split('/').filter((part) => part !== '');

  const url = pathParts[1];

  useEffect(() => {
    dispatch(reportActions.resetError());
    dispatch(reportActions.resetReport());
    dispatch(getReport(`https://${url}`) as any); // Explicitly type dispatch as any
  }, [url, dispatch]);

  if (loading) return <Spinner />;

  if (error) return <p>Error occured: {error}</p>;

  if (pathParts.length === 1) return <p>Invalid or null url!</p>;

  if (!report) return <p>No report found!</p>;

  return <ReportAnalysis report={report} />;
};

export default Report;
