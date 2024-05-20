import { Module } from '@nestjs/common';
import { InvoiceTransactionService } from './invoice-transaction.service';
import { InvoiceTransactionController } from './invoice-transaction.controller';

@Module({
  controllers: [InvoiceTransactionController],
  providers: [InvoiceTransactionService],
})
export class InvoiceTransactionModule { }
