import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
const backendUrl = 'http://localhost:7000/api/scrape';

export const getReport = createAsyncThunk(
  'report/getReport',
  async (url: string) => {
    const response = await fetch(`${backendUrl}?url=${url}`);
    const data = await response.json();
    return data;
  }
);

const initialState = {
  report: null || {},
  loading: false,
  error: '',
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {},
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
      state.error = action.error.message || 'An error occurred';
    });
  },
});

export const reportActions = reportSlice.actions;

export default reportSlice.reducer;
