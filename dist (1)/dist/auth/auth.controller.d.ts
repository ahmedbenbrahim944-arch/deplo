import { AuthService } from './auth.service';
import { LoginAdminDto } from 'src/admin/dto/login-admin.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateAdminDto } from 'src/admin/dto/create-admin.dto';
import { AdminService } from 'src/admin/admin.service';
export declare class AuthController {
    private authService;
    private adminService;
    constructor(authService: AuthService, adminService: AdminService);
    adminRegister(createAdminDto: CreateAdminDto): Promise<{
        message: string;
        admin: {
            id: number;
            nom: string;
            prenom: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
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
}
