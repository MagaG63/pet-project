import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

  async findById(id: number) {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return user;
  }

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

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Неверный пароль');
    }

    return user;
  }
}
