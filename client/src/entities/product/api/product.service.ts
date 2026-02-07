import axios from "axios";
import type { CreateOrder, Product } from "../model/product.types";
import { ProductSchema, ProductsSchema } from "../model/product.shemas";

class ProductService {
  static async getAll(): Promise<Product[]> {
    const product = await axios.get("api/product");
    return ProductsSchema.parse(product.data);
  }

  static async getOne(id: number): Promise<Product> {
    const product = await axios.get(`/api/product/${String(id)}`);
    return ProductSchema.parse(product.data);
  }

  static async createOrder(data: CreateOrder): Promise<void> {
    await axios.post("api/order/add", data);
  }
}

export default ProductService;
