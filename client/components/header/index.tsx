import './header.scss';

const Header = () => {
  return (
    <header>
      {/* Search bar */}
      {/* <div id='search-bar'> */}
        <input type='text' placeholder='Search...' />
      {/* </div> */}
      <nav>
        <ul>
          <li>
            <a href='#'>Sign In</a>
          </li>
          <li>
            <a href='#'>Sign Up</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
