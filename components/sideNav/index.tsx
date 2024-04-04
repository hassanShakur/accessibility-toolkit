import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import { userSignOut } from '@/redux/authSlice';
import './sideNav.scss';
import { RootState } from '@/redux/store';

const SideNav = () => {
  const dispatch = useDispatch();
  const currUser = useSelector<RootState, any>(
    (state) => state.auth.user
  );

  return (
    <aside>
      <h1 id='logo'>AxeTool</h1>

      <div className='aside-links'>
        <Link href='/'>Home</Link>
        <Link href='/my-reports'>My Reports</Link>
      </div>

      <div id='logout'>
        {currUser && (
          <button
            onClick={() => {
              dispatch(userSignOut() as any);
            }}
            className='bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-md w-full'
          >
            Logout
          </button>
        )}
      </div>
    </aside>
  );
};

export default SideNav;
