import { useEffect, useReducer } from 'react';
import productReducer, { INITIAL_STATE } from '../reducers/productReducer';
import { findProductById } from '../services/services';
import { ActionsTypes } from '../types/types';

const useProduct = (productId: number | string | undefined) => {
  const [state, dispatch] = useReducer(productReducer, INITIAL_STATE);

  useEffect(() => {
    let isCancelled = false;
    dispatch({ type: ActionsTypes.FETCH_START });
    async function getProductById(id: number | string | undefined) {
      try {
        if (Number.isNaN(id)) {
          throw new Error('Bad request');
        }
        const response = await findProductById(Number(id));
        if (!isCancelled) {
          dispatch({ type: ActionsTypes.FETCH_SUCCESS, payload: response.data });
        }
      } catch (error) {
        dispatch({ type: ActionsTypes.FETCH_ERROR });
      }
    }

    getProductById(productId);
    return () => {
      isCancelled = true;
    };
  }, [productId]);

  return {
    product: state.product,
    loading: state.loading,
    error: state.error,
  };
};

export default useProduct;
