import { HttpService } from '@nestjs/axios';
export declare class AuthApiService {
    private httpService;
    constructor(httpService: HttpService);
    adminLogin(credentials: {
        nom: string;
        password: string;
    }): Promise<any>;
    userLogin(credentials: {
        nom: string;
        password: string;
    }): Promise<any>;
}
