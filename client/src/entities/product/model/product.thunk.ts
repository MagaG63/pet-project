import { createAsyncThunk } from "@reduxjs/toolkit";
import ProductService from "../api/product.service";
import type { CreateOrder } from "./product.types";

export const productThunk = createAsyncThunk("product", async () => {
  return await ProductService.getAll();
});

export const oneProductThunk = createAsyncThunk(
  "product/id",
  async (id: number) => {
    return await ProductService.getOne(id);
  },
);

export const createOrderThunk = createAsyncThunk(
  "order/add",
  async (data: CreateOrder) => {
    await ProductService.createOrder(data);
  },
);
