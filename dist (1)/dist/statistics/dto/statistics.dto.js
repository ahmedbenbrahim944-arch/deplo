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
exports.StatisticsDetailReferenceDto = exports.StatisticsResponseDto = exports.StatisticsGlobalesDto = exports.TypeTicketStatDto = exports.ReferenceStatDto = exports.StatisticsFilterDto = void 0;
const class_validator_1 = require("class-validator");
class StatisticsFilterDto {
}
exports.StatisticsFilterDto = StatisticsFilterDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'La date de début doit être au format YYYY-MM-DD' }),
    __metadata("design:type", String)
], StatisticsFilterDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'La date de fin doit être au format YYYY-MM-DD' }),
    __metadata("design:type", String)
], StatisticsFilterDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'La ligne doit être une chaîne de caractères' }),
    __metadata("design:type", String)
], StatisticsFilterDto.prototype, "ligne", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'La référence doit être une chaîne de caractères' }),
    __metadata("design:type", String)
], StatisticsFilterDto.prototype, "reference", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Le type de ticket doit être une chaîne de caractères' }),
    __metadata("design:type", String)
], StatisticsFilterDto.prototype, "typeTicket", void 0);
class ReferenceStatDto {
}
exports.ReferenceStatDto = ReferenceStatDto;
class TypeTicketStatDto {
}
exports.TypeTicketStatDto = TypeTicketStatDto;
class StatisticsGlobalesDto {
}
exports.StatisticsGlobalesDto = StatisticsGlobalesDto;
class StatisticsResponseDto {
}
exports.StatisticsResponseDto = StatisticsResponseDto;
class StatisticsDetailReferenceDto {
}
exports.StatisticsDetailReferenceDto = StatisticsDetailReferenceDto;
//# sourceMappingURL=statistics.dto.js.map