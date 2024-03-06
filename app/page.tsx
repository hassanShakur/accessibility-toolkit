import type { Metadata } from 'next';
import Form from '@/components/home/Form';

import './page.scss';

export const metadata: Metadata = {
  title: 'Accessibility Toolkit',
  description: 'A toolkit for making your site more accessible.',
};

const Home = () => {
  return (
    <>
      <div className='hero'>
        <h1>AxeTool</h1>
        <p>The accessibility toolkit handler</p>
      </div>
      <Form />
    </>
  );
};

export default Home;
