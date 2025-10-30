export declare class PrintTicketDto {
    ligne: string;
    reference: string;
    quantity: number;
    matricule: string;
    printDate?: string;
    codeFournisseur?: string;
    notes?: string;
}
export declare class PrintTicketResponseDto {
    success: boolean;
    message: string;
    data: {
        printJobId: number;
        tickets: Array<{
            fullProductNumber: string;
            qrCode: string;
            matricule: string;
            printDate: string;
            progressiveNumber: string;
            ligne: string;
            reference: string;
            indice: string;
            codeFournisseur: string;
        }>;
        summary: {
            totalTickets: number;
            progressiveRange: string;
            productInfo: {
                ligne: string;
                reference: string;
                uniqueProductId: number;
            };
        };
    };
}
export declare class PrintHistoryResponseDto {
    success: boolean;
    data: Array<{
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
            codeFournisseur: string;
            indice: string;
        };
    }>;
    count: number;
    totalPrinted: number;
}
export declare class PrintStatsDto {
    startDate?: string;
    endDate?: string;
    matricule?: string;
    ligne?: string;
}
