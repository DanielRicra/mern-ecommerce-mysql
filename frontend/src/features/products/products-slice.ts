/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { ProductsSliceState } from '../../types/types';
import getProductByNameAndCategory from './product-middleware';

const initialState: ProductsSliceState = {
  status: 'idle',
  productsResponse: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  error: undefined
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductByNameAndCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductByNameAndCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productsResponse = action.payload;
      })
      .addCase(getProductByNameAndCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.errorMessage;
      });
  },
});

export default productsSlice.reducer;
