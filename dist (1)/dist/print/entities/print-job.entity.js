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
exports.PrintTicket = exports.PrintJob = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("../../products/entities/product.entity");
let PrintJob = class PrintJob {
};
exports.PrintJob = PrintJob;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PrintJob.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PrintJob.prototype, "ligne", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PrintJob.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PrintJob.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], PrintJob.prototype, "matricule", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], PrintJob.prototype, "printDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PrintJob.prototype, "startProgressive", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PrintJob.prototype, "endProgressive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PrintJob.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 10,
        default: 'DATAMATRIX'
    }),
    __metadata("design:type", String)
], PrintJob.prototype, "codeType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PrintJob.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product),
    (0, typeorm_1.JoinColumn)([
        { name: 'ligne', referencedColumnName: 'ligne' },
        { name: 'reference', referencedColumnName: 'reference' }
    ]),
    __metadata("design:type", product_entity_1.Product)
], PrintJob.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PrintTicket, ticket => ticket.printJob),
    __metadata("design:type", Array)
], PrintJob.prototype, "tickets", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PrintJob.prototype, "createdAt", void 0);
exports.PrintJob = PrintJob = __decorate([
    (0, typeorm_1.Entity)('print_jobs')
], PrintJob);
let PrintTicket = class PrintTicket {
};
exports.PrintTicket = PrintTicket;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PrintTicket.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PrintTicket.prototype, "fullProductNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], PrintTicket.prototype, "codeImage", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 10,
        default: 'DATAMATRIX'
    }),
    __metadata("design:type", String)
], PrintTicket.prototype, "codeType", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], PrintTicket.prototype, "matricule", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], PrintTicket.prototype, "printDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 4 }),
    __metadata("design:type", String)
], PrintTicket.prototype, "progressiveNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PrintTicket.prototype, "ligne", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], PrintTicket.prototype, "aiec", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PrintTicket.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10 }),
    __metadata("design:type", String)
], PrintTicket.prototype, "indice", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 2 }),
    __metadata("design:type", String)
], PrintTicket.prototype, "codeFournisseur", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], PrintTicket.prototype, "champS", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => PrintJob, printJob => printJob.tickets),
    __metadata("design:type", PrintJob)
], PrintTicket.prototype, "printJob", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PrintTicket.prototype, "createdAt", void 0);
exports.PrintTicket = PrintTicket = __decorate([
    (0, typeorm_1.Entity)('print_tickets')
], PrintTicket);
//# sourceMappingURL=print-job.entity.js.map