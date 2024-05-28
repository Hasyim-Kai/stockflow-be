import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateUpdateProductDto } from './dto/create-update-product.dto';
import { AuthGuard } from '@/auth/auth.guard';
import { JwtPayloadType } from '@/auth/dto/jwt-payload';
import { CurrentUser } from '@/decorator/current-user';

@UseGuards(AuthGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  create(@Body() dto: CreateUpdateProductDto, @CurrentUser() user: JwtPayloadType) {
    return this.productService.create(dto, user);
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayloadType) {
    return this.productService.findAll(user);
  }

  @Get(`top-5`)
  findTop5(@CurrentUser() user: JwtPayloadType) {
    return this.productService.findTop5(user);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateProductDto: CreateUpdateProductDto, @CurrentUser() user: JwtPayloadType) {
    return this.productService.update(+id, updateProductDto, user);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.productService.remove(+id);
  }
}
