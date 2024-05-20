import { ProductService } from './product.service';
import { CreateUpdateProductDto } from './dto/create-update-product.dto';
import { JwtPayloadType } from '@/auth/dto/jwt-payload';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(dto: CreateUpdateProductDto, user: JwtPayloadType): Promise<{
        id: number;
        productCode: string;
        name: string;
        price: number;
        sealedQuantity: number;
        openedQuantity: number;
        quantityUnit: import(".prisma/client").$Enums.QuantityUnit;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        outletId: number;
    }>;
    findAll(user: JwtPayloadType): Promise<{
        id: number;
        productCode: string;
        name: string;
        price: number;
        sealedQuantity: number;
        openedQuantity: number;
        quantityUnit: import(".prisma/client").$Enums.QuantityUnit;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        outletId: number;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        productCode: string;
        name: string;
        price: number;
        sealedQuantity: number;
        openedQuantity: number;
        quantityUnit: import(".prisma/client").$Enums.QuantityUnit;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        outletId: number;
    }>;
    update(id: string, updateProductDto: CreateUpdateProductDto, user: JwtPayloadType): Promise<{
        id: number;
        productCode: string;
        name: string;
        price: number;
        sealedQuantity: number;
        openedQuantity: number;
        quantityUnit: import(".prisma/client").$Enums.QuantityUnit;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        outletId: number;
    }>;
    remove(id: string): Promise<void>;
}
