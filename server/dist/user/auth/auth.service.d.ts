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
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(dto: CreateUserDto): Promise<LoginResponse>;
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<LoginResponse>;
    refreshTokens(refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    private formatUser;
}
