import { StatisticsService } from './dto/statistics.service';
import { StatisticsFilterDto, StatisticsResponseDto, StatisticsDetailReferenceDto } from './dto/statistics.dto';
export declare class StatisticsController {
    private readonly statisticsService;
    constructor(statisticsService: StatisticsService);
    getGlobalStatistics(filters: StatisticsFilterDto): Promise<StatisticsResponseDto>;
    getReferenceDetails(ligne: string, reference: string, filters: StatisticsFilterDto): Promise<{
        success: boolean;
        data: StatisticsDetailReferenceDto;
    }>;
    getStatisticsByPeriod(period: 'day' | 'week' | 'month', filters: StatisticsFilterDto): Promise<{
        success: boolean;
        data: any;
    }>;
    getTypeTicketStatistics(filters: StatisticsFilterDto): Promise<{
        success: boolean;
        data: any;
    }>;
    getReferenceStatistics(filters: StatisticsFilterDto): Promise<{
        success: boolean;
        data: any;
    }>;
    exportStatistics(filters: StatisticsFilterDto): Promise<{
        success: boolean;
        data: {
            headers: string[];
            rows: any[];
        };
    }>;
}
