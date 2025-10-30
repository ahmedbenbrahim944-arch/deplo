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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const product_dto_1 = require("./dto/product.dto");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async createProduct(createProductDto) {
        const product = await this.productsService.createProduct(createProductDto);
        return {
            success: true,
            message: 'Produit créé avec succès',
            data: product
        };
    }
    async updateProduct(updateProductDto) {
        const product = await this.productsService.updateProduct(updateProductDto);
        return {
            success: true,
            message: 'Produit modifié avec succès',
            data: product
        };
    }
    async getProduct(ligne, reference) {
        const product = await this.productsService.getProductByLigneAndReference(ligne, reference);
        return {
            success: true,
            data: product
        };
    }
    async getAvailableLignes() {
        const lignes = await this.productsService.getAvailableLignes();
        return {
            success: true,
            data: lignes
        };
    }
    async getReferencesByLigne(ligne) {
        const references = await this.productsService.getReferencesByLigne(ligne);
        return {
            success: true,
            data: references
        };
    }
    async getProductByUniqueId(uniqueProductId) {
        const product = await this.productsService.getProductByUniqueId(uniqueProductId);
        return {
            success: true,
            data: product
        };
    }
    async getAllProducts() {
        const products = await this.productsService.getAllProducts();
        return {
            success: true,
            data: products,
            count: products.length
        };
    }
    async resetProgressiveNumber(ligne, reference) {
        const product = await this.productsService.updateProduct({
            ligne,
            reference,
            resetProgressiveNumber: true
        });
        return {
            success: true,
            message: 'Numéro progressif remis à zéro avec succès',
            data: product
        };
    }
    async changeDateInfo(ligne, reference, dateInfo) {
        const product = await this.productsService.updateProduct({
            ligne,
            reference,
            dateInput: dateInfo.dateInput
        });
        return {
            success: true,
            message: 'Date mise à jour avec succès',
            data: product
        };
    }
    async changeIndice(ligne, reference, indiceInfo) {
        const product = await this.productsService.updateProduct({
            ligne,
            reference,
            indice: indiceInfo.indice
        });
        return {
            success: true,
            message: 'Indice modifié avec succès',
            data: product
        };
    }
    async changeTypeTicket(ligne, reference, typeTicketInfo) {
        const product = await this.productsService.updateProduct({
            ligne,
            reference,
            typeTicket: typeTicketInfo.typeTicket
        });
        return {
            success: true,
            message: 'Type de ticket modifié avec succès',
            data: product
        };
    }
    async printProduct(ligne, reference) {
        const product = await this.productsService.incrementPrintCounter(ligne, reference);
        return {
            success: true,
            message: 'Impression enregistrée, compteur incrémenté',
            data: product
        };
    }
    async deleteProduct(ligne, reference) {
        await this.productsService.deleteProduct(ligne, reference);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Get)(':ligne/:reference'),
    __param(0, (0, common_1.Param)('ligne')),
    __param(1, (0, common_1.Param)('reference')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Get)('lignes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getAvailableLignes", null);
__decorate([
    (0, common_1.Get)('lignes/:ligne/references'),
    __param(0, (0, common_1.Param)('ligne')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getReferencesByLigne", null);
__decorate([
    (0, common_1.Get)('by-id/:uniqueProductId'),
    __param(0, (0, common_1.Param)('uniqueProductId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProductByUniqueId", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.Post)(':ligne/:reference/reset-progressive'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('ligne')),
    __param(1, (0, common_1.Param)('reference')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "resetProgressiveNumber", null);
__decorate([
    (0, common_1.Post)(':ligne/:reference/change-date'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('ligne')),
    __param(1, (0, common_1.Param)('reference')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "changeDateInfo", null);
__decorate([
    (0, common_1.Post)(':ligne/:reference/change-indice'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('ligne')),
    __param(1, (0, common_1.Param)('reference')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "changeIndice", null);
__decorate([
    (0, common_1.Post)(':ligne/:reference/change-type-ticket'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('ligne')),
    __param(1, (0, common_1.Param)('reference')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "changeTypeTicket", null);
__decorate([
    (0, common_1.Post)(':ligne/:reference/print'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('ligne')),
    __param(1, (0, common_1.Param)('reference')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "printProduct", null);
__decorate([
    (0, common_1.Delete)(':ligne/:reference'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('ligne')),
    __param(1, (0, common_1.Param)('reference')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteProduct", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map