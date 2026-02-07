import { Order } from './order.model';
import { CreateOrderDto } from './dto/order-create.dto';
export declare class OrderService {
    private orderModel;
    constructor(orderModel: typeof Order);
    getAll(): Promise<Order[]>;
    createOrder(data: CreateOrderDto): Promise<Order>;
}
