import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InvoiceTransactionService } from './invoice-transaction.service';
import { CurrentUser } from '@/decorator/current-user';
import { JwtPayloadType } from '@/auth/dto/jwt-payload';
import { AuthGuard } from '@/auth/auth.guard';
import { CreateUpdateInvoiceTransactionDto } from './dto/create-update-invoice-transaction.dto';

@UseGuards(AuthGuard)
@Controller('transaction/invoice')
export class InvoiceTransactionController {
  constructor(private readonly invoiceTransactionService: InvoiceTransactionService) { }

  @Get()
  findAll(@CurrentUser() user: JwtPayloadType) {
    return this.invoiceTransactionService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceTransactionService.findOne(+id);
  }
}
