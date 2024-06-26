'use server';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { get, getDatabase, ref, set } from 'firebase/database';
import { UserMetadata } from '@supabase/supabase-js';
import { SavedReport } from '@/types';

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const saveReport = (
  user: UserMetadata,
  report: SavedReport
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

  const snapshot = await get(reference);
  const reports: SavedReport[] = [];

  if (snapshot.exists()) {
    snapshot.forEach((child) => {
      reports.push(child.val());
    });
  }

  return reports;
};

export const deleteReport = async (
  user: UserMetadata,
  reportUrl: string
) => {
  const db = getDatabase();
  const cleanedReportUrl = reportUrl.replace(/[^a-zA-Z0-9]/g, '');

  const reference = ref(
    db,
    `reports/${user.sub}/${cleanedReportUrl}`
  );

  await set(reference, null);
};
