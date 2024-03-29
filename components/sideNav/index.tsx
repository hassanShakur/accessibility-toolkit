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
        <Link href='/report'>Report</Link>
        <Link href='/about'>About</Link>
        <Link href='/contact'>Contact</Link>
      </div>

      <div id='logout'>
        <button
          onClick={() => {
            dispatch(userSignOut() as any);
          }}
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default SideNav;
