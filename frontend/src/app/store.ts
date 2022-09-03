import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/user-slice';
import cartReducer from '../features/cart/cart-slice';
import productsSlice from '../features/products/products-slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    products: productsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
