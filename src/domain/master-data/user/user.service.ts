import { PrismaService } from '@/services/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateUpdateUserDto } from './dto/create-update-user.dto';
import { JwtPayloadType } from '@/auth/dto/jwt-payload';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async create(dto: CreateUpdateUserDto, currentUser: JwtPayloadType): Promise<User> {
    try {
      if (!dto.outletId) {
        dto.outletId = currentUser.outletId
      }
      const user = await this.prisma.user.create({
        data: dto,
      });
      return user;
    } catch (error) {
      // Handle Prisma-specific errors (e.g., unique constraint violations)
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') { // Unique constraint violation
          throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
        } else {
          throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
      // Handle other unexpected errors
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(user: JwtPayloadType): Promise<User[]> {
    try {
      const users = await this.prisma.user.findMany({
        where: {
          outletId: user.outletId
        },
        include: { outlet: true }
      });
      return users;
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        include: { outlet: true }
      });

      return user;
    } catch (error) {
      // Handle potential Prisma errors here (e.g., record not found)
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') { // Record not found
          throw new NotFoundException('Record not found');
        } else {
          throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateUserDto: CreateUpdateUserDto, currentUser: JwtPayloadType): Promise<User> {
    try {
      updateUserDto.outletId = currentUser.outletId
      const user = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
      return user;
    } catch (error) {
      // Handle Prisma-specific errors (similar to create)
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') { // Unique constraint violation
          throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
        } else {
          throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') { // Unique constraint violation
          throw new HttpException('Code already exists', HttpStatus.BAD_REQUEST);
        } else if (error.code === 'P2003') {
          throw new HttpException('Action cannot be done because it is related to other data', HttpStatus.BAD_REQUEST);
        } else {
          throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
