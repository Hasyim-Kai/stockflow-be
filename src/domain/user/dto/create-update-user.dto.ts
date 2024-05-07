import { Role } from "@prisma/client";
import { IsString } from "class-validator";

export class CreateUpdateUserDto {
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    role: Role;

    @IsString()
    outletId: number;
}