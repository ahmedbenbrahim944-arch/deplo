"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const print_service_1 = require("./print.service");
const print_controller_1 = require("./print.controller");
const print_job_entity_1 = require("./entities/print-job.entity");
const print_job_entity_2 = require("./entities/print-job.entity");
const product_entity_1 = require("../products/entities/product.entity");
const products_module_1 = require("../products/products.module");
let PrintModule = class PrintModule {
};
exports.PrintModule = PrintModule;
exports.PrintModule = PrintModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([print_job_entity_1.PrintJob, print_job_entity_2.PrintTicket, product_entity_1.Product]),
            products_module_1.ProductsModule,
        ],
        controllers: [print_controller_1.PrintController],
        providers: [print_service_1.PrintService],
        exports: [print_service_1.PrintService],
    })
], PrintModule);
//# sourceMappingURL=print.module.js.map