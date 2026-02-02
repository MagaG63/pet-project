import { createAsyncThunk } from "@reduxjs/toolkit";
import ProductService from "../api/product.service";

export const productThunk = createAsyncThunk(
  "product",
  async () => {
    return await ProductService.getAll()
  },
);

export const oneProductThunk = createAsyncThunk(
  "product/id",
  async (id: number) => {
    return await ProductService.getOne(id)
  },
)