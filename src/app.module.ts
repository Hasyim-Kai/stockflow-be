import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './domain/master-data/user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './services/prisma/prisma.module';
import { ProductModule } from './domain/master-data/product/product.module';
import { OutletModule } from './domain/master-data/outlet/outlet.module';
import { ProductTransactionModule } from './domain/transaction/product-transaction/product-transaction.module';
import { InvoiceTransactionModule } from './domain/transaction/invoice/invoice-transaction.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronjobsModule } from './services/cronjob/cronjobs.module';
import { WhatsappApiModule } from './services/whatsapp-api/whatsapp-api.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
    ScheduleModule.forRoot(),
    CronjobsModule,
    WhatsappApiModule,
    PrismaModule,
    AuthModule,

    UserModule,
    OutletModule,
    ProductModule,

    ProductTransactionModule,
    InvoiceTransactionModule,



  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
