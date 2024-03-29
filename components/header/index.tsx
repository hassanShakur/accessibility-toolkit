'use client';

import SearchBar from './SearchBar';
import './header.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthState, userSignIn } from '@/redux/authSlice';
import { authActions } from '@/redux/authSlice';
import { RootState } from '@/redux/store';
import { getSession } from '@/app/actions/auth';
import Image from 'next/image';

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
        {user ? (
          <span>
            <Image
              loader={() => user.avatar_url}
              src={user.avatar_url}
              alt={user.full_name}
              width={40}
              height={40}
              className='rounded-full'
              title={user.full_name}
            />
          </span>
        ) : (
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
