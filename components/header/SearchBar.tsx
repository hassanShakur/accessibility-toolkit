import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/redux/store';
import { getReport, reportActions } from '@/redux/reportSlice';
import { fixUrl } from '@/helpers';

const SearchBar = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [url, setUrl] = useState('');

  const currUser = useSelector<RootState, any>(
    (state) => state.auth.user
  );

  const urlSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!url) return;

    dispatch(reportActions.resetError());
    dispatch(reportActions.resetReport());

    const hashUrl = fixUrl(url);

    router.push(`/report#${hashUrl}`);
    dispatch(getReport({ url: hashUrl, user: currUser }) as any);

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
