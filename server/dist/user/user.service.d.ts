import { User } from './user.model';
import { CreateUserDto } from './dto/user-create.dto';
export declare class UserService {
    private userModel;
    constructor(userModel: typeof User);
    findById(id: number): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    create(data: CreateUserDto): Promise<User>;
    loginUser(data: {
        email: string;
        password: string;
    }): Promise<User>;
}
