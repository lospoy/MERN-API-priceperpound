import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; 
import priceReducer from '../features/prices/priceSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    prices: priceReducer,
  },
});
