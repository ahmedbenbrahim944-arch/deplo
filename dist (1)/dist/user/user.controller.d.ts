import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        user: Omit<User, 'password'>;
    }>;
    findAll(): Promise<Omit<User, 'password'>[]>;
    findOne(id: string): Promise<Omit<User, 'password'>>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        message: string;
        user: Omit<User, 'password'>;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    deactivate(id: string): Promise<{
        message: string;
        user: Omit<User, 'password'>;
    }>;
    activate(id: string): Promise<{
        message: string;
        user: Omit<User, 'password'>;
    }>;
}
