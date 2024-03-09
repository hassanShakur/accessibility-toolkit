import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import scrapeSite from '@/app/actions/scrape';

export const getReport = createAsyncThunk(
  'report/getReport',
  async (url: string) => {
    const { data, error } = await scrapeSite(url);
    return { data, error, url };
  }
);

interface InitialState {
  url: string;
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  url: '',
  data: null,
  loading: false,
  error: null,
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    resetReport(state) {
      state.loading = false;
      state.url = '';
      state.data = null;
    },

    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReport.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getReport.fulfilled, (state, action) => {
      state.loading = false;
      const { data, error, url } = action.payload;
      state.data = data;
      state.error = error;
      state.url = url;
    });

    builder.addCase(getReport.rejected, (state, action) => {
      state.loading = false;
      state.url = '';
      state.data = null;

      console.log(action.error.message);

      state.error =
        action.error.message || 'An unknown error occured';
    });
  },
});

export const reportActions = reportSlice.actions;
export type ReportState = ReturnType<typeof reportSlice.reducer>;

export default reportSlice.reducer;
