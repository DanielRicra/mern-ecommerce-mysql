import { Reducer } from 'react';
import { ProductsAction, ActionsTypes, ProductsState } from '../types/types';

const defaultProductsResponse = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

export const INITIAL_STATE: ProductsState = {
  loading: false,
  error: false,
  productsResponse: defaultProductsResponse,
};

const productsReducer: Reducer<ProductsState, ProductsAction> = (state, action) => {
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
        productsResponse: payload || defaultProductsResponse,
        error: false,
      };
    case ActionsTypes.FETCH_ERROR:
      return {
        loading: false,
        error: true,
        productsResponse: defaultProductsResponse,
      };
    default:
      return state;
  }
};

export default productsReducer;
