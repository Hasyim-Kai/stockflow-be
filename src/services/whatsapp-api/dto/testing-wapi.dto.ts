import { IsOptional, IsString } from "class-validator";

export class TestingWapiDto {
    @IsString()
    @IsOptional()
    whatsappNumber: string;
}