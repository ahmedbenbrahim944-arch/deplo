import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import { UserService } from '../user/user.service';
import { LoginAdminDto } from 'src/admin/dto/login-admin.dto';
import { LoginUserDto } from './dto/login-user.dto';
export declare class AuthService {
    private adminService;
    private userService;
    private jwtService;
    constructor(adminService: AdminService, userService: UserService, jwtService: JwtService);
    validateAdmin(nom: string, password: string): Promise<any>;
    validateUser(nom: string, password: string): Promise<any>;
    adminLogin(loginAdminDto: LoginAdminDto): Promise<{
        access_token: string;
        admin: {
            id: any;
            nom: any;
            prenom: any;
        };
    }>;
    userLogin(loginUserDto: LoginUserDto): Promise<{
        access_token: string;
        user: {
            id: any;
            nom: any;
            prenom: any;
        };
    }>;
    validateUserById(userId: number): Promise<import("../user/user.entity").User>;
    validateAdminById(adminId: number): Promise<import("../admin/admin.entity").Admin | null>;
}
