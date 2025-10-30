export declare class DateConverter {
    private static readonly YEAR_MAPPING;
    private static readonly REVERSE_YEAR_MAPPING;
    private static readonly AVAILABLE_LETTERS;
    static getISOWeekNumber(date: Date): number;
    private static generateYearCode;
    private static ensureYearSupported;
    static convertDateToYearCode(date: Date): string;
    static convertDateToProductCodes(date: Date): {
        yearCode: string;
        weekNumber: string;
    };
    static parseFromFullProductNumber(fullProductNumber: string): {
        date: Date;
        progressive: number;
    };
    static parseDateString(dateString: string): Date;
    static debugDate(date: any): void;
}
