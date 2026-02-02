import { AuthService } from './auth.service';
import { CreateUserDto } from '../dto/user-create.dto';
import type { UserResponse } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: CreateUserDto, res: any): Promise<{
        access_token: string;
        user: UserResponse;
    }>;
    login(req: any, res: any): Promise<{
        access_token: string;
        user: UserResponse;
    }>;
    refresh(req: any, res: any): Promise<any>;
    logout(res: any): {
        message: string;
    };
    getProfile(req: any): UserResponse;
}
