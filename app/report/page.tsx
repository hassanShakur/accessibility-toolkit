'use client';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import Spinner from '@/components/spinner';
import { RootState } from '@/redux/store';
import { getReport } from '@/redux/reportSlice';
import type { ReportState } from '@/redux/reportSlice';
import ReportAnalysis from '@/components/report/ReportAnalysis';
import { reportActions, saveCurrReport } from '@/redux/reportSlice';

const Report = () => {
  const reportState = useSelector<RootState, ReportState>(
    (state) => state.report
  );
  const currUser = useSelector<RootState, any>(
    (state) => state.auth.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reportActions.resetError());
    dispatch(reportActions.resetReport());

    const hashUrl = window && window.location.hash.slice(1);
    if (!hashUrl) return;

    dispatch(getReport(hashUrl) as any); // Explicitly type dispatch as any
  }, [dispatch]);

  // save report to user's report history
  useEffect(() => {
    if (!reportState.report || !currUser) return;

    dispatch(
      saveCurrReport({
        user: currUser,
        report: reportState.report,
      }) as any
    );
  }, [dispatch, currUser, reportState]);

  // if (!reportState) return <p>No report found!</p>;

  const { report, loading, error } = reportState;

  if (loading) return <Spinner />;

  if (error) return <p>Error occured: {error}</p>;

  if (!report || !report.data) return <p>No report found!</p>;

  return <ReportAnalysis report={report} />;
};

export default Report;
