import { Role } from "@prisma/client";
import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateUpdateUserDto {
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    role: Role;

    @IsInt()
    @IsOptional()
    outletId: number;
}