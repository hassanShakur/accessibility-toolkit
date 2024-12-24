import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUser, signIn, signOut } from '@/app/actions/auth';
import { UserMetadata } from '@supabase/supabase-js';

export const userSignIn = createAsyncThunk(
  'auth/signIn',
  async () => {
    await signIn();
    const user = await getUser();
    return user || null;
  }
);

export const userSignOut = createAsyncThunk(
  'auth/signOut',
  async () => {
    await signOut();
    return null;
  }
);

type InitialStateType = {
  user: UserMetadata | null;
  loading: boolean;
  error: string;
};

const initialState: InitialStateType = {
  user: null,
  loading: false,
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetUser(state) {
      state.user = null;
    },

    resetError(state) {
      state.error = '';
    },

    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userSignIn.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userSignIn.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(userSignIn.rejected, (state, action) => {
      state.loading = false;
      console.log(action.error.message);

      state.error =
        action.error.message || 'An unknown error occured';
    });
    builder.addCase(userSignOut.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userSignOut.fulfilled, (state, action) => {
      state.loading = false;
      state.user = null;
    });
    builder.addCase(userSignOut.rejected, (state, action) => {
      state.loading = false;
      console.log(action.error.message);

      state.error =
        action.error.message || 'An unknown error occured';
    });
  },
});

export const authActions = authSlice.actions;
export type AuthState = ReturnType<typeof authSlice.reducer>;

export default authSlice.reducer;
