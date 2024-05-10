import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUpdateUserDto } from './dto/create-update-user.dto';
import { AuthGuard } from '@/auth/auth.guard';
import { CurrentUser } from '@/decorator/current-user';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() dto: CreateUpdateUserDto, @CurrentUser() user) {
    return this.userService.create(dto, user);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // @Get(`current`)
  // findCurrent(@CurrentUser() user) {
  //   return user;
  // }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateUserDto: CreateUpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.userService.remove(+id);
  }
}
