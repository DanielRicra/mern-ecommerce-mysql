import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { findProductsByNameAndCategory } from '../../services/services';
import { ProductsResponse } from '../../types/types';

type FetchError = {
  errorMessage: string;
};

const getProductsByNameAndCategory = createAsyncThunk<
ProductsResponse,
{ name: string; categoryId: number; page: number },
{ rejectValue: FetchError; }
>('products/getProductByName', async ({ name, categoryId, page }, thunkApi) => {
  try {
    const response = await findProductsByNameAndCategory(name, categoryId, page);
    return response.data;
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error: AxiosError<FetchError> = err as any;
    if (!error.response) {
      throw err;
    }
    return thunkApi.rejectWithValue(error.response.data);
  }
});

export default getProductsByNameAndCategory;
