import Image from 'next/image';
import Link from 'next/link';
import TimeAgo from 'javascript-time-ago';

import deleteIcon from '@/public/images/delete-icon.png';

import en from 'javascript-time-ago/locale/en';
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

import { SavedReport } from '@/types';
import { deleteReport } from '../actions/reports';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const SingleReport = ({ report }: { report: SavedReport }) => {
  const currUser = useSelector<RootState, any>(
    (state) => state.auth.user
  );

  const onlineFavIcon = `${report.url}/favicon.ico`;
  const pageTitle = report.data.page_info.title;
  const pageDescription = report.data.page_info.description;
  const reportTimeStamp = timeAgo.format(new Date(report.timeStamp));

  const deleteReportHandler = async () => {
    await deleteReport(currUser, report.url);
  };

  return (
    <Link
      href={`/report#${report.url}`}
      key={report.url}
      className='border border-slate-600 rounded-md p-4 w-96 h-48 flex flex-col gap-4 justify-between hover:shadow-md hover:border-t-[#00b3ff] border-t-2 hover:text-white'
    >
      <div className='flex gap-5 items-center h-fit w-full'>
        <span className='text-lg'>
          <Image
            loader={() => onlineFavIcon}
            src={onlineFavIcon}
            alt='◓'
            width={35}
            height={35}
          />
        </span>

        <span className='text-sm w-full flex flex-col gap-1'>
          {pageTitle && (
            <span>
              {pageTitle.length > 40
                ? pageTitle.slice(0, 40) + '...'
                : pageTitle}
            </span>
          )}
          <span>{report.url}</span>
        </span>
      </div>

      <div className='flex flex-col gap-4 opacity-75 w-full'>
        <span className='text-sm'>
          {pageDescription
            ? pageDescription.length > 80
              ? pageDescription.slice(0, 80) + '...'
              : pageDescription
            : 'No page description available'}
        </span>

        <div className='text-sm flex items-center justify-between w-full'>
          <span>{reportTimeStamp}</span>
          <span
            className='opacity-100 z-20'
            onClick={deleteReportHandler}
          >
            <Image
              src={deleteIcon}
              alt='delete'
              width={20}
              height={20}
              className='cursor-pointer'
              title='Delete Report'
            />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SingleReport;
