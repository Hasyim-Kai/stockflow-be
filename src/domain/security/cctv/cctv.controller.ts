import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { SecurityCctvService } from './cctv.service';
import { CreateUpdateSecurityCctvDto } from './dto/create-update-product.dto';
import { AuthGuard } from '@/auth/auth.guard';
import { JwtPayloadType } from '@/auth/dto/jwt-payload';
import { CurrentUser } from '@/decorator/current-user';

@UseGuards(AuthGuard)
@Controller('product')
export class SecurityCctvController {
  constructor(private readonly productService: SecurityCctvService) { }

  @Post()
  create(@Body() dto: CreateUpdateSecurityCctvDto, @CurrentUser() user: JwtPayloadType) {
    return this.productService.create(dto, user);
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayloadType) {
    return this.productService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateSecurityCctvDto: CreateUpdateSecurityCctvDto, @CurrentUser() user: JwtPayloadType) {
    return this.productService.update(+id, updateSecurityCctvDto, user);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.productService.remove(+id);
  }
}
