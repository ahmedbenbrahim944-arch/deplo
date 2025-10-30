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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./user.entity");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        const { nom, prenom, password } = createUserDto;
        const existingUser = await this.userRepository.findOne({
            where: { nom }
        });
        if (existingUser) {
            throw new common_1.ConflictException('Un utilisateur avec ce nom existe déjà');
        }
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const user = this.userRepository.create({
                nom,
                prenom,
                password: hashedPassword,
            });
            return await this.userRepository.save(user);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Erreur lors de la création de l\'utilisateur');
        }
    }
    async findAll() {
        return await this.userRepository.find();
    }
    async findOne(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException('Utilisateur non trouvé');
        }
        return user;
    }
    async findOneByNom(nom) {
        return await this.userRepository.findOne({ where: { nom } });
    }
    async update(id, updateUserDto) {
        const user = await this.findOne(id);
        if (updateUserDto.password) {
            const saltRounds = 10;
            user.password = await bcrypt.hash(updateUserDto.password, saltRounds);
        }
        if (updateUserDto.nom)
            user.nom = updateUserDto.nom;
        if (updateUserDto.prenom)
            user.prenom = updateUserDto.prenom;
        if (updateUserDto.isActive !== undefined)
            user.isActive = updateUserDto.isActive;
        return await this.userRepository.save(user);
    }
    async remove(id) {
        const user = await this.findOne(id);
        await this.userRepository.remove(user);
    }
    async deactivate(id) {
        const user = await this.findOne(id);
        user.isActive = false;
        return await this.userRepository.save(user);
    }
    async activate(id) {
        const user = await this.findOne(id);
        user.isActive = true;
        return await this.userRepository.save(user);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map