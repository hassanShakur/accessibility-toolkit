import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
const backendUrl = 'http://localhost:7000/api/scrape';
import axios from 'axios';
import { emptyReport } from '@/types/report';

export const getReport = createAsyncThunk(
  'report/getReport',
  async (url: string) => {
    try {
      const res = await axios.post(backendUrl, { url });
      return res.data;
    } catch (error: any) {
      // return error.response.data.type;
      throw Error(error.response.data.type);
      // return error.response.data;
      // console.log(error.response.data);
    }
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
      // state.report = {
      //   status: '',
      //   url: '',
      //   data: {
      //     ...emptyReport,
      //   },
      // };
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
      if (action.error.message === 'ConnectionError') {
        state.error = 'Failed to resolve the URL! Please check it and try again.';
        return;
      }
      state.error = action.error.message || 'An error occurred';
    });
  },
});

export const reportActions = reportSlice.actions;
export type ReportState = ReturnType<typeof reportSlice.reducer>;

export default reportSlice.reducer;
