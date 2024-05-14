import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductTransactionService } from './product-transaction.service';
import { CreateUpdateProductTransactionDto } from './dto/create-update-product-transaction.dto';
import { CurrentUser } from '@/decorator/current-user';
import { JwtPayloadType } from '@/auth/dto/jwt-payload';

@Controller('transaction/product')
export class ProductTransactionController {
  constructor(private readonly productTransactionService: ProductTransactionService) { }

  @Post()
  create(@Body() createProductTransactionDto: CreateUpdateProductTransactionDto) {
    return this.productTransactionService.create(createProductTransactionDto);
  }

  @Get()
  findAll() {
    return this.productTransactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productTransactionService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductTransactionDto: CreateUpdateProductTransactionDto, @CurrentUser() user: JwtPayloadType) {
  //   return this.productTransactionService.update(+id, updateProductTransactionDto, user);
  // }
}
