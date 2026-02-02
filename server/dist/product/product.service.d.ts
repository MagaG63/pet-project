import { Product } from './product.model';
export declare class ProductService {
    private productModel;
    constructor(productModel: typeof Product);
    getAll(): Promise<Product[]>;
    getOne(id: number): Promise<Product | null>;
}
