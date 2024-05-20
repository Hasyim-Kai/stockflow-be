import { PrismaService } from '@/services/prisma/prisma.service';
import { Outlet } from '@prisma/client';
import { CreateUpdateOutletDto } from './dto/create-update-outlet.dto';
export declare class OutletService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateUpdateOutletDto): Promise<Outlet>;
    findAll(): Promise<Outlet[]>;
    findOne(id: number): Promise<Outlet | null>;
    update(id: number, updateOutletDto: CreateUpdateOutletDto): Promise<Outlet>;
    remove(id: number): Promise<void>;
}
