'use client';

import { createClient } from '@supabase/supabase-js';
import SearchBar from './SearchBar';
import './header.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header = () => {
  const supabaseUrl = 'https://petdmhhtxrcenqsdbyhl.supabase.co';
  const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBldGRtaGh0eHJjZW5xc2RieWhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQzNjA3NTQsImV4cCI6MjAxOTkzNjc1NH0.ZKU-orJJsiKm37eKGYrItSNjNUh7NLmS2GpjOEuPHBU';
  const supabase = createClient(supabaseUrl, supabaseKey);
  const [userData, setUserData] = useState<any>(null);

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
  };

  useEffect(() => {
    supabase.auth.getUser().then((user) => {
      setUserData(user);
    });
  }, [supabase.auth]);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    console.log({ error });
  };

  return (
    <header>
      <SearchBar />
      <nav>
        <ul>
          <li>
            <button onClick={signIn}>Sign In</button>
          </li>
          <li>
            <button>Sign Up</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
