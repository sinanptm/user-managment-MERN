import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import { apiSlice } from './Slices/apiSlice';


const store = configureStore({
    reducer: {
        auth:authReducer,
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',

});

export default store;
