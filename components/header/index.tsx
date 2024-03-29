'use client';

import SearchBar from './SearchBar';
import './header.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthState, userSignIn } from '@/redux/authSlice';
import { authActions } from '@/redux/authSlice';
import { RootState } from '@/redux/store';
import { getSession } from '@/app/actions/auth';

const Header = () => {
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector<RootState, AuthState>(
    (state) => state.auth
  );

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        dispatch(authActions.setUser(session?.user?.user_metadata));
      }
    });
  }, [dispatch]);

  return (
    <header>
      <SearchBar />
      <nav>
        {!user?.data?.user && (
          <ul>
            <li>
              <button onClick={() => dispatch(userSignIn() as any)}>
                Sign In
              </button>
            </li>
            <li>
              <button>Sign Up</button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
