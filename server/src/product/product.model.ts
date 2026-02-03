import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'Products' })
export class Product extends Model<Product> {
  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
  })
  declare img: string;

  @Column({
    type: DataType.STRING,
  })
  declare price: string;

  @Column({
    type: DataType.STRING,
  })
  declare desc: string;
}
