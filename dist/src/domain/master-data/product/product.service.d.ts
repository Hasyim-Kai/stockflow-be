import { PrismaService } from '@/services/prisma/prisma.service';
import { Product } from '@prisma/client';
import { CreateUpdateProductDto } from './dto/create-update-product.dto';
import { JwtPayloadType } from '@/auth/dto/jwt-payload';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateUpdateProductDto, user: JwtPayloadType): Promise<Product>;
    findAll(user: JwtPayloadType): Promise<Product[]>;
    findOne(id: number): Promise<Product | null>;
    update(id: number, updateProductDto: CreateUpdateProductDto, currentUser: JwtPayloadType): Promise<Product>;
    remove(id: number): Promise<void>;
}
