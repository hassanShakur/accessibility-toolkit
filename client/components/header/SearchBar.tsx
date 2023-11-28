import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { getReport } from '@/redux/reportSlice';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import { reportActions } from '@/redux/reportSlice';
import { fixUrl } from '@/helpers';

const SearchBar = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [url, setUrl] = useState('');

  const urlSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!url) return;

    dispatch(reportActions.resetError());
    dispatch(reportActions.resetReport());

    const fixedUrl = fixUrl(url);
    router.push(`/report#${fixedUrl}`);
    dispatch(getReport(fixedUrl));
    setUrl(() => '');
  };

  return (
    <form onSubmit={urlSubmitHandler}>
      <input
        type='text'
        placeholder='Search...'
        onChange={(e) => setUrl(e.target.value)}
        value={url}
      />
    </form>
  );
};

export default SearchBar;
