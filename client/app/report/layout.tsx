import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accessibility Toolkit | Site Report',
  description: 'A toolkit for making your site more accessible.',
};

const ReportLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // A side nav that can be toggled on smaller screens
  return (
    <div className='report-layout'>
      <div className='report-layout__side-nav'>
        <div className='report-layout__side-nav__logo'>
          <h1>AxeTool</h1>
          <p>The accessibility toolkit handler</p>
        </div>
        <div className='report-layout__side-nav__links'>
          <a href='/'>Home</a>
          <a href='/report'>Report</a>
        </div>
      </div>
      <div className='report-layout__content'>{children}</div>
    </div>
  );
};

export default ReportLayout;
