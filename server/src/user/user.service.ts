import { Injectable } from '@nestjs/common';
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

  async create(data: CreateUserDto): Promise<User> {
    const hashpass = await bcrypt.hash(data.password, 10);

    const user: any = {
      name: data.name,
      email: data.email,
      password: hashpass,
      desc: data.desc ?? null,
    };

    return this.userModel.create(user);
  }
}
