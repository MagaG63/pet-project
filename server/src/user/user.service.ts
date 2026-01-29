import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/user-create.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  async create(data: CreateUserDto) {
    const hashpass = await bcrypt.hash(data.password, 10);
    return this.userModel.create({
      name: data.name,
      email: data.email,
      password: hashpass,
      desc: data.desc ?? '',
    } as any);
  }

  async loginUser(data: { email: string; password: string }) {
    const user = await this.userModel.findOne({ where: { email: data.email } });

    // ✅ Кастомные ошибки вместо Error
    if (!user) {
      throw new NotFoundException('Пользователь не найден'); // 404
    }

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Неверный пароль'); // 401
    }

    return user;
  }
}
