import type { Metadata } from 'next';
import './report.scss';

export const metadata: Metadata = {
  title: 'Accessibility Toolkit | Site Report',
  description: 'A toolkit for making your site more accessible.',
};

const ReportLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // A side nav that can be toggled using a hamburger menu icon on smaller screens
  return (
    <div className='report-layout'>
      <aside>
        <h1 id='logo'>AxeTool</h1>
        <div className='aside-links'>
          <a href='/'>Home</a>
          <a href='/report'>Report</a>
        </div>
      </aside>
      <div className='report-content'>{children}</div>
    </div>
  );
};

export default ReportLayout;
