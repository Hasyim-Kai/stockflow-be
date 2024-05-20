import { PrismaService } from '@/services/prisma/prisma.service';
import { Transaction } from '@prisma/client';
import { CreateUpdateProductTransactionDto } from './dto/create-update-product-transaction.dto';
import { JwtPayloadType } from '@/auth/dto/jwt-payload';
import { OutletWithNoTransactionsPastThreeDaysDto } from './dto/return-type';
export declare class ProductTransactionService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateUpdateProductTransactionDto, currentUser: JwtPayloadType): Promise<Transaction>;
    findAll(user: JwtPayloadType): Promise<Transaction[]>;
    findOne(id: number): Promise<Transaction | null>;
    getAllOutletWithNoTransactionsPastThreeDays(): Promise<OutletWithNoTransactionsPastThreeDaysDto[]>;
    generateTextAlertForOutletWithNoTransactionsPastThreeDays(dataInput: OutletWithNoTransactionsPastThreeDaysDto[]): string;
}
