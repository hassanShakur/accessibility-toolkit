'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/redux/store';
import { SavedReport } from '@/types';
import SingleReport from './SingleReport';
import Spinner from '@/components/spinner';
import { fetchSavedReports } from '@/redux/reportSlice';

const MyReports = () => {
  const dispatch = useDispatch();
  const { savedReports, loading } = useSelector<RootState, any>(
    (state) => state.report
  );
  const currUser = useSelector<RootState, any>(
    (state) => state.auth.user
  );

  useEffect(() => {
    if (!currUser) return;

    dispatch(fetchSavedReports(currUser) as any);
  }, [currUser, dispatch]);

  if (loading) {
    return <Spinner />;
  }

  if (!currUser) {
    return <p>Please sign in to view your saved reports.</p>;
  }

  if (savedReports.length === 0) {
    return <p>No reports saved yet.</p>;
  }

  return (
    <div className='h-[90%] w-full mt-10 p-5'>
      <h1 className='mb-10 text-lg md:text-xl'>My Reports</h1>

      <div className='w-full h-fit max-h-full flex flex-wrap items-start justify-start gap-10'>
        {savedReports.map((report: SavedReport) => (
          <SingleReport report={report} key={report.url} />
        ))}
      </div>
    </div>
  );
};

export default MyReports;
