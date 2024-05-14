import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './domain/user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './domain/product/product.module';
import { OutletModule } from './domain/outlet/outlet.module';
import { ProductTransactionModule } from './domain/transaction/product-transaction/product-transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
    PrismaModule,
    AuthModule,

    UserModule,
    OutletModule,
    ProductModule,

    ProductTransactionModule,


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
