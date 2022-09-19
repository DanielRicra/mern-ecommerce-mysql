import { Reducer } from 'react';
import {
  ActionsTypes,
  Product,
  ProductAction,
  ProductState,
} from '../types/types';

const defaultProduct: Product = {
  bar_code: null,
  category_id: 0,
  description: null,
  img_url: null,
  name: '',
  product_id: 0,
  sale_price: 0,
  stock: 0,
};

export const INITIAL_STATE: ProductState = {
  loading: false,
  error: false,
  product: defaultProduct,
};

const productReducer: Reducer<ProductState, ProductAction> = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionsTypes.FETCH_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ActionsTypes.FETCH_SUCCESS:
      return {
        loading: false,
        error: false,
        product: payload || defaultProduct,
      };
    case ActionsTypes.FETCH_ERROR:
      return {
        error: true,
        loading: false,
        product: defaultProduct,
      };
    default:
      return state;
  }
};

export default productReducer;
