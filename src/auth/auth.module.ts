import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConfig } from '@/config/jwt.config';

@Module({
  imports: [
    JwtModule.register(jwtConfig),
  ],
  providers: [AuthService,],
  controllers: [AuthController],
  exports: [AuthService,],
})
export class AuthModule { }