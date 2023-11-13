import type { Metadata } from 'next';
import './globals.scss';
import Header from '@/components/header';

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
        <main>{children}</main>
      </body>
    </html>
  );
}
