import { PrintService } from './print.service';
import { ProductsService } from '../products/products.service';
import { PrintTicketDto, PrintTicketResponseDto, PrintStatsDto } from './dto/print-ticket.dto';
export declare class DirectPrintDto {
    tsplCommands: string;
    printerName: string;
    protocol: string;
}
export declare class PrintController {
    private readonly printService;
    private readonly productsService;
    constructor(printService: PrintService, productsService: ProductsService);
    printTickets(printTicketDto: PrintTicketDto): Promise<PrintTicketResponseDto>;
    getPrintHistory(): Promise<{
        success: boolean;
        data: any;
    }>;
    getPrintStats(filters: PrintStatsDto): Promise<{
        success: boolean;
        data: any;
    }>;
    getPrintJob(id: number): Promise<{
        success: boolean;
        data: any;
    }>;
    deletePrintJob(id: number): Promise<void>;
    getTicketQRCode(id: number): Promise<{
        success: boolean;
        data: {
            codeImage: string;
            codeType: string;
            fullProductNumber: string;
        };
    }>;
    getAvailableLignes(): Promise<{
        success: boolean;
        data: string[];
    }>;
    getReferencesByLigne(ligne: string): Promise<{
        success: boolean;
        data: string[];
    }>;
    getProductDetails(ligne: string, reference: string): Promise<{
        success: boolean;
        data: any;
    }>;
    getProductPreview(ligne: string, reference: string, printDate?: string, codeFournisseur?: string): Promise<{
        success: boolean;
        data: any;
    }>;
}
