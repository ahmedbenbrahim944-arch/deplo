export declare class StatisticsFilterDto {
    startDate?: string;
    endDate?: string;
    ligne?: string;
    reference?: string;
    typeTicket?: string;
}
export declare class ReferenceStatDto {
    ligne: string;
    reference: string;
    typeTicket: string;
    totalImprime: number;
    pourcentage: number;
    lastPrintDate?: string;
    nombreJobs: number;
}
export declare class TypeTicketStatDto {
    typeTicket: string;
    totalImprime: number;
    pourcentage: number;
    nombreReferences: number;
    references: Array<{
        ligne: string;
        reference: string;
        totalImprime: number;
    }>;
}
export declare class StatisticsGlobalesDto {
    totalTicketsImprimes: number;
    totalJobs: number;
    totalReferencesUtilisees: number;
    moyenneTicketsParJob: number;
    periodeCouverture?: {
        dateDebut: string;
        dateFin: string;
    };
}
export declare class StatisticsResponseDto {
    success: boolean;
    data: {
        globales: StatisticsGlobalesDto;
        parReference: ReferenceStatDto[];
        parTypeTicket: TypeTicketStatDto[];
        topReferences: ReferenceStatDto[];
    };
}
export declare class StatisticsDetailReferenceDto {
    ligne: string;
    reference: string;
    typeTicket: string;
    totalImprime: number;
    pourcentage: number;
    details: {
        premierePrint: string;
        dernierePrint: string;
        nombreJobs: number;
        evolutionMensuelle: Array<{
            mois: string;
            annee: number;
            totalImprime: number;
        }>;
        utilisateursUniques: Array<{
            matricule: string;
            totalImprime: number;
        }>;
    };
}
