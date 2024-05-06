import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '@/domain/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConfig } from '@/config/jwt.config';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync(jwtConfig),
  ],
  providers: [AuthService,],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }