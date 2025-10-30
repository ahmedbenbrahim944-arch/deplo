import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
export declare class AdminService {
    private adminRepository;
    constructor(adminRepository: Repository<Admin>);
    createAdmin(createAdminDto: CreateAdminDto): Promise<Admin>;
    findAll(): Promise<Admin[]>;
    findOneById(id: number): Promise<Admin | null>;
    findOneByNom(nom: string): Promise<Admin | null>;
    findOneByNomPrenom(nom: string, prenom: string): Promise<Admin | null>;
}
