import SearchBar from './SearchBar';
import './header.scss';

const Header = () => {
  return (
    <header>
      <SearchBar />
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
