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
exports.PrintStatsDto = exports.PrintHistoryResponseDto = exports.PrintTicketResponseDto = exports.PrintTicketDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class PrintTicketDto {
}
exports.PrintTicketDto = PrintTicketDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La ligne est obligatoire' }),
    (0, class_validator_1.IsString)({ message: 'La ligne doit être une chaîne de caractères' }),
    (0, class_validator_1.Length)(1, 50, { message: 'La ligne doit contenir entre 1 et 50 caractères' }),
    __metadata("design:type", String)
], PrintTicketDto.prototype, "ligne", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La référence est obligatoire' }),
    (0, class_validator_1.IsString)({ message: 'La référence doit être une chaîne de caractères' }),
    __metadata("design:type", String)
], PrintTicketDto.prototype, "reference", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La quantité est obligatoire' }),
    (0, class_validator_1.IsNumber)({}, { message: 'La quantité doit être un nombre' }),
    (0, class_validator_1.Min)(1, { message: 'La quantité doit être au moins de 1' }),
    (0, class_validator_1.Max)(10000, { message: 'La quantité ne peut pas dépasser 10000' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PrintTicketDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Le matricule doit être une chaîne de caractères' }),
    (0, class_validator_1.Length)(1, 50, { message: 'Le matricule doit contenir entre 1 et 50 caractères' }),
    __metadata("design:type", String)
], PrintTicketDto.prototype, "matricule", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'La date doit être au format YYYY-MM-DD' }),
    (0, class_validator_1.Matches)(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'La date doit être au format YYYY-MM-DD (ex: 2024-03-15)'
    }),
    __metadata("design:type", String)
], PrintTicketDto.prototype, "printDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Le code fournisseur doit être une chaîne de caractères' }),
    (0, class_validator_1.IsIn)(['M0', 'M1'], { message: 'Le code fournisseur doit être M0 ou M1' }),
    __metadata("design:type", String)
], PrintTicketDto.prototype, "codeFournisseur", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Le champ S doit être une chaîne de caractères' }),
    (0, class_validator_1.Length)(0, 20, { message: 'Le champ S ne peut pas dépasser 20 caractères' }),
    __metadata("design:type", String)
], PrintTicketDto.prototype, "champS", void 0);
__decorate([
    (0, class_validator_1.IsOptional)({ message: 'Le A-IEC est obligatoire' }),
    (0, class_validator_1.IsString)({ message: 'Le A-IEC doit être une chaîne de caractères' }),
    (0, class_validator_1.Length)(1, 20, { message: 'Le A-IEC doit contenir entre 1 et 20 caractères' }),
    __metadata("design:type", String)
], PrintTicketDto.prototype, "aiec", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Les notes doivent être une chaîne de caractères' }),
    (0, class_validator_1.Length)(0, 500, { message: 'Les notes ne peuvent pas dépasser 500 caractères' }),
    __metadata("design:type", String)
], PrintTicketDto.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Le type de code doit être une chaîne de caractères' }),
    (0, class_validator_1.IsIn)(['QRCODE', 'DATAMATRIX', 'SIMPLENUM', 'NUM'], {
        message: 'Le type de code doit être QRCODE, DATAMATRIX, SIMPLENUM ou NUM'
    }),
    __metadata("design:type", String)
], PrintTicketDto.prototype, "codeType", void 0);
class PrintTicketResponseDto {
}
exports.PrintTicketResponseDto = PrintTicketResponseDto;
class PrintHistoryResponseDto {
}
exports.PrintHistoryResponseDto = PrintHistoryResponseDto;
class PrintStatsDto {
}
exports.PrintStatsDto = PrintStatsDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'La date de début doit être au format YYYY-MM-DD' }),
    __metadata("design:type", String)
], PrintStatsDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'La date de fin doit être au format YYYY-MM-DD' }),
    __metadata("design:type", String)
], PrintStatsDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Le matricule doit être une chaîne de caractères' }),
    __metadata("design:type", String)
], PrintStatsDto.prototype, "matricule", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'La ligne doit être une chaîne de caractères' }),
    __metadata("design:type", String)
], PrintStatsDto.prototype, "ligne", void 0);
//# sourceMappingURL=print-ticket.dto.js.map