import { Repository } from 'typeorm';
import { PrintJob, PrintTicket } from './entities/print-job.entity';
import { Product } from 'src/products/entities/product.entity';
import { PrintTicketDto, PrintStatsDto } from './dto/print-ticket.dto';
export declare class PrintService {
    private printJobRepository;
    private printTicketRepository;
    private productRepository;
    constructor(printJobRepository: Repository<PrintJob>, printTicketRepository: Repository<PrintTicket>, productRepository: Repository<Product>);
    private generateQRCode;
    private generateDataMatrix;
    private generateSimpleNum;
    private generateSimpleNumber;
    private generateCode;
    private checkAndUpdateWeek;
    printTickets(printTicketDto: PrintTicketDto, userId: number): Promise<{
        printJobId: number;
        tickets: {
            fullProductNumber: string;
            codeImage: string;
            codeType: string;
            matricule: string;
            printDate: string;
            progressiveNumber: string;
            ligne: string;
            reference: string;
            indice: string;
            codeFournisseur: string;
            champS?: string;
            aiec?: string;
        }[];
        summary: {
            totalTickets: number;
            progressiveRange: string;
            productInfo: {
                ligne: string;
                reference: string;
                uniqueProductId: number;
            };
            codeType: string;
            weekInfo: {
                changed: boolean;
                newWeek: string;
                message: string;
                currentWeek?: undefined;
            } | {
                changed: boolean;
                currentWeek: string;
                newWeek?: undefined;
                message?: undefined;
            };
        };
    }>;
    private extractReferenceDigits;
    getFullProductNumberPreview(ligne: string, reference: string, codeFournisseur?: string, printDate?: string, codeType?: string): Promise<{
        fullProductNumber: string;
        codeType: string;
        codeFournisseur: string;
        nextProgressiveNumber: string;
        annee: string;
        semaine: string;
        weekWillChange: boolean;
        currentWeek: string;
        newWeek: string | null;
        warning: string | null;
        simpleNum: string | null;
    }>;
    getPrintHistory(userId: number): Promise<{
        data: {
            id: number;
            ligne: string;
            reference: string;
            quantity: number;
            matricule: string;
            printDate: string;
            startProgressive: number;
            endProgressive: number;
            createdAt: string;
            product: {
                uniqueProductId: number;
                annee: string;
                semaine: string;
                codeFournisseur: import("src/products/entities/product.entity").FournisseurCode;
                indice: string;
            } | null;
        }[];
        count: number;
        totalPrinted: number;
    }>;
    getPrintStats(userId: number, filters: PrintStatsDto): Promise<{
        totalJobs: number;
        totalPrinted: number;
        byMatricule: {
            matricule: string;
            totalJobs: number;
            totalPrinted: number;
        }[];
        byProduct: {
            product: string;
            ligne: string;
            reference: string;
            totalJobs: number;
            totalPrinted: number;
        }[];
    }>;
    getPrintJobById(id: number, userId: number): Promise<PrintJob>;
    deletePrintJob(id: number, userId: number): Promise<void>;
    getTicketById(id: number): Promise<PrintTicket>;
}
