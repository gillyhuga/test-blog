import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './posts';
import userReducer from './users';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
