import axios from "axios";
import type { Product } from "../model/product.types";
import { ProductSchema, ProductsSchema } from "../model/product.shemas";

class ProductService {
  static async getAll(): Promise<Product[]> {
    const product = await axios.get("api/product");
    console.log(product.data);
    return ProductsSchema.parse(product.data);
  }

  static async getOne(id: number): Promise<Product> {
    const product = await axios.get(`/api/product/${String(id)}`);
    return ProductSchema.parse(product.data);
  }
}

export default ProductService;
