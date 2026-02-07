import { createSlice } from "@reduxjs/toolkit";
import type { ProductState } from "./product.types";
import { oneProductThunk, productThunk } from "./product.thunk";

const initialState: ProductState = {
  product: null,
  currentProduct: null,
  basket: [],
  loading: false,
};

const hydratedInitialState: ProductState = {
  ...initialState,
  basket: (() => {
    const basket = sessionStorage.getItem("basket");
    return basket ? JSON.parse(basket) : [];
  })(),
};

const productSlice = createSlice({
  name: "product",
  initialState: hydratedInitialState,
  reducers: {
    deleteBasket: (state, action) => {
      if (state.basket) {
        state.basket = state.basket?.filter((el) => el.id !== action.payload);
        sessionStorage.setItem("basket", JSON.stringify(state.basket));
      }
    },

    addToBasket: (state, action) => {
      if (!state.basket) state.basket = [];
      state.basket.push(action.payload);
      sessionStorage.setItem("basket", JSON.stringify(state.basket));
    },
    clearBasket: (state) => {
      state.basket = [];
      sessionStorage.removeItem("basket");
    },
  },
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
export const { addToBasket, clearBasket, deleteBasket } = productSlice.actions;

export default productSlice.reducer;
