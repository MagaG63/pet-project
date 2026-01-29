import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dto/user-create.dto';
export interface UserResponse {
    name: string;
    email: string;
    desc: string;
}
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(dto: CreateUserDto): Promise<{
        access_token: string;
        user: UserResponse;
    }>;
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: UserResponse;
    }>;
    private formatUser;
}
