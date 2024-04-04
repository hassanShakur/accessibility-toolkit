import Image from 'next/image';
import Link from 'next/link';

import { SavedReport } from '@/types';

const SingleReport = ({ report }: { report: SavedReport }) => {
  const onlineFavIcon = `${report.url}/favicon.ico`;
  return (
    <Link
      href={`/report#${report.url}`}
      key={report.url}
      className='border border-slate-600 rounded-md p-4 w-96 h-48 grid gap-4'
    >
      <div className='flex gap-5 items-center h-fit'>
        <span className='rounded-full text-lg'>
          <Image
            loader={() => onlineFavIcon}
            src={onlineFavIcon}
            alt='◓'
            width={35}
            height={35}
            className='rounded-full'
          />
        </span>

        <span className='text-sm w-full flex flex-col gap-1'>
          <span>
            {report.data.page_info.title.length > 40
              ? report.data.page_info.title.slice(0, 40) + '...'
              : report.data.page_info.title}
          </span>
          <span>{report.url}</span>
        </span>
      </div>
    </Link>
  );
};

export default SingleReport;
