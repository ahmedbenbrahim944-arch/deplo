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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const admin_service_1 = require("../admin/admin.service");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    constructor(adminService, userService, jwtService) {
        this.adminService = adminService;
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async validateAdmin(nom, password) {
        const admin = await this.adminService.findOneByNom(nom);
        if (admin && await bcrypt.compare(password, admin.password)) {
            const { password, ...result } = admin;
            return result;
        }
        return null;
    }
    async validateUser(nom, password) {
        const user = await this.userService.findOneByNom(nom);
        if (user && user.isActive && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async adminLogin(loginAdminDto) {
        const { nom, password } = loginAdminDto;
        const admin = await this.validateAdmin(nom, password);
        if (!admin) {
            throw new common_1.UnauthorizedException('Nom ou mot de passe incorrect');
        }
        const payload = {
            sub: admin.id,
            nom: admin.nom,
            role: 'admin'
        };
        return {
            access_token: this.jwtService.sign(payload),
            admin: {
                id: admin.id,
                nom: admin.nom,
                prenom: admin.prenom
            }
        };
    }
    async userLogin(loginUserDto) {
        const { nom, password } = loginUserDto;
        const user = await this.validateUser(nom, password);
        if (!user) {
            throw new common_1.UnauthorizedException('Nom ou mot de passe incorrect');
        }
        const payload = {
            sub: user.id,
            nom: user.nom,
            role: 'user'
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                nom: user.nom,
                prenom: user.prenom
            }
        };
    }
    async validateUserById(userId) {
        return await this.userService.findOne(userId);
    }
    async validateAdminById(adminId) {
        return await this.adminService.findOneById(adminId);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map