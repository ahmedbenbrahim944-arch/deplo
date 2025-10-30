import { FournisseurCode } from '../entities/product.entity';
export declare class CreateProductDto {
    ligne: string;
    reference: string;
    uniqueProductId: number;
    dateInput?: string;
    annee?: string;
    semaine?: string;
    numeroProgressif?: number;
    codeFournisseur?: FournisseurCode;
    indice?: string;
    typeTicket?: string;
}
export declare class UpdateProductDto {
    ligne: string;
    reference: string;
    uniqueProductId?: number;
    dateInput?: string;
    annee?: string;
    semaine?: string;
    numeroProgressif?: number;
    codeFournisseur?: FournisseurCode;
    indice?: string;
    description?: string;
    typeTicket?: string;
    resetProgressiveNumber?: boolean;
}
export declare class ProductResponseDto {
    id: number;
    ligne: string;
    reference: string;
    uniqueProductId: number;
    annee: string;
    semaine: string;
    numeroProgressif: string;
    codeFournisseur: FournisseurCode;
    indice: string;
    typeTicket: string;
    compteurImpression: number;
    fullProductNumber: string;
    createdAt: Date;
    updatedAt: Date;
}
