import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common'; // ✅ Добавлен ConflictException
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dto/user-create.dto';

export interface UserResponse {
  name: string;
  email: string;
  desc: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: UserResponse;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto): Promise<LoginResponse> {
    const existingUser = await this.userService.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('Пользователь уже существует');
    }

    const user = await this.userService.create(dto);
    const userData = this.formatUser(user);

    const accessToken = this.jwtService.sign(
      {
        email: userData.email,
        sub: user.id,
        name: userData.name,
      },
      { expiresIn: '15m' },
    );

    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: '7d' },
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: userData,
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    return this.userService.loginUser({ email, password });
  }

  async login(user: any): Promise<LoginResponse> {
    const userData = this.formatUser(user);
    const accessToken = this.jwtService.sign(
      {
        email: userData.email,
        sub: user.id,
        name: userData.name,
      },
      { expiresIn: '15m' },
    );

    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: '7d' },
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: userData,
    };
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.userService.findById(payload.sub);

      if (!user) {
        throw new UnauthorizedException('Пользователь не найден');
      }

      const newAccessToken = this.jwtService.sign(
        {
          email: user.email,
          sub: user.id,
          name: user.name,
        },
        { expiresIn: '15m' },
      );

      const newRefreshToken = this.jwtService.sign(
        { sub: user.id },
        { expiresIn: '7d' },
      );

      return {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Неверный refresh токен');
    }
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
