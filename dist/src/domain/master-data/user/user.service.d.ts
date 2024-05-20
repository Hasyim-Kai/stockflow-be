import { PrismaService } from '@/services/prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUpdateUserDto } from './dto/create-update-user.dto';
import { JwtPayloadType } from '@/auth/dto/jwt-payload';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateUpdateUserDto, currentUser: JwtPayloadType): Promise<User>;
    findAll(user: JwtPayloadType): Promise<User[]>;
    findOne(id: number): Promise<User | null>;
    update(id: number, updateUserDto: CreateUpdateUserDto, currentUser: JwtPayloadType): Promise<User>;
    remove(id: number): Promise<void>;
}
