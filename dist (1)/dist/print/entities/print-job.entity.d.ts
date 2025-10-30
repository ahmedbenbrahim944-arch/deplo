import { Product } from 'src/products/entities/product.entity';
export declare class PrintJob {
    id: number;
    ligne: string;
    reference: string;
    quantity: number;
    matricule: string;
    printDate: string;
    startProgressive: number;
    endProgressive: number;
    notes: string;
    codeType: string;
    userId: number;
    product: Product;
    tickets: PrintTicket[];
    createdAt: Date;
}
export declare class PrintTicket {
    id: number;
    fullProductNumber: string;
    codeImage: string;
    codeType: string;
    matricule: string;
    printDate: string;
    progressiveNumber: string;
    ligne: string;
    aiec: string;
    reference: string;
    indice: string;
    codeFournisseur: string;
    champS: string;
    printJob: PrintJob;
    createdAt: Date;
}
