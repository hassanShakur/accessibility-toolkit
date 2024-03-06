import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import scrapeSite from '@/app/actions/scrape';

export const getReport = createAsyncThunk(
  'report/getReport',
  async (url: string) => {
    const data = await scrapeSite(url);
    return { data, status: 'success', url };
  }
);

const initialState = {
  report: {
    status: '',
    url: '',
    data: null,
  },
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
  },
});

export const reportActions = reportSlice.actions;
export type ReportState = ReturnType<typeof reportSlice.reducer>;

export default reportSlice.reducer;
