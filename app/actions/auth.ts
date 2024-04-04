import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://petdmhhtxrcenqsdbyhl.supabase.co';
const supabaseKey =
  process.env.SUPABASE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBldGRtaGh0eHJjZW5xc2RieWhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQzNjA3NTQsImV4cCI6MjAxOTkzNjc1NH0.ZKU-orJJsiKm37eKGYrItSNjNUh7NLmS2GpjOEuPHBU';

const supabase = createClient(supabaseUrl, supabaseKey);

const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/';
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
};

export const signIn = async () => {
  console.log({ supabaseKey });
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      redirectTo: getURL(),
    },
  });
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.log({ error });
};

export const getUser = async () => {
  const user = await supabase.auth.getUser();
  return user.data.user?.user_metadata;
};

export const getSession = async () => {
  const session = await supabase.auth.getSession();
  return session.data.session;
};
