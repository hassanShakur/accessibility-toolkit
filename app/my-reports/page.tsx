'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getReports } from '../actions/reports';
import { RootState } from '@/redux/store';
import { SavedReport } from '@/types';
import SingleReport from './SingleReport';

const MyReports = () => {
  const [reports, setReports] = useState<SavedReport[]>([]); // [1
  const currUser = useSelector<RootState, any>(
    (state) => state.auth.user
  );

  useEffect(() => {
    if (!currUser) return;

    getReports(currUser).then((data) => {
      setReports(data);
      console.log(data);
    });
  }, [currUser]);

  return (
    <div className='h-[90%] w-full mt-10 p-5'>
      <h1 className='mb-10 text-lg md:text-xl'>My Reports</h1>

      <div className='w-full h-fit max-h-full flex flex-wrap items-start justify-start gap-10'>
        {reports.map((report) => (
          <SingleReport report={report} key={report.url} />
        ))}
      </div>
    </div>
  );
};

{
  /* <span>
              {/* {`${report.data.page_info.title.slice(0, 40)}...` ||
                report.url} */
}
//   {report.data.page_info.title
//     ? report.data.page_info.title.length > 40
//       ? report.data.page_info.title.slice(0, 40) + '...'
//       : report.data.page_info.title
//     : report.url}
// </span>

// <span className='text-sm'>
//   {report.data.page_info.description
//     ? report.data.page_info.description.length > 80
//       ? report.data.page_info.description.slice(0, 80) +
//         '...'
//       : report.data.page_info.description
//     : ''}
// </span> */}

export default MyReports;
