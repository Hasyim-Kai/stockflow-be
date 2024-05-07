import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConfig } from '@/config/jwt.config';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig),
  ],
  providers: [AuthService,],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }