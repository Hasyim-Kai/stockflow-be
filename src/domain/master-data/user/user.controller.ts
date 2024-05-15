import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUpdateUserDto } from './dto/create-update-user.dto';
import { AuthGuard } from '@/auth/auth.guard';
import { CurrentUser } from '@/decorator/current-user';
import { JwtPayloadType } from '@/auth/dto/jwt-payload';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() dto: CreateUpdateUserDto, @CurrentUser() user: JwtPayloadType) {
    return this.userService.create(dto, user);
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayloadType) {
    return this.userService.findAll(user);
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
  update(@Param('id', ParseIntPipe) id: string, @Body() updateUserDto: CreateUpdateUserDto, @CurrentUser() user: JwtPayloadType) {
    return this.userService.update(+id, updateUserDto, user);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.userService.remove(+id);
  }
}
