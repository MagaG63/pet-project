import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.model';
import { CreateOrderDto } from './dto/order-create.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('')
  async getAll(): Promise<Order[]> {
    return await this.orderService.getAll();
  }

  @Post('add')
  async create(@Body() dto: CreateOrderDto): Promise<Order> {
    return await this.orderService.createOrder(dto);
  }
}
