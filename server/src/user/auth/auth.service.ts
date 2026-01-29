import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dto/user-create.dto';
import * as bcrypt from 'bcrypt';

export interface UserResponse {
  name: string;
  email: string;
  desc: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(
    dto: CreateUserDto,
  ): Promise<{ access_token: string; user: UserResponse }> {
    const existingUser = await this.userService.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('Пользователь уже существует');
    }

    const user = await this.userService.create(dto);
    const userData = this.formatUser(user);

    return {
      access_token: this.jwtService.sign({
        email: userData.email,
        sub: user.id,
        name: userData.name,
      }),
      user: userData,
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    return this.userService.loginUser({ email, password });
  }

  async login(
    user: any,
  ): Promise<{ access_token: string; user: UserResponse }> {
    const userData = this.formatUser(user);
    return {
      access_token: this.jwtService.sign({
        email: userData.email,
        sub: user.id,
        name: userData.name,
      }),
      user: userData,
    };
  }

  private formatUser(user: any): UserResponse {
    const { password, ...userData } = user.toJSON();
    return {
      name: userData.name,
      email: userData.email,
      desc: userData.desc || '',
    };
  }
}
