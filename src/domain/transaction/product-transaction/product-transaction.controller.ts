import { AuthGuard } from '@/auth/auth.guard';
import { JwtPayloadType } from '@/auth/dto/jwt-payload';
import { CurrentUser } from '@/decorator/current-user';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateUpdateProductTransactionDto } from './dto/create-update-product-transaction.dto';
import { ProductTransactionService } from './product-transaction.service';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productTransactionService.findOne(+id);
  }
}
