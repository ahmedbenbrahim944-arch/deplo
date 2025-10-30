import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto, ProductResponseDto } from './dto/product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    createProduct(createProductDto: CreateProductDto): Promise<{
        success: boolean;
        message: string;
        data: ProductResponseDto;
    }>;
    updateProduct(updateProductDto: UpdateProductDto): Promise<{
        success: boolean;
        message: string;
        data: ProductResponseDto;
    }>;
    getProduct(ligne: string, reference: string): Promise<{
        success: boolean;
        data: ProductResponseDto;
    }>;
    getAvailableLignes(): Promise<{
        success: boolean;
        data: string[];
    }>;
    getReferencesByLigne(ligne: string): Promise<{
        success: boolean;
        data: string[];
    }>;
    getProductByUniqueId(uniqueProductId: number): Promise<{
        success: boolean;
        data: ProductResponseDto;
    }>;
    getAllProducts(): Promise<{
        success: boolean;
        data: ProductResponseDto[];
        count: number;
    }>;
    resetProgressiveNumber(ligne: string, reference: string): Promise<{
        success: boolean;
        message: string;
        data: ProductResponseDto;
    }>;
    changeDateInfo(ligne: string, reference: string, dateInfo: {
        dateInput: string;
    }): Promise<{
        success: boolean;
        message: string;
        data: ProductResponseDto;
    }>;
    changeIndice(ligne: string, reference: string, indiceInfo: {
        indice: string;
    }): Promise<{
        success: boolean;
        message: string;
        data: ProductResponseDto;
    }>;
    changeTypeTicket(ligne: string, reference: string, typeTicketInfo: {
        typeTicket: string;
    }): Promise<{
        success: boolean;
        message: string;
        data: ProductResponseDto;
    }>;
    printProduct(ligne: string, reference: string): Promise<{
        success: boolean;
        message: string;
        data: ProductResponseDto;
    }>;
    deleteProduct(ligne: string, reference: string): Promise<void>;
}
