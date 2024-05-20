import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { OutletService } from './outlet.service';
import { CreateUpdateOutletDto } from './dto/create-update-outlet.dto';
import { AuthGuard } from '@/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('outlet')
export class OutletController {
  constructor(private readonly outletService: OutletService) { }

  @Post()
  create(@Body() dto: CreateUpdateOutletDto) {
    return this.outletService.create(dto);
  }

  @Get()
  findAll() {
    return this.outletService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.outletService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateOutletDto: CreateUpdateOutletDto) {
    return this.outletService.update(+id, updateOutletDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.outletService.remove(+id);
  }
}
