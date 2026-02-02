import { ProductService } from './product.service';
import { Product } from './product.model';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product | null>;
}
