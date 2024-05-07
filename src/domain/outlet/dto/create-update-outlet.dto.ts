import { Role } from "@prisma/client";
import { IsString } from "class-validator";

export class CreateUpdateOutletDto {
    @IsString()
    name: string;

    @IsString()
    address: string;
}