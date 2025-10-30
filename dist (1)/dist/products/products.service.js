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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
const date_converter_util_1 = require("../common/utils/date-converter.util");
let ProductsService = class ProductsService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async createProduct(createProductDto) {
        const existingProduct = await this.productRepository.findOne({
            where: {
                ligne: createProductDto.ligne,
                reference: createProductDto.reference
            }
        });
        if (existingProduct) {
            throw new common_1.ConflictException(`Un produit avec la ligne "${createProductDto.ligne}" et la référence "${createProductDto.reference}" existe déjà`);
        }
        const product = new product_entity_1.Product();
        product.ligne = createProductDto.ligne;
        product.reference = createProductDto.reference;
        product.uniqueProductId = createProductDto.uniqueProductId;
        product.typeTicket = createProductDto.typeTicket || '';
        product.numeroProgressif = createProductDto.numeroProgressif || 0;
        if (createProductDto.dateInput) {
            try {
                const date = date_converter_util_1.DateConverter.parseDateString(createProductDto.dateInput);
                const { yearCode, weekNumber } = date_converter_util_1.DateConverter.convertDateToProductCodes(date);
                product.annee = yearCode;
                product.semaine = weekNumber;
            }
            catch (error) {
                throw new common_1.BadRequestException(error.message || 'Format de date invalide. Utilisez DD/MM/YYYY ou YYYY-MM-DD');
            }
        }
        else {
            product.annee = createProductDto.annee || 'E';
            product.semaine = createProductDto.semaine || '10';
        }
        product.codeFournisseur = createProductDto.codeFournisseur || product_entity_1.FournisseurCode.M0;
        product.indice = createProductDto.indice || '040';
        const savedProduct = await this.productRepository.save(product);
        return this.mapToResponseDto(savedProduct);
    }
    async updateProduct(updateProductDto) {
        const product = await this.productRepository.findOne({
            where: {
                ligne: updateProductDto.ligne,
                reference: updateProductDto.reference
            }
        });
        if (!product) {
            throw new common_1.NotFoundException(`Aucun produit trouvé avec la ligne "${updateProductDto.ligne}" et la référence "${updateProductDto.reference}"`);
        }
        if (updateProductDto.dateInput) {
            try {
                const date = date_converter_util_1.DateConverter.parseDateString(updateProductDto.dateInput);
                const { yearCode, weekNumber } = date_converter_util_1.DateConverter.convertDateToProductCodes(date);
                product.annee = yearCode;
                product.semaine = weekNumber;
            }
            catch (error) {
                throw new common_1.BadRequestException(error.message || 'Format de date invalide. Utilisez DD/MM/YYYY ou YYYY-MM-DD');
            }
        }
        else {
            if (updateProductDto.annee)
                product.annee = updateProductDto.annee;
            if (updateProductDto.semaine)
                product.semaine = updateProductDto.semaine;
        }
        if (updateProductDto.resetProgressiveNumber) {
            product.numeroProgressif = 1;
        }
        else if (updateProductDto.numeroProgressif !== undefined) {
            product.numeroProgressif = updateProductDto.numeroProgressif;
        }
        if (updateProductDto.uniqueProductId)
            product.uniqueProductId = updateProductDto.uniqueProductId;
        if (updateProductDto.codeFournisseur)
            product.codeFournisseur = updateProductDto.codeFournisseur;
        if (updateProductDto.indice)
            product.indice = updateProductDto.indice;
        if (updateProductDto.description !== undefined)
            product.description = updateProductDto.description;
        if (updateProductDto.typeTicket !== undefined) {
            product.typeTicket = updateProductDto.typeTicket || '';
        }
        const savedProduct = await this.productRepository.save(product);
        return this.mapToResponseDto(savedProduct);
    }
    async getProductByLigneAndReference(ligne, reference) {
        const product = await this.productRepository.findOne({
            where: { ligne, reference }
        });
        if (!product) {
            throw new common_1.NotFoundException(`Aucun produit trouvé avec la ligne "${ligne}" et la référence "${reference}"`);
        }
        return this.mapToResponseDto(product);
    }
    async getProductByUniqueId(uniqueProductId) {
        const product = await this.productRepository.findOne({
            where: { uniqueProductId }
        });
        if (!product) {
            throw new common_1.NotFoundException(`Aucun produit trouvé avec l'ID unique ${uniqueProductId}`);
        }
        return this.mapToResponseDto(product);
    }
    async getAllProducts() {
        const products = await this.productRepository.find({
            order: { createdAt: 'DESC' }
        });
        return products.map(product => this.mapToResponseDto(product));
    }
    async incrementPrintCounter(ligne, reference) {
        const product = await this.productRepository.findOne({
            where: { ligne, reference }
        });
        if (!product) {
            throw new common_1.NotFoundException(`Aucun produit trouvé avec la ligne "${ligne}" et la référence "${reference}"`);
        }
        product.compteurImpression += 1;
        const savedProduct = await this.productRepository.save(product);
        return this.mapToResponseDto(savedProduct);
    }
    async deleteProduct(ligne, reference) {
        const result = await this.productRepository.delete({ ligne, reference });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Aucun produit trouvé avec la ligne "${ligne}" et la référence "${reference}"`);
        }
    }
    async getAvailableLignes() {
        const products = await this.productRepository
            .createQueryBuilder('product')
            .select('DISTINCT product.ligne', 'ligne')
            .where('product.ligne IS NOT NULL')
            .andWhere('product.ligne != :empty', { empty: '' })
            .getRawMany();
        return products.map(p => p.ligne).filter(ligne => ligne !== null && ligne !== '');
    }
    async getReferencesByLigne(ligne) {
        const products = await this.productRepository
            .createQueryBuilder('product')
            .select('DISTINCT product.reference', 'reference')
            .where('product.ligne = :ligne', { ligne })
            .andWhere('product.reference IS NOT NULL')
            .andWhere('product.reference != :empty', { empty: '' })
            .getRawMany();
        return products.map(p => p.reference).filter(ref => ref !== null && ref !== '');
    }
    mapToResponseDto(product) {
        return {
            id: product.id,
            ligne: product.ligne,
            reference: product.reference,
            uniqueProductId: product.uniqueProductId,
            annee: product.annee,
            semaine: product.semaine,
            numeroProgressif: product.numeroProgressif.toString().padStart(4, '0'),
            codeFournisseur: product.codeFournisseur,
            indice: product.indice,
            typeTicket: product.typeTicket || '',
            compteurImpression: product.compteurImpression,
            fullProductNumber: product.getFullProductNumber(),
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map