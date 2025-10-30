import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './admin.entity';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    register(createAdminDto: CreateAdminDto): Promise<{
        message: string;
        admin: Omit<Admin, 'password'>;
    }>;
}
