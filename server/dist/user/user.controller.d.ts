import { UserService } from './user.service';
import { CreateUserDto } from './dto/user-create.dto';
import { User } from './user.model';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(data: CreateUserDto): Promise<User>;
}
