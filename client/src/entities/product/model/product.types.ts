import type z from "zod";
import type { CreateOrderSchema, ProductSchema } from "./product.shemas";

export type CreateOrder = z.infer<typeof CreateOrderSchema>;
export type Product = z.infer<typeof ProductSchema>;

export type ProductState = {
  product: Product[] | null;
  currentProduct: Product | null;
  basket: Product[] | null;
  loading: boolean;
};
