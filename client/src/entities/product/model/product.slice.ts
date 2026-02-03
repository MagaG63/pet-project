import { createSlice } from "@reduxjs/toolkit";
import type { ProductState } from "./product.types";
import { oneProductThunk, productThunk } from "./product.thunk";

const initialState: ProductState = {
  product: null,
  currentProduct: null,
  loading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(productThunk.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
      })
      .addCase(productThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(productThunk.rejected, (state, action) => {
        console.error(action.error);
        state.loading = false;
      });

      builder
      .addCase(oneProductThunk.fulfilled, (state, action) => {
        state.currentProduct = action.payload;
        state.loading = false;
      })
      .addCase(oneProductThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(oneProductThunk.rejected, (state, action) => {
        console.error(action.error);
        state.loading = false;
      });
  },
});

export default productSlice.reducer