import { UserService } from './user.service';
import { CreateUpdateUserDto } from './dto/create-update-user.dto';
import { JwtPayloadType } from '@/auth/dto/jwt-payload';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(dto: CreateUpdateUserDto, user: JwtPayloadType): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        outletId: number;
    }>;
    findAll(user: JwtPayloadType): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        outletId: number;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        outletId: number;
    }>;
    update(id: string, updateUserDto: CreateUpdateUserDto, user: JwtPayloadType): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        outletId: number;
    }>;
    remove(id: string): Promise<void>;
}
