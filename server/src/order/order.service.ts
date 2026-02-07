import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';
import { CreateOrderDto } from './dto/order-create.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,
  ) {}

  async getAll() {
    return await this.orderModel.findAll();
  }

  async createOrder(data: CreateOrderDto) {
    return await this.orderModel.create({ ...data } as Order);
  }
}
