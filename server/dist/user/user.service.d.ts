import { User } from './user.model';
import { CreateUserDto } from './dto/user-create.dto';
export declare class UserService {
    private userModel;
    constructor(userModel: typeof User);
    create(data: CreateUserDto): Promise<User>;
}
