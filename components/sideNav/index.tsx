import Link from 'next/link';
import './sideNav.scss';

const SideNav = () => {
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
        <Link href='/logout'>Logout</Link>
      </div>
    </aside>
  );
};

export default SideNav;
