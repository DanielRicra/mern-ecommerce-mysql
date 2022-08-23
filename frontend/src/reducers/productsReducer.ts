import { Reducer } from 'react';
import { ProductsAction, ProductsActionsKind, ProductsState } from '../types/types';

const defaultProductResponse = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

export const INITIAL_STATE: ProductsState = {
  loading: false,
  error: false,
  productResponse: defaultProductResponse,
};

const productsReducer: Reducer<ProductsState, ProductsAction> = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ProductsActionsKind.FETCH_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ProductsActionsKind.FETCH_SUCCESS:
      return {
        loading: false,
        productResponse: payload || defaultProductResponse,
        error: false,
      };
    case ProductsActionsKind.FETCH_ERROR:
      return {
        loading: false,
        error: true,
        productResponse: defaultProductResponse,
      };
    default:
      return state;
  }
};

export default productsReducer;
