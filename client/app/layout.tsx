'use client'
import './globals.scss';
import Header from '@/components/header';
import SideNav from '@/components/sideNav';
import { Provider } from 'react-redux';
import store from '@/redux/store';



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <html lang='en'>
        <body>
          <Header />
          <div id='main-layout'>
            <SideNav />
            <div id='main-content'>{children}</div>
          </div>
        </body>
      </html>
    </Provider>
  );
}
