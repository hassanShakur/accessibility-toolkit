import Link from 'next/link';
import { useDispatch } from 'react-redux';

import { userSignOut } from '@/redux/authSlice';
import './sideNav.scss';

const SideNav = () => {
  const dispatch = useDispatch();

  return (
    <aside>
      <h1 id='logo'>AxeTool</h1>

      <div className='aside-links'>
        <Link href='/'>Home</Link>
        <Link href='/my-reports'>My Reports</Link>
      </div>

      <div id='logout'>
        <button
          onClick={() => {
            dispatch(userSignOut() as any);
          }}
          className='bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-md w-full'
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default SideNav;
