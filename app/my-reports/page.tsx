'use client';

import { getReports } from '../actions/reports';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useEffect } from 'react';

const MyReports = () => {
  const currUser = useSelector<RootState, any>(
    (state) => state.auth.user
  );

  useEffect(() => {
    if (!currUser) return;

    getReports(currUser);
  }, [currUser]);

  return <div>MyReports</div>;
};

export default MyReports;
