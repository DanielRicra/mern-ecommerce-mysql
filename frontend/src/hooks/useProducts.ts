import { useState, useEffect, useReducer } from 'react';
import productsReducer, { INITIAL_STATE } from '../reducers/products-reducer';
import { findAllProducts } from '../services/services';
import { ActionsTypes } from '../types/types';

const useProducts = (name?: string, categoryId?: number) => {
   const [state, dispatch] = useReducer(productsReducer, INITIAL_STATE);
   const [page, setPage] = useState(1);

   useEffect(() => {
      let isCancelled = false;
      async function getAllProducts() {
         dispatch({ type: ActionsTypes.FETCH_START });
         try {
            const response = await findAllProducts({
               categoryId,
               name,
               page,
            });
            if (!isCancelled) {
               dispatch({
                  type: ActionsTypes.FETCH_SUCCESS,
                  payload: response.data,
               });
            }
         } catch (error) {
            dispatch({ type: ActionsTypes.FETCH_ERROR });
         }
      }
      getAllProducts();

      return () => {
         isCancelled = true;
      };
   }, [page, name, categoryId]);

   return {
      loading: state.loading,
      error: state.error,
      productsResponse: state.productsResponse,
      setPage,
   };
};

export default useProducts;
