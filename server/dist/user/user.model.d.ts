import { Model } from 'sequelize-typescript';
export declare class User extends Model<User> {
    name: string;
    email: string;
    password: string;
    desc: string;
    createdAt: Date;
    updatedAt: Date;
}
