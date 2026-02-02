import { Model } from 'sequelize-typescript';
export declare class Product extends Model<Product> {
    name: string;
    img: string;
    price: string;
    desc: string;
}
