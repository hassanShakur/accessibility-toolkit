import type { Metadata } from 'next';
import Form from '@/components/home/Form';

export const metadata: Metadata = {
  title: 'Accessibility Toolkit',
  description: 'A toolkit for making your site more accessible.',
};

const Home = () => {
  return (
    <>
      <div className='hero flex flex-col items-center justify-center mb-8'>
        <h1 className='text-3xl mb-4'>AxeTool</h1>
        <p className='text-lg font-light mb-4'>
          The accessibility toolkit handler
        </p>
      </div>
      <Form />
    </>
  );
};

export default Home;
