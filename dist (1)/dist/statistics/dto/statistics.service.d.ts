import { Repository } from 'typeorm';
import { PrintJob } from 'src/print/entities/print-job.entity';
import { Product } from 'src/products/entities/product.entity';
import { StatisticsFilterDto, StatisticsResponseDto, StatisticsDetailReferenceDto } from './statistics.dto';
export declare class StatisticsService {
    private printJobRepository;
    private productRepository;
    constructor(printJobRepository: Repository<PrintJob>, productRepository: Repository<Product>);
    getGlobalStatistics(filters: StatisticsFilterDto): Promise<StatisticsResponseDto>;
    private calculateGlobales;
    private calculateParReference;
    private calculateParTypeTicket;
    getReferenceDetails(ligne: string, reference: string, filters: StatisticsFilterDto): Promise<StatisticsDetailReferenceDto>;
    private calculateMonthlyEvolution;
    private calculateUniqueUsers;
    getStatisticsByPeriod(period: 'day' | 'week' | 'month', filters: StatisticsFilterDto): Promise<Array<{
        period: string;
        totalImprime: number;
        nombreJobs: number;
    }>>;
    private getWeekNumber;
}
