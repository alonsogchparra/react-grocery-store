import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import themeReducer from '../features/theme/themeSlice';

export default configureStore({
  reducer: {
    products: productReducer,
    theme: themeReducer,
  },
});
