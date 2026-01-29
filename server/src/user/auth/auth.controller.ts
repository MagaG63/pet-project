import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../dto/user-create.dto';
import type { UserResponse } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(201)
  @Post('register')
  async register(
    @Body() dto: CreateUserDto,
  ): Promise<{ access_token: string; user: UserResponse }> {
    return this.authService.register(dto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Request() req,
  ): Promise<{ access_token: string; user: UserResponse }> {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('profile')
  getProfile(@Request() req): UserResponse {
    return {
      name: req.user.name,
      email: req.user.email,
      desc: req.user.desc || '',
    };
  }
}
