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
exports.Product = exports.FournisseurCode = void 0;
const typeorm_1 = require("typeorm");
var FournisseurCode;
(function (FournisseurCode) {
    FournisseurCode["M0"] = "M0";
    FournisseurCode["M1"] = "M1";
})(FournisseurCode || (exports.FournisseurCode = FournisseurCode = {}));
let Product = class Product {
    getFullProductNumber() {
        const formattedProgressive = this.numeroProgressif.toString().padStart(4, '0');
        return `${this.annee}${this.semaine}${formattedProgressive}${this.uniqueProductId}${this.codeFournisseur}${this.indice}`;
    }
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Product.prototype, "ligne", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product.prototype, "uniqueProductId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 1 }),
    __metadata("design:type", String)
], Product.prototype, "annee", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 2, default: '10' }),
    __metadata("design:type", String)
], Product.prototype, "semaine", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "numeroProgressif", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: FournisseurCode,
        default: FournisseurCode.M0
    }),
    __metadata("design:type", String)
], Product.prototype, "codeFournisseur", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, default: '040' }),
    __metadata("design:type", String)
], Product.prototype, "indice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], Product.prototype, "compteurImpression", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "typeTicket", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)('products'),
    (0, typeorm_1.Index)(['ligne', 'reference'], { unique: true })
], Product);
//# sourceMappingURL=product.entity.js.map