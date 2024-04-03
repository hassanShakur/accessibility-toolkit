'use server';// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBOQUScpNcqbQaPqCn10B9449VM6yZfhsM',
  authDomain: 'axetool.firebaseapp.com',
  databaseURL: 'https://axetool-default-rtdb.firebaseio.com',
  projectId: 'axetool',
  storageBucket: 'axetool.appspot.com',
  messagingSenderId: '642843072876',
  appId: '1:642843072876:web:2a4f23329694444ef9bb49',
  measurementId: 'G-TNL3B6CGD1',
};

const Home = () => {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getDatabase();

  const user = useSelector((state) => state.auth.user);
  console.log(user?.sub);

  useEffect(() => {
    if (!user || !user?.sub) return;

    const saveData = (sub: any, data: any) => {
      const reference = ref(db, 'reports/' + user.sub);

      set(reference, {...data, sub});
    };

    saveData(user.sub, {
      email: user.email,
    });
  }, [db, user]);