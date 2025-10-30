import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto, UpdateProductDto, ProductResponseDto } from './dto/product.dto';
export declare class ProductsService {
    private productRepository;
    constructor(productRepository: Repository<Product>);
    createProduct(createProductDto: CreateProductDto): Promise<ProductResponseDto>;
    updateProduct(updateProductDto: UpdateProductDto): Promise<ProductResponseDto>;
    getProductByLigneAndReference(ligne: string, reference: string): Promise<ProductResponseDto>;
    getProductByUniqueId(uniqueProductId: number): Promise<ProductResponseDto>;
    getAllProducts(): Promise<ProductResponseDto[]>;
    incrementPrintCounter(ligne: string, reference: string): Promise<ProductResponseDto>;
    deleteProduct(ligne: string, reference: string): Promise<void>;
    getAvailableLignes(): Promise<string[]>;
    getReferencesByLigne(ligne: string): Promise<string[]>;
    private mapToResponseDto;
}
