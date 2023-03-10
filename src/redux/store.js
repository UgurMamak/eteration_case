import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import basketReducer from './basketSlice'

export default configureStore({
  reducer: {
    productReducer:productReducer,
    basketReducer:basketReducer
  },
})