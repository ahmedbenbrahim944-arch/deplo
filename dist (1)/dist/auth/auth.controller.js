"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const login_admin_dto_1 = require("../admin/dto/login-admin.dto");
const login_user_dto_1 = require("./dto/login-user.dto");
const create_admin_dto_1 = require("../admin/dto/create-admin.dto");
const admin_service_1 = require("../admin/admin.service");
let AuthController = class AuthController {
    constructor(authService, adminService) {
        this.authService = authService;
        this.adminService = adminService;
    }
    async adminRegister(createAdminDto) {
        const admin = await this.adminService.createAdmin(createAdminDto);
        const { password, ...adminWithoutPassword } = admin;
        return {
            message: 'Admin créé avec succès',
            admin: adminWithoutPassword,
        };
    }
    async adminLogin(loginAdminDto) {
        return this.authService.adminLogin(loginAdminDto);
    }
    async userLogin(loginUserDto) {
        return this.authService.userLogin(loginUserDto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('admin/register'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminRegister", null);
__decorate([
    (0, common_1.Post)('admin/login'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_admin_dto_1.LoginAdminDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminLogin", null);
__decorate([
    (0, common_1.Post)('user/login'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userLogin", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        admin_service_1.AdminService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map