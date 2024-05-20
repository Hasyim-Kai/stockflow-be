import { Role } from "@prisma/client";
export declare class CreateUpdateUserDto {
    name: string;
    email: string;
    password: string;
    role: Role;
    outletId: number;
}
