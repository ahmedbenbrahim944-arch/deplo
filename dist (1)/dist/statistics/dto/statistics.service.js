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
exports.StatisticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const print_job_entity_1 = require("../../print/entities/print-job.entity");
const product_entity_1 = require("../../products/entities/product.entity");
let StatisticsService = class StatisticsService {
    constructor(printJobRepository, productRepository) {
        this.printJobRepository = printJobRepository;
        this.productRepository = productRepository;
    }
    async getGlobalStatistics(filters) {
        let query = this.printJobRepository
            .createQueryBuilder('pj')
            .leftJoinAndSelect('pj.product', 'product');
        if (filters.startDate) {
            query = query.andWhere('pj.printDate >= :startDate', { startDate: filters.startDate });
        }
        if (filters.endDate) {
            query = query.andWhere('pj.printDate <= :endDate', { endDate: filters.endDate });
        }
        if (filters.ligne) {
            query = query.andWhere('pj.ligne = :ligne', { ligne: filters.ligne });
        }
        if (filters.reference) {
            query = query.andWhere('pj.reference = :reference', { reference: filters.reference });
        }
        if (filters.typeTicket) {
            query = query.andWhere('product.typeTicket = :typeTicket', { typeTicket: filters.typeTicket });
        }
        const printJobs = await query.getMany();
        const globales = this.calculateGlobales(printJobs);
        const parReference = await this.calculateParReference(printJobs);
        const parTypeTicket = await this.calculateParTypeTicket(printJobs);
        const topReferences = parReference
            .sort((a, b) => b.totalImprime - a.totalImprime)
            .slice(0, 10);
        return {
            success: true,
            data: {
                globales,
                parReference,
                parTypeTicket,
                topReferences
            }
        };
    }
    calculateGlobales(printJobs) {
        const totalTicketsImprimes = printJobs.reduce((sum, job) => sum + job.quantity, 0);
        const totalJobs = printJobs.length;
        const referencesUniques = new Set(printJobs.map(job => `${job.ligne}-${job.reference}`));
        const moyenneTicketsParJob = totalJobs > 0
            ? Math.round((totalTicketsImprimes / totalJobs) * 100) / 100
            : 0;
        let periodeCouverture;
        if (printJobs.length > 0) {
            const dates = printJobs.map(job => new Date(job.printDate)).sort((a, b) => a.getTime() - b.getTime());
            periodeCouverture = {
                dateDebut: dates[0].toISOString().split('T')[0],
                dateFin: dates[dates.length - 1].toISOString().split('T')[0]
            };
        }
        return {
            totalTicketsImprimes,
            totalJobs,
            totalReferencesUtilisees: referencesUniques.size,
            moyenneTicketsParJob,
            periodeCouverture
        };
    }
    async calculateParReference(printJobs) {
        const totalTickets = printJobs.reduce((sum, job) => sum + job.quantity, 0);
        const groupedByRef = printJobs.reduce((acc, job) => {
            const key = `${job.ligne}-${job.reference}`;
            if (!acc[key]) {
                acc[key] = {
                    ligne: job.ligne,
                    reference: job.reference,
                    typeTicket: job.product?.typeTicket || '',
                    jobs: []
                };
            }
            acc[key].jobs.push(job);
            return acc;
        }, {});
        const stats = Object.values(groupedByRef).map((group) => {
            const totalImprime = group.jobs.reduce((sum, job) => sum + job.quantity, 0);
            const pourcentage = totalTickets > 0
                ? Math.round((totalImprime / totalTickets) * 10000) / 100
                : 0;
            const dates = group.jobs.map(job => new Date(job.printDate));
            const lastPrintDate = new Date(Math.max(...dates.map(d => d.getTime())))
                .toISOString().split('T')[0];
            return {
                ligne: group.ligne,
                reference: group.reference,
                typeTicket: group.typeTicket,
                totalImprime,
                pourcentage,
                lastPrintDate,
                nombreJobs: group.jobs.length
            };
        });
        return stats.sort((a, b) => b.totalImprime - a.totalImprime);
    }
    async calculateParTypeTicket(printJobs) {
        const totalTickets = printJobs.reduce((sum, job) => sum + job.quantity, 0);
        const groupedByType = printJobs.reduce((acc, job) => {
            const typeTicket = job.product?.typeTicket || 'Non défini';
            if (!acc[typeTicket]) {
                acc[typeTicket] = {
                    typeTicket,
                    jobs: [],
                    references: new Set()
                };
            }
            acc[typeTicket].jobs.push(job);
            acc[typeTicket].references.add(`${job.ligne}-${job.reference}`);
            return acc;
        }, {});
        const stats = Object.values(groupedByType).map((group) => {
            const totalImprime = group.jobs.reduce((sum, job) => sum + job.quantity, 0);
            const pourcentage = totalTickets > 0
                ? Math.round((totalImprime / totalTickets) * 10000) / 100
                : 0;
            const refGroups = group.jobs.reduce((acc, job) => {
                const key = `${job.ligne}-${job.reference}`;
                if (!acc[key]) {
                    acc[key] = {
                        ligne: job.ligne,
                        reference: job.reference,
                        totalImprime: 0
                    };
                }
                acc[key].totalImprime += job.quantity;
                return acc;
            }, {});
            const references = Object.values(refGroups)
                .sort((a, b) => b.totalImprime - a.totalImprime)
                .slice(0, 5);
            return {
                typeTicket: group.typeTicket,
                totalImprime,
                pourcentage,
                nombreReferences: group.references.size,
                references
            };
        });
        return stats.sort((a, b) => b.totalImprime - a.totalImprime);
    }
    async getReferenceDetails(ligne, reference, filters) {
        const product = await this.productRepository.findOne({
            where: { ligne, reference }
        });
        if (!product) {
            throw new Error(`Produit non trouvé: ${ligne} - ${reference}`);
        }
        let query = this.printJobRepository
            .createQueryBuilder('pj')
            .where('pj.ligne = :ligne', { ligne })
            .andWhere('pj.reference = :reference', { reference });
        if (filters.startDate) {
            query = query.andWhere('pj.printDate >= :startDate', { startDate: filters.startDate });
        }
        if (filters.endDate) {
            query = query.andWhere('pj.printDate <= :endDate', { endDate: filters.endDate });
        }
        const jobs = await query.getMany();
        const totalImprime = jobs.reduce((sum, job) => sum + job.quantity, 0);
        const allJobs = await this.printJobRepository.find();
        const totalGlobal = allJobs.reduce((sum, job) => sum + job.quantity, 0);
        const pourcentage = totalGlobal > 0
            ? Math.round((totalImprime / totalGlobal) * 10000) / 100
            : 0;
        const dates = jobs.map(job => new Date(job.printDate)).sort((a, b) => a.getTime() - b.getTime());
        const premierePrint = dates.length > 0 ? dates[0].toISOString().split('T')[0] : '';
        const dernierePrint = dates.length > 0 ? dates[dates.length - 1].toISOString().split('T')[0] : '';
        const evolutionMensuelle = this.calculateMonthlyEvolution(jobs);
        const utilisateursUniques = this.calculateUniqueUsers(jobs);
        return {
            ligne,
            reference,
            typeTicket: product.typeTicket || '',
            totalImprime,
            pourcentage,
            details: {
                premierePrint,
                dernierePrint,
                nombreJobs: jobs.length,
                evolutionMensuelle,
                utilisateursUniques
            }
        };
    }
    calculateMonthlyEvolution(jobs) {
        const monthlyData = jobs.reduce((acc, job) => {
            const date = new Date(job.printDate);
            const mois = date.toLocaleString('fr-FR', { month: 'long' });
            const annee = date.getFullYear();
            const key = `${annee}-${mois}`;
            if (!acc[key]) {
                acc[key] = { mois, annee, totalImprime: 0 };
            }
            acc[key].totalImprime += job.quantity;
            return acc;
        }, {});
        return Object.values(monthlyData)
            .sort((a, b) => {
            if (a.annee !== b.annee)
                return a.annee - b.annee;
            const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
                'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
            return months.indexOf(a.mois) - months.indexOf(b.mois);
        });
    }
    calculateUniqueUsers(jobs) {
        const userGroups = jobs.reduce((acc, job) => {
            if (!acc[job.matricule]) {
                acc[job.matricule] = { matricule: job.matricule, totalImprime: 0 };
            }
            acc[job.matricule].totalImprime += job.quantity;
            return acc;
        }, {});
        return Object.values(userGroups)
            .sort((a, b) => b.totalImprime - a.totalImprime);
    }
    async getStatisticsByPeriod(period, filters) {
        let query = this.printJobRepository
            .createQueryBuilder('pj')
            .leftJoinAndSelect('pj.product', 'product');
        if (filters.startDate) {
            query = query.andWhere('pj.printDate >= :startDate', { startDate: filters.startDate });
        }
        if (filters.endDate) {
            query = query.andWhere('pj.printDate <= :endDate', { endDate: filters.endDate });
        }
        const jobs = await query.getMany();
        const groupedData = jobs.reduce((acc, job) => {
            const date = new Date(job.printDate);
            let key;
            if (period === 'day') {
                key = date.toISOString().split('T')[0];
            }
            else if (period === 'week') {
                const weekNumber = this.getWeekNumber(date);
                key = `${date.getFullYear()}-S${weekNumber}`;
            }
            else {
                key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
            }
            if (!acc[key]) {
                acc[key] = { period: key, totalImprime: 0, nombreJobs: 0 };
            }
            acc[key].totalImprime += job.quantity;
            acc[key].nombreJobs += 1;
            return acc;
        }, {});
        return Object.values(groupedData).sort((a, b) => a.period.localeCompare(b.period));
    }
    getWeekNumber(date) {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    }
};
exports.StatisticsService = StatisticsService;
exports.StatisticsService = StatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(print_job_entity_1.PrintJob)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], StatisticsService);
//# sourceMappingURL=statistics.service.js.map