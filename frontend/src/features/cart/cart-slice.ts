/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartProduct, CartProducts } from '../../types/types';
import { getCartProducts } from '../../utils/local-storage';

interface UpdateQuantityPayload {
  productId: number;
  quantity: number;
}

const initialState: CartProducts = {
  cartProducts: getCartProducts(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      const { payload } = action;

      if (state.cartProducts.find((cp) => cp.product.product_id === payload.product.product_id)
        === undefined) {
        state.cartProducts = [...state.cartProducts, payload];
      } else {
        state.cartProducts = state.cartProducts.map((cp) => {
          if (cp.product.product_id === payload.product.product_id) {
            return { ...cp, quantity: cp.quantity + payload.quantity };
          }
          return cp;
        });
      }
    },
    updateQuantityFromCart: (state, action: PayloadAction<UpdateQuantityPayload>) => {
      const { productId, quantity } = action.payload;

      if (quantity === 0) {
        state.cartProducts = state.cartProducts.filter((cp) => cp.product.product_id !== productId);
      } else {
        state.cartProducts = state.cartProducts.map((cp) => {
          if (cp.product.product_id === productId) {
            return { ...cp, quantity };
          }
          return cp;
        });
      }
    },
    cleanCart: (state) => {
      state.cartProducts = [];
    },
  },
});

export const { addToCart, updateQuantityFromCart, cleanCart } = cartSlice.actions;
export default cartSlice.reducer;
