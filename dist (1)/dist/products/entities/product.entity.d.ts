export declare enum FournisseurCode {
    M0 = "M0",
    M1 = "M1"
}
export declare class Product {
    id: number;
    ligne: string;
    reference: string;
    uniqueProductId: number;
    annee: string;
    semaine: string;
    numeroProgressif: number;
    codeFournisseur: FournisseurCode;
    indice: string;
    description: string;
    compteurImpression: number;
    typeTicket: string;
    createdAt: Date;
    updatedAt: Date;
    getFullProductNumber(): string;
}
