'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { getReport } from '@/redux/reportSlice';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';

const Form = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [url, setUrl] = useState('');

  const urlSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    router.push('/report');
    dispatch(getReport(url));
  };

  return (
    <form onSubmit={urlSubmitHandler}>
      <input
        type='text'
        onChange={(e) => setUrl(e.target.value)}
        placeholder='Enter site url...'
      />
      <button type='submit'>Submit</button>
    </form>
  );
};

export default Form;