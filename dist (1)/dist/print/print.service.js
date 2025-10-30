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
exports.PrintService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bwipjs = require("bwip-js");
const print_job_entity_1 = require("./entities/print-job.entity");
const product_entity_1 = require("../products/entities/product.entity");
const date_converter_util_1 = require("../common/utils/date-converter.util");
let PrintService = class PrintService {
    constructor(printJobRepository, printTicketRepository, productRepository) {
        this.printJobRepository = printJobRepository;
        this.printTicketRepository = printTicketRepository;
        this.productRepository = productRepository;
    }
    async generateQRCode(data) {
        try {
            const png = await bwipjs.toBuffer({
                bcid: 'qrcode',
                text: data,
                scale: 3,
                height: 10,
                width: 10,
                includetext: false,
                textxalign: 'center',
            });
            const base64 = png.toString('base64');
            return `data:image/png;base64,${base64}`;
        }
        catch (error) {
            console.error('❌ Erreur lors de la génération du QR Code:', error);
            throw new common_1.BadRequestException('Impossible de générer le QR Code');
        }
    }
    async generateDataMatrix(data) {
        try {
            const png = await bwipjs.toBuffer({
                bcid: 'datamatrix',
                text: data,
                scale: 3,
                height: 10,
                width: 10,
                includetext: false,
                textxalign: 'center',
            });
            const base64 = png.toString('base64');
            return `data:image/png;base64,${base64}`;
        }
        catch (error) {
            console.error('❌ Erreur lors de la génération du DataMatrix:', error);
            throw new common_1.BadRequestException('Impossible de générer le DataMatrix');
        }
    }
    async generateSimpleNum(data, reference, printDate) {
        try {
            console.log('📝 Génération SimpleNum pour:', { reference, printDate });
            const refDigits = reference.replace(/\D/g, '');
            const lastThreeRef = refDigits.slice(-3).padStart(3, '0');
            console.log('  → 3 derniers chiffres référence:', lastThreeRef);
            const date = date_converter_util_1.DateConverter.parseDateString(printDate);
            const { yearCode, weekNumber } = date_converter_util_1.DateConverter.convertDateToProductCodes(date);
            let yearLastTwo = yearCode;
            if (yearCode.length === 1 && /[A-Z]/.test(yearCode)) {
                const realYear = date.getFullYear();
                yearLastTwo = String(realYear).slice(-2);
                console.log('  → Correction année:', yearCode, '→', yearLastTwo);
            }
            yearLastTwo = String(yearLastTwo).slice(-2).padStart(2, '0');
            const weekTwoDigits = weekNumber.padStart(2, '0');
            console.log('  → Semaine (2 chiffres):', weekTwoDigits);
            console.log('  → Année (2 chiffres):', yearLastTwo);
            const companyCode = '897';
            console.log('  → Code société:', companyCode);
            const simpleNum = `${lastThreeRef}${weekTwoDigits}${yearLastTwo}${companyCode}`;
            console.log('✅ SimpleNum généré:', simpleNum);
            if (simpleNum.length !== 10) {
                throw new Error(`SimpleNum invalide: longueur ${simpleNum.length} au lieu de 10`);
            }
            const buffer = Buffer.from(simpleNum, 'utf-8');
            const base64 = buffer.toString('base64');
            const dataUrl = `data:text/plain;base64,${base64}`;
            return dataUrl;
        }
        catch (error) {
            console.error('❌ Erreur lors de la génération du SimpleNum:', error);
            throw new common_1.BadRequestException(`Impossible de générer le SimpleNum: ${error.message}`);
        }
    }
    async generateSimpleNumber(ligne, reference, printDate) {
        try {
            console.log('📝 Génération SimpleNumber pour:', { ligne, reference, printDate });
            const refDigits = reference.replace(/\D/g, '');
            const lastThreeRef = refDigits.slice(-3).padStart(3, '0');
            console.log('  → 3 derniers chiffres référence:', lastThreeRef);
            const date = date_converter_util_1.DateConverter.parseDateString(printDate);
            const { weekNumber } = date_converter_util_1.DateConverter.convertDateToProductCodes(date);
            const formattedWeek = `S${weekNumber}`;
            console.log('  → Semaine:', formattedWeek);
            const simpleNumber = `${ligne}/${lastThreeRef}/${formattedWeek}`;
            console.log('✅ SimpleNumber généré:', simpleNumber);
            const buffer = Buffer.from(simpleNumber, 'utf-8');
            const base64 = buffer.toString('base64');
            const dataUrl = `data:text/plain;base64,${base64}`;
            return dataUrl;
        }
        catch (error) {
            console.error('❌ Erreur lors de la génération du SimpleNumber:', error);
            throw new common_1.BadRequestException(`Impossible de générer le SimpleNumber: ${error.message}`);
        }
    }
    async generateCode(data, codeType, reference, printDate, ligne) {
        switch (codeType.toUpperCase()) {
            case 'QRCODE':
                return await this.generateQRCode(data);
            case 'DATAMATRIX':
                return await this.generateDataMatrix(data);
            case 'SIMPLENUM':
                if (!reference || !printDate) {
                    throw new common_1.BadRequestException('Reference et printDate sont requis pour SIMPLENUM');
                }
                return await this.generateSimpleNum(data, reference, printDate);
            case 'NUM':
                if (!ligne || !reference || !printDate) {
                    throw new common_1.BadRequestException('Ligne, reference et printDate sont requis pour NUM');
                }
                return await this.generateSimpleNumber(ligne, reference, printDate);
            default:
                return await this.generateDataMatrix(data);
        }
    }
    async checkAndUpdateWeek(product, printDate) {
        try {
            const date = date_converter_util_1.DateConverter.parseDateString(printDate);
            const { yearCode, weekNumber } = date_converter_util_1.DateConverter.convertDateToProductCodes(date);
            const weekChanged = product.semaine !== weekNumber || product.annee !== yearCode;
            if (weekChanged) {
                console.log(`🔄 Changement de semaine détecté pour ${product.ligne}/${product.reference}`);
                console.log(`   Ancienne: ${product.annee}${product.semaine} → Nouvelle: ${yearCode}${weekNumber}`);
                product.annee = yearCode;
                product.semaine = weekNumber;
                product.numeroProgressif = 0;
                await this.productRepository.save(product);
                console.log(`✅ Produit mis à jour: Semaine ${weekNumber}, Progressif remis à 0`);
            }
            return {
                annee: yearCode,
                semaine: weekNumber,
                weekChanged
            };
        }
        catch (error) {
            console.error('❌ Erreur lors de la vérification de la semaine:', error);
            throw new common_1.BadRequestException('Erreur lors de la vérification de la date');
        }
    }
    async printTickets(printTicketDto, userId) {
        const product = await this.productRepository.findOne({
            where: {
                ligne: printTicketDto.ligne,
                reference: printTicketDto.reference
            }
        });
        if (!product) {
            throw new common_1.NotFoundException(`Produit non trouvé avec ligne: ${printTicketDto.ligne} et référence: ${printTicketDto.reference}`);
        }
        const codeFournisseurToUse = printTicketDto.codeFournisseur || product.codeFournisseur;
        const codeType = printTicketDto.codeType || 'DATAMATRIX';
        const printDate = printTicketDto.printDate || new Date().toISOString().split('T')[0];
        const { annee, semaine, weekChanged } = await this.checkAndUpdateWeek(product, printDate);
        const printJob = new print_job_entity_1.PrintJob();
        printJob.ligne = printTicketDto.ligne;
        printJob.reference = printTicketDto.reference;
        printJob.quantity = printTicketDto.quantity;
        printJob.matricule = printTicketDto.matricule;
        printJob.printDate = printDate;
        printJob.startProgressive = product.numeroProgressif + 1;
        printJob.endProgressive = product.numeroProgressif + printTicketDto.quantity;
        printJob.notes = printTicketDto.notes || '';
        printJob.userId = userId;
        printJob.codeType = codeType;
        const savedPrintJob = await this.printJobRepository.save(printJob);
        const tickets = [];
        for (let i = 0; i < printTicketDto.quantity; i++) {
            const currentProgressive = product.numeroProgressif + i + 1;
            const formattedProgressive = currentProgressive.toString().padStart(4, '0');
            const fullProductNumber = `${annee}${semaine}${formattedProgressive}${product.uniqueProductId}${codeFournisseurToUse}${product.indice}`;
            const codeImage = await this.generateCode(fullProductNumber, codeType, printTicketDto.reference, printDate, printTicketDto.ligne);
            const ticket = new print_job_entity_1.PrintTicket();
            ticket.fullProductNumber = fullProductNumber;
            ticket.codeImage = codeImage;
            ticket.codeType = codeType;
            ticket.matricule = printTicketDto.matricule;
            ticket.printDate = printJob.printDate;
            ticket.progressiveNumber = formattedProgressive;
            ticket.ligne = printTicketDto.ligne;
            ticket.reference = printTicketDto.reference;
            ticket.indice = product.indice;
            ticket.codeFournisseur = codeFournisseurToUse;
            ticket.champS = printTicketDto.champS || '';
            ticket.aiec = printTicketDto.aiec;
            ticket.printJob = savedPrintJob;
            const savedTicket = await this.printTicketRepository.save(ticket);
            tickets.push({
                fullProductNumber: savedTicket.fullProductNumber,
                codeImage: savedTicket.codeImage,
                codeType: savedTicket.codeType,
                matricule: savedTicket.matricule,
                printDate: savedTicket.printDate,
                progressiveNumber: savedTicket.progressiveNumber,
                ligne: savedTicket.ligne,
                reference: savedTicket.reference,
                indice: savedTicket.indice,
                codeFournisseur: savedTicket.codeFournisseur,
                champS: savedTicket.champS || '',
                aiec: savedTicket.aiec,
            });
        }
        product.numeroProgressif += printTicketDto.quantity;
        product.compteurImpression += printTicketDto.quantity;
        await this.productRepository.save(product);
        return {
            printJobId: savedPrintJob.id,
            tickets,
            summary: {
                totalTickets: printTicketDto.quantity,
                progressiveRange: `${printJob.startProgressive.toString().padStart(4, '0')} - ${printJob.endProgressive.toString().padStart(4, '0')}`,
                productInfo: {
                    ligne: product.ligne,
                    reference: product.reference,
                    uniqueProductId: product.uniqueProductId
                },
                codeType: codeType,
                weekInfo: weekChanged ? {
                    changed: true,
                    newWeek: `${annee}${semaine}`,
                    message: 'Nouvelle semaine détectée - Numéro progressif remis à 1'
                } : {
                    changed: false,
                    currentWeek: `${annee}${semaine}`
                }
            }
        };
    }
    extractReferenceDigits(reference) {
        const digits = reference.replace(/\D/g, '');
        if (digits.length < 3) {
            console.warn(`⚠️ Référence "${reference}" ne contient que ${digits.length} chiffres`);
            return reference.slice(-3).padStart(3, '0');
        }
        return digits;
    }
    async getFullProductNumberPreview(ligne, reference, codeFournisseur, printDate, codeType) {
        const product = await this.productRepository.findOne({
            where: { ligne, reference }
        });
        if (!product) {
            throw new common_1.NotFoundException(`Produit non trouvé avec ligne: ${ligne} et référence: ${reference}`);
        }
        const codeFournisseurToUse = codeFournisseur || product.codeFournisseur;
        const dateToUse = printDate || new Date().toISOString().split('T')[0];
        const codeTypeToUse = codeType || 'DATAMATRIX';
        let anneeToUse = product.annee;
        let semaineToUse = product.semaine;
        let weekWillChange = false;
        try {
            const date = date_converter_util_1.DateConverter.parseDateString(dateToUse);
            const { yearCode, weekNumber } = date_converter_util_1.DateConverter.convertDateToProductCodes(date);
            anneeToUse = yearCode;
            semaineToUse = weekNumber;
            weekWillChange = product.semaine !== weekNumber || product.annee !== yearCode;
        }
        catch (error) {
            console.error('Erreur lors de l\'extraction de la date:', error);
        }
        const nextProgressive = weekWillChange ? 1 : (product.numeroProgressif + 1);
        const nextProgressiveFormatted = nextProgressive.toString().padStart(4, '0');
        let simpleNumPreview = '';
        if (codeTypeToUse === 'SIMPLENUM') {
            const refDigits = this.extractReferenceDigits(reference);
            const lastThreeRef = refDigits.slice(-3).padStart(3, '0');
            const weekTwoDigits = semaineToUse.padStart(2, '0');
            const yearLastTwo = anneeToUse.slice(-2);
            const companyCode = '897';
            simpleNumPreview = `${lastThreeRef}${weekTwoDigits}${yearLastTwo}${companyCode}`;
            console.log('🔍 Preview SimpleNum:', simpleNumPreview);
        }
        const fullProductNumber = codeTypeToUse === 'SIMPLENUM'
            ? simpleNumPreview
            : `${anneeToUse}${semaineToUse}${nextProgressiveFormatted}${product.uniqueProductId}${codeFournisseurToUse}${product.indice}`;
        return {
            fullProductNumber,
            codeType: codeTypeToUse,
            codeFournisseur: codeFournisseurToUse,
            nextProgressiveNumber: nextProgressiveFormatted,
            annee: anneeToUse,
            semaine: semaineToUse,
            weekWillChange,
            currentWeek: `${product.annee}${product.semaine}`,
            newWeek: weekWillChange ? `${anneeToUse}${semaineToUse}` : null,
            warning: weekWillChange ? '⚠️ Nouvelle semaine détectée - Le progressif sera remis à 0001' : null,
            simpleNum: simpleNumPreview || null
        };
    }
    async getPrintHistory(userId) {
        const printJobs = await this.printJobRepository.find({
            where: { userId },
            relations: ['product'],
            order: { createdAt: 'DESC' }
        });
        const totalPrinted = printJobs.reduce((sum, job) => sum + job.quantity, 0);
        return {
            data: printJobs.map(job => ({
                id: job.id,
                ligne: job.ligne,
                reference: job.reference,
                quantity: job.quantity,
                matricule: job.matricule,
                printDate: job.printDate,
                startProgressive: job.startProgressive,
                endProgressive: job.endProgressive,
                createdAt: job.createdAt.toISOString(),
                product: job.product ? {
                    uniqueProductId: job.product.uniqueProductId,
                    annee: job.product.annee,
                    semaine: job.product.semaine,
                    codeFournisseur: job.product.codeFournisseur,
                    indice: job.product.indice
                } : null
            })),
            count: printJobs.length,
            totalPrinted
        };
    }
    async getPrintStats(userId, filters) {
        let query = this.printJobRepository.createQueryBuilder('printJob')
            .where('printJob.userId = :userId', { userId });
        if (filters.startDate) {
            query = query.andWhere('printJob.printDate >= :startDate', { startDate: filters.startDate });
        }
        if (filters.endDate) {
            query = query.andWhere('printJob.printDate <= :endDate', { endDate: filters.endDate });
        }
        if (filters.matricule) {
            query = query.andWhere('printJob.matricule = :matricule', { matricule: filters.matricule });
        }
        if (filters.ligne) {
            query = query.andWhere('printJob.ligne = :ligne', { ligne: filters.ligne });
        }
        const printJobs = await query.getMany();
        const totalJobs = printJobs.length;
        const totalPrinted = printJobs.reduce((sum, job) => sum + job.quantity, 0);
        const byMatricule = printJobs.reduce((acc, job) => {
            const existing = acc.find(item => item.matricule === job.matricule);
            if (existing) {
                existing.totalJobs += 1;
                existing.totalPrinted += job.quantity;
            }
            else {
                acc.push({
                    matricule: job.matricule,
                    totalJobs: 1,
                    totalPrinted: job.quantity
                });
            }
            return acc;
        }, []);
        const byProduct = printJobs.reduce((acc, job) => {
            const key = `${job.ligne}-${job.reference}`;
            const existing = acc.find(item => item.product === key);
            if (existing) {
                existing.totalJobs += 1;
                existing.totalPrinted += job.quantity;
            }
            else {
                acc.push({
                    product: key,
                    ligne: job.ligne,
                    reference: job.reference,
                    totalJobs: 1,
                    totalPrinted: job.quantity
                });
            }
            return acc;
        }, []);
        return {
            totalJobs,
            totalPrinted,
            byMatricule,
            byProduct
        };
    }
    async getPrintJobById(id, userId) {
        const printJob = await this.printJobRepository.findOne({
            where: { id, userId },
            relations: ['tickets', 'product']
        });
        if (!printJob) {
            throw new common_1.NotFoundException(`Job d'impression non trouvé avec l'ID: ${id}`);
        }
        return printJob;
    }
    async deletePrintJob(id, userId) {
        const printJob = await this.printJobRepository.findOne({
            where: { id, userId }
        });
        if (!printJob) {
            throw new common_1.NotFoundException(`Job d'impression non trouvé avec l'ID: ${id}`);
        }
        await this.printJobRepository.remove(printJob);
    }
    async getTicketById(id) {
        const ticket = await this.printTicketRepository.findOne({
            where: { id }
        });
        if (!ticket) {
            throw new common_1.NotFoundException(`Ticket non trouvé avec l'ID: ${id}`);
        }
        return ticket;
    }
};
exports.PrintService = PrintService;
exports.PrintService = PrintService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(print_job_entity_1.PrintJob)),
    __param(1, (0, typeorm_1.InjectRepository)(print_job_entity_1.PrintTicket)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PrintService);
//# sourceMappingURL=print.service.js.map