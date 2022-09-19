import { Reducer } from 'react';
import { ActionsTypes, PurchasesAction, PurchasesState } from '../types/types';

const defaultPurchasesResponse = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

export const INITIAL_STATE: PurchasesState = {
  error: false,
  loading: false,
  purchasesResponse: defaultPurchasesResponse,
};

const purchasesReducer: Reducer<PurchasesState, PurchasesAction> = (state, action) => {
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
        purchasesResponse: payload || defaultPurchasesResponse,
      };

    case ActionsTypes.FETCH_ERROR:
      return {
        loading: false,
        error: true,
        purchasesResponse: defaultPurchasesResponse,
      };

    default:
      return state;
  }
};

export default purchasesReducer;
