'use client';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import Form from '@/components/home/Form';
import Image from 'next/image';

import './page.scss';

const Home = () => {
  return (
    <Provider store={store}>
      <>
        <div className='hero'>
          <h1>AxeTool</h1>
          <p>The accessibility toolkit handler</p>
        </div>
        <Form />
      </>
    </Provider>
  );
};

export default Home;
