import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// import { reducer as authReducer } from './auth';
// import { reducer as userReducer } from './user';
import reportReducer from './reportSlice';

const rootReducer = combineReducers({
  //   auth: authReducer,
  //   user: userReducer,
  report: reportReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
