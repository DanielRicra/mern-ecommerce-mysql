import { useEffect, useReducer, useState } from 'react';
import purchasesReducer, { INITIAL_STATE } from '../reducers/purchasesReducer';
import { findAllPurchases, findPurchasesByUserId } from '../services/services';
import { ActionsTypes } from '../types/types';

const usePurchases = (userId?: number) => {
  const [state, dispatch] = useReducer(purchasesReducer, INITIAL_STATE);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let isCancelled = false;

    async function getPurchases() {
      let response;
      dispatch({ type: ActionsTypes.FETCH_START });

      try {
        if (userId === undefined) {
          response = await findAllPurchases(page);
        } else {
          response = await findPurchasesByUserId(page, userId);
        }

        if (!isCancelled) {
          dispatch({ type: ActionsTypes.FETCH_SUCCESS, payload: response.data });
        }
      } catch (error) {
        dispatch({ type: ActionsTypes.FETCH_ERROR });
      }
    }
    getPurchases();

    return () => {
      isCancelled = true;
    };
  }, [page]);

  return {
    loading: state.loading,
    error: state.error,
    purchasesResponse: state.purchasesResponse,
    setPage,
  };
};

export default usePurchases;
