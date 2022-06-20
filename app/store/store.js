import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import isLoggedReducer from '../slices/isLoggedSlice'
import tokenReducer from '../slices/tokenSlice'

export const store = configureStore({
  reducer: {
    isLogged: isLoggedReducer,
    token: tokenReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});