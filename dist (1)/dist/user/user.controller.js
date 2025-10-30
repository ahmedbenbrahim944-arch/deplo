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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const admin_role_guard_1 = require("../auth/guards/admin-role.guard");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async create(createUserDto) {
        const user = await this.userService.create(createUserDto);
        const { password, ...userWithoutPassword } = user;
        return {
            message: 'Utilisateur créé avec succès',
            user: userWithoutPassword,
        };
    }
    async findAll() {
        const users = await this.userService.findAll();
        return users.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
    }
    async findOne(id) {
        const user = await this.userService.findOne(+id);
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async update(id, updateUserDto) {
        const user = await this.userService.update(+id, updateUserDto);
        const { password, ...userWithoutPassword } = user;
        return {
            message: 'Utilisateur modifié avec succès',
            user: userWithoutPassword,
        };
    }
    async remove(id) {
        await this.userService.remove(+id);
        return { message: 'Utilisateur supprimé avec succès' };
    }
    async deactivate(id) {
        const user = await this.userService.deactivate(+id);
        const { password, ...userWithoutPassword } = user;
        return {
            message: 'Utilisateur désactivé avec succès',
            user: userWithoutPassword,
        };
    }
    async activate(id) {
        const user = await this.userService.activate(+id);
        const { password, ...userWithoutPassword } = user;
        return {
            message: 'Utilisateur activé avec succès',
            user: userWithoutPassword,
        };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(admin_role_guard_1.AdminRoleGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(admin_role_guard_1.AdminRoleGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(admin_role_guard_1.AdminRoleGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(admin_role_guard_1.AdminRoleGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(admin_role_guard_1.AdminRoleGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/deactivate'),
    (0, common_1.UseGuards)(admin_role_guard_1.AdminRoleGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deactivate", null);
__decorate([
    (0, common_1.Patch)(':id/activate'),
    (0, common_1.UseGuards)(admin_role_guard_1.AdminRoleGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "activate", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map