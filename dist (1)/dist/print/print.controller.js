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
exports.PrintController = exports.DirectPrintDto = void 0;
const common_1 = require("@nestjs/common");
const print_service_1 = require("./print.service");
const products_service_1 = require("../products/products.service");
const print_ticket_dto_1 = require("./dto/print-ticket.dto");
const child_process_1 = require("child_process");
const util_1 = require("util");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
class DirectPrintDto {
}
exports.DirectPrintDto = DirectPrintDto;
let PrintController = class PrintController {
    constructor(printService, productsService) {
        this.printService = printService;
        this.productsService = productsService;
    }
    async printTickets(printTicketDto) {
        const userId = 1;
        const result = await this.printService.printTickets(printTicketDto, userId);
        return {
            success: true,
            message: 'Tickets imprimés avec succès',
            data: result
        };
    }
    async getPrintHistory() {
        const userId = 1;
        const history = await this.printService.getPrintHistory(userId);
        return {
            success: true,
            data: history
        };
    }
    async getPrintStats(filters) {
        const userId = 1;
        const stats = await this.printService.getPrintStats(userId, filters);
        return {
            success: true,
            data: stats
        };
    }
    async getPrintJob(id) {
        const userId = 1;
        const job = await this.printService.getPrintJobById(id, userId);
        return {
            success: true,
            data: job
        };
    }
    async deletePrintJob(id) {
        const userId = 1;
        await this.printService.deletePrintJob(id, userId);
    }
    async getTicketQRCode(id) {
        const ticket = await this.printService.getTicketById(id);
        return {
            success: true,
            data: {
                codeImage: ticket.codeImage,
                codeType: ticket.codeType,
                fullProductNumber: ticket.fullProductNumber
            }
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
    async getProductDetails(ligne, reference) {
        const product = await this.productsService.getProductByLigneAndReference(ligne, reference);
        return {
            success: true,
            data: {
                numeroProgressif: product.numeroProgressif,
                codeFournisseur: product.codeFournisseur,
                indice: product.indice,
                uniqueProductId: product.uniqueProductId,
                fullProductNumber: product.fullProductNumber
            }
        };
    }
    async getProductPreview(ligne, reference, printDate, codeFournisseur) {
        const preview = await this.printService.getFullProductNumberPreview(ligne, reference, codeFournisseur, printDate);
        return {
            success: true,
            data: preview
        };
    }
};
exports.PrintController = PrintController;
__decorate([
    (0, common_1.Post)('tickets'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [print_ticket_dto_1.PrintTicketDto]),
    __metadata("design:returntype", Promise)
], PrintController.prototype, "printTickets", null);
__decorate([
    (0, common_1.Get)('history'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PrintController.prototype, "getPrintHistory", null);
__decorate([
    (0, common_1.Get)('stats'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [print_ticket_dto_1.PrintStatsDto]),
    __metadata("design:returntype", Promise)
], PrintController.prototype, "getPrintStats", null);
__decorate([
    (0, common_1.Get)('job/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PrintController.prototype, "getPrintJob", null);
__decorate([
    (0, common_1.Delete)('job/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PrintController.prototype, "deletePrintJob", null);
__decorate([
    (0, common_1.Get)('ticket/:id/qrcode'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PrintController.prototype, "getTicketQRCode", null);
__decorate([
    (0, common_1.Get)('lignes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PrintController.prototype, "getAvailableLignes", null);
__decorate([
    (0, common_1.Get)('lignes/:ligne/references'),
    __param(0, (0, common_1.Param)('ligne')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PrintController.prototype, "getReferencesByLigne", null);
__decorate([
    (0, common_1.Get)('product-details/:ligne/:reference'),
    __param(0, (0, common_1.Param)('ligne')),
    __param(1, (0, common_1.Param)('reference')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PrintController.prototype, "getProductDetails", null);
__decorate([
    (0, common_1.Get)('preview/:ligne/:reference'),
    __param(0, (0, common_1.Param)('ligne')),
    __param(1, (0, common_1.Param)('reference')),
    __param(2, (0, common_1.Query)('printDate')),
    __param(3, (0, common_1.Query)('codeFournisseur')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], PrintController.prototype, "getProductPreview", null);
exports.PrintController = PrintController = __decorate([
    (0, common_1.Controller)('print'),
    __metadata("design:paramtypes", [print_service_1.PrintService,
        products_service_1.ProductsService])
], PrintController);
//# sourceMappingURL=print.controller.js.map