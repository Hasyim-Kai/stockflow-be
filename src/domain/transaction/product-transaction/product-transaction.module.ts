import { Module } from '@nestjs/common';
import { ProductTransactionService } from './product-transaction.service';
import { ProductTransactionController } from './product-transaction.controller';

@Module({
  controllers: [ProductTransactionController],
  providers: [ProductTransactionService],
})
export class ProductTransactionModule {}
