import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ProductsResponse } from '../../types/types';
import { findAllProducts } from '../../services/services';

type FetchError = {
   errorMessage: string;
};

const getProductsByNameAndCategory = createAsyncThunk<
   ProductsResponse,
   { name: string; categoryId: number; page: number },
   { rejectValue: FetchError }
>('products/getProductByName', async ({ name, categoryId, page }, thunkApi) => {
   try {
      const response = await findAllProducts({ name, categoryId, page });
      return response.data;
   } catch (err) {
      if (err instanceof AxiosError) {
         if (err.response?.status === 404) {
            return thunkApi.rejectWithValue({
               errorMessage: 'Product not found',
            });
         }
         return thunkApi.rejectWithValue({
            errorMessage: err.response?.data.message,
         });
      }

      return thunkApi.rejectWithValue({ errorMessage: 'Something went wrong' });
   }
});

export default getProductsByNameAndCategory;
