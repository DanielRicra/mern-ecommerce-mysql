import { Reducer } from 'react';
import {
  ActionsTypes,
  SavePurchaseAction,
  SavePurchaseResponse,
  SavePurchaseState,
} from '../types/types';

const defaultResponse: SavePurchaseResponse = {
  comment: '--',
  paymentType: 'credit_card',
  purchaseDate: '',
  purchaseId: 0,
  userId: 0,
};

export const INITIAL_STATE = {
  loading: false,
  error: false,
  response: defaultResponse,
};

const savePurchaseReducer: Reducer<SavePurchaseState, SavePurchaseAction> = (state, action) => {
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
        response: payload || defaultResponse,
      };
    case ActionsTypes.FETCH_ERROR:
      return {
        error: true,
        loading: false,
        response: defaultResponse,
      };
    default:
      return state;
  }
};

export default savePurchaseReducer;
