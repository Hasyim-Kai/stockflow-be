import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductTransactionService } from './product-transaction.service';
import { CreateUpdateProductTransactionDto } from './dto/create-update-product-transaction.dto';
import { CurrentUser } from '@/decorator/current-user';
import { JwtPayloadType } from '@/auth/dto/jwt-payload';
import { AuthGuard } from '@/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('transaction/product')
export class ProductTransactionController {
  constructor(private readonly productTransactionService: ProductTransactionService) { }

  @Post()
  create(@Body() createProductTransactionDto: CreateUpdateProductTransactionDto,
    @CurrentUser() user: JwtPayloadType) {
    return this.productTransactionService.create(createProductTransactionDto, user);
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayloadType) {
    return this.productTransactionService.findAll(user);
  }

  @Get('outlet-no-transactions')
  getAllOutletWithNoTransactionsPastThreeDays() {
    return this.productTransactionService.getAllOutletWithNoTransactionsPastThreeDays();
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
