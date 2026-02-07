import { OrderService } from './order.service';
import { Order } from './order.model';
import { CreateOrderDto } from './dto/order-create.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    getAll(): Promise<Order[]>;
    create(dto: CreateOrderDto): Promise<Order>;
}
