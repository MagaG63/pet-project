import { Model } from 'sequelize-typescript';
export declare class Order extends Model<Order> {
    email: string;
    name: string;
    phone: string;
    order: string;
}
