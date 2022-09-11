import { configureStore } from '@reduxjs/toolkit';
import { registerReducer } from './reducers/userReducers';

export const store = configureStore({
  reducer: {
    registerReducer: registerReducer
  }
})