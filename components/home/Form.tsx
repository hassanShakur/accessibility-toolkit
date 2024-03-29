'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { getReport } from '@/redux/reportSlice';
import { useDispatch } from 'react-redux';

import type { AppDispatch } from '@/redux/store';
import { reportActions } from '@/redux/reportSlice';
import { fixUrl } from '@/helpers';
import './form.scss';

const Form = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [url, setUrl] = useState('');

  const urlSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!url) return;

    const fixedUrl = fixUrl(url);
    router.push(`/report#${fixedUrl}`);
    // dispatch(getReport(fixedUrl));
  };

  return (
    <form id='index-form' onSubmit={urlSubmitHandler}>
      <input
        type='text'
        onChange={(e) => setUrl(e.target.value)}
        placeholder='Enter site url...'
        value={url}
        autoFocus
      />
      <button type='submit'>Submit</button>
    </form>
  );
};

export default Form;
