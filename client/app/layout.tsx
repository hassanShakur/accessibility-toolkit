import type { Metadata } from 'next';
import './globals.scss';
import Header from '@/components/header';
import SideNav from '@/components/sideNav';

export const metadata: Metadata = {
  title: 'Accessibility Toolkit',
  description: 'A toolkit for making your site more accessible.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Header />
        <div id='main-layout'>
          <SideNav />
          <div id='main-content'>{children}</div>
        </div>
      </body>
    </html>
  );
}
