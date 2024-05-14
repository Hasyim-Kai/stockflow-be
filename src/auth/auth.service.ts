import { Injectable, Dependencies, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/services/prisma/prisma.service';
import { compare } from 'bcrypt';
import { JwtPayloadType, SignInResType } from './dto/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    private prisma: PrismaService,
  ) { }

  async signIn(email: string, password: string,): Promise<SignInResType> {
    try {
      const user = await this.prisma.user.findFirst({ where: { email } });
      if (!user) {
        throw new NotFoundException(`User with email ${email} not found`);
      }

      const isPasswordCorrect = await compare(password, user.password);
      if (!isPasswordCorrect) {
        throw new UnauthorizedException(`Wrong password`);
      }

      const payload: JwtPayloadType = { userId: user.id, name: user.name, email: user.email, role: user.role, outletId: user.outletId };
      return {
        userId: user.id, name: user.name, email: user.email, role: user.role,
        token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw error;
    }
  }

  async verifyJwt(token: string): Promise<SignInResType> {
    try {
      const decoded = await this.jwtService.verify(token, {
        secret: this.config.get<string>('JWT_SECRET'), // Replace with your secret key environment variable
      });
      return decoded; // Return decoded payload if valid
    } catch (error) {
      // Handle JWT verification errors (e.g., expired token, invalid signature)
      throw new UnauthorizedException('Invalid JWT token');
    }
  }
}