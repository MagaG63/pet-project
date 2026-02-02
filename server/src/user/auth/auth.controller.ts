import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Res,
  HttpCode,
  Response,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../dto/user-create.dto';
import type { UserResponse, LoginResponse } from './auth.service';
import {
  COOKIE_CONFIG,
  getCookieValue,
  clearRefreshTokenCookie,
} from '../utils/cookies.utils';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(201)
  @Post('register')
  async register(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) res: any,
  ): Promise<{ access_token: string; user: UserResponse }> {
    const result: LoginResponse = await this.authService.register(dto);

    res.cookie(
      COOKIE_CONFIG.refreshToken.name,
      result.refresh_token,
      COOKIE_CONFIG.refreshToken.options,
    );

    const { refresh_token, ...response } = result;
    return response;
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Request() req,
    @Res({ passthrough: true }) res: any,
  ): Promise<{ access_token: string; user: UserResponse }> {
    const result: LoginResponse = await this.authService.login(req.user);

    res.cookie(
      COOKIE_CONFIG.refreshToken.name,
      result.refresh_token,
      COOKIE_CONFIG.refreshToken.options,
    );

    const { refresh_token, ...response } = result;
    return response;
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(@Request() req, @Res({ passthrough: true }) res: any) {
    const refreshToken = getCookieValue(req, COOKIE_CONFIG.refreshToken.name);

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token не найден' });
    }

    const tokens = await this.authService.refreshTokens(refreshToken);

    res.cookie(
      COOKIE_CONFIG.refreshToken.name,
      tokens.refresh_token,
      COOKIE_CONFIG.refreshToken.options,
    );

    return {
      access_token: tokens.access_token,
    };
  }

  @Post('logout')
  @HttpCode(200)
  logout(@Res({ passthrough: true }) res: any) {
    clearRefreshTokenCookie(res);
    return { message: 'Успешный выход' };
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
