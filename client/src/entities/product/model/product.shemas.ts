import z from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  img: z.string(),
  price: z.string(),
  desc: z.string(),
});

export const ProductsSchema = z.array(ProductSchema);
