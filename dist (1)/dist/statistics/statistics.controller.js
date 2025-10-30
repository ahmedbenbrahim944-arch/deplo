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
exports.StatisticsController = void 0;
const common_1 = require("@nestjs/common");
const statistics_service_1 = require("./dto/statistics.service");
const statistics_dto_1 = require("./dto/statistics.dto");
let StatisticsController = class StatisticsController {
    constructor(statisticsService) {
        this.statisticsService = statisticsService;
    }
    async getGlobalStatistics(filters) {
        return await this.statisticsService.getGlobalStatistics(filters);
    }
    async getReferenceDetails(ligne, reference, filters) {
        const data = await this.statisticsService.getReferenceDetails(ligne, reference, filters);
        return {
            success: true,
            data
        };
    }
    async getStatisticsByPeriod(period, filters) {
        const data = await this.statisticsService.getStatisticsByPeriod(period, filters);
        return {
            success: true,
            data
        };
    }
    async getTypeTicketStatistics(filters) {
        const result = await this.statisticsService.getGlobalStatistics(filters);
        return {
            success: true,
            data: {
                parTypeTicket: result.data.parTypeTicket,
                totaux: {
                    totalTickets: result.data.globales.totalTicketsImprimes,
                    nombreTypes: result.data.parTypeTicket.length
                }
            }
        };
    }
    async getReferenceStatistics(filters) {
        const result = await this.statisticsService.getGlobalStatistics(filters);
        return {
            success: true,
            data: {
                parReference: result.data.parReference,
                topReferences: result.data.topReferences,
                totaux: {
                    totalTickets: result.data.globales.totalTicketsImprimes,
                    nombreReferences: result.data.globales.totalReferencesUtilisees
                }
            }
        };
    }
    async exportStatistics(filters) {
        const result = await this.statisticsService.getGlobalStatistics(filters);
        const headers = [
            'Ligne',
            'Référence',
            'Type Ticket',
            'Total Imprimé',
            'Pourcentage (%)',
            'Nombre de Jobs',
            'Dernière Impression'
        ];
        const rows = result.data.parReference.map(ref => [
            ref.ligne,
            ref.reference,
            ref.typeTicket,
            ref.totalImprime,
            ref.pourcentage,
            ref.nombreJobs,
            ref.lastPrintDate
        ]);
        return {
            success: true,
            data: {
                headers,
                rows
            }
        };
    }
};
exports.StatisticsController = StatisticsController;
__decorate([
    (0, common_1.Get)('global'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [statistics_dto_1.StatisticsFilterDto]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getGlobalStatistics", null);
__decorate([
    (0, common_1.Get)('reference/:ligne/:reference'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('ligne')),
    __param(1, (0, common_1.Param)('reference')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, statistics_dto_1.StatisticsFilterDto]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getReferenceDetails", null);
__decorate([
    (0, common_1.Get)('period/:period'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('period')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, statistics_dto_1.StatisticsFilterDto]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getStatisticsByPeriod", null);
__decorate([
    (0, common_1.Get)('types'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [statistics_dto_1.StatisticsFilterDto]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getTypeTicketStatistics", null);
__decorate([
    (0, common_1.Get)('references'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [statistics_dto_1.StatisticsFilterDto]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getReferenceStatistics", null);
__decorate([
    (0, common_1.Get)('export'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [statistics_dto_1.StatisticsFilterDto]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "exportStatistics", null);
exports.StatisticsController = StatisticsController = __decorate([
    (0, common_1.Controller)('statistics'),
    __metadata("design:paramtypes", [statistics_service_1.StatisticsService])
], StatisticsController);
//# sourceMappingURL=statistics.controller.js.map