import { AuthService } from './auth.service';
import { CreateUserDto } from '../dto/user-create.dto';
import type { UserResponse } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: CreateUserDto): Promise<{
        access_token: string;
        user: UserResponse;
    }>;
    login(req: any): Promise<{
        access_token: string;
        user: UserResponse;
    }>;
    getProfile(req: any): UserResponse;
}
