import type z from "zod";
import type { ProductSchema } from "./product.shemas";

export type Product = z.infer<typeof ProductSchema>;

export type ProductState = {
  product: Product[] | null;
  currentProduct: Product | null;
  loading: boolean;
};
