import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/services/prisma/prisma.service';
import { SignInResType } from './dto/jwt-payload';
export declare class AuthService {
    private jwtService;
    private config;
    private prisma;
    constructor(jwtService: JwtService, config: ConfigService, prisma: PrismaService);
    signIn(email: string, password: string): Promise<SignInResType>;
    verifyJwt(token: string): Promise<SignInResType>;
}
