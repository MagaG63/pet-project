import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async getAll() {
    return await this.productModel.findAll();
  }

  async getOne(id: number) {
    return await this.productModel.findByPk(id);
  }
}
