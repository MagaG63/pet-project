import { IsEmail, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  order: string;
}
