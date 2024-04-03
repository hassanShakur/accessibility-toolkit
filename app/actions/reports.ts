'use server';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { get, getDatabase, onValue, ref, set } from 'firebase/database';
import { UserMetadata } from '@supabase/supabase-js';

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

type SimpleReport = {
  status: string;
  url: string;
  data: any;
  timeStamp: string;
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const saveReport = (
  user: UserMetadata,
  report: SimpleReport
) => {
  const db = getDatabase();
  const cleanedReportUrl = report.url.replace(/[^a-zA-Z0-9]/g, '');

  const reference = ref(
    db,
    `reports/${user.sub}/${cleanedReportUrl}`
  );

  set(reference, report);
};

export const getReports = async (user: UserMetadata) => {
  const db = getDatabase();
  const reference = ref(db, `reports/${user.sub}`);
  
  onValue(reference, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });

  
}
