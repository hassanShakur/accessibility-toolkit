import { createSlice } from '@reduxjs/toolkit';
import { UserMetadata } from '@supabase/supabase-js';
import { createAsyncThunk } from '@reduxjs/toolkit';

import scrapeSite from '@/app/actions/scrape';
import {
  deleteReport,
  getReports,
  saveReport,
} from '@/app/actions/reports';
import { SavedReport } from '@/types';

export const getReport = createAsyncThunk(
  'report/getReport',
  async ({ url, user }: { url: string; user: UserMetadata }) => {
    const data = await scrapeSite(url);
    const timeStamp = new Date().toISOString();

    const fullReport = { data, status: 'success', url, timeStamp };

    if (user) saveReport(user, fullReport);

    return fullReport;
  }
);

export const saveCurrReport = createAsyncThunk(
  'report/saveCurrReport',
  async ({ user, report }: { user: UserMetadata; report: any }) => {
    if (!report.data) return;
    saveReport(user, report);
  }
);

export const fetchSavedReports = createAsyncThunk(
  'report/getSavedReports',
  async (user: UserMetadata) => {
    const data = await getReports(user);

    return data;
  }
);

export const deleteSavedReport = createAsyncThunk(
  'report/deleteSavedReport',
  async ({
    user,
    reportUrl,
  }: {
    user: UserMetadata;
    reportUrl: string;
  }) => {
    deleteReport(user, reportUrl);
  }
);

const initialState = {
  report: {
    status: '',
    url: '',
    data: null,
    timeStamp: '',
  },
  savedReports: <SavedReport[]>[],
  // report: null,
  loading: false,
  error: '',
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    resetReport(state) {
      state.report = {
        status: '',
        url: '',
        data: null,
        timeStamp: '',
      };
    },

    resetError(state) {
      state.error = '';
    },

    setReport(state, action) {
      state.report = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReport.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getReport.fulfilled, (state, action) => {
      state.loading = false;
      state.report = action.payload;
    });
    builder.addCase(getReport.rejected, (state, action) => {
      state.loading = false;
      console.log(action.error.message);
      state.error =
        action.error.message || 'An unknown error occured';
    });

    builder.addCase(saveCurrReport.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(saveCurrReport.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(saveCurrReport.rejected, (state, action) => {
      state.loading = false;
      console.log(action.error.message);
      state.error =
        action.error.message || 'An unknown error occured';
    });

    builder.addCase(fetchSavedReports.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchSavedReports.fulfilled, (state, action) => {
      state.loading = false;
      state.savedReports = action.payload;
    });
    builder.addCase(fetchSavedReports.rejected, (state, action) => {
      state.loading = false;
      console.log(action.error.message);
      state.error =
        action.error.message || 'An unknown error occured';
    });
  },
});

export const reportActions = reportSlice.actions;
export type ReportState = ReturnType<typeof reportSlice.reducer>;

export default reportSlice.reducer;
