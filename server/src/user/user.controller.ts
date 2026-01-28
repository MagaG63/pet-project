import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user-create.dto';
import { User } from './user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('regist')
  async create(@Body() data: CreateUserDto): Promise<User> {
    const user = await this.userService.create(data);
    const userData = user.toJSON();
    return userData;
  }
}
