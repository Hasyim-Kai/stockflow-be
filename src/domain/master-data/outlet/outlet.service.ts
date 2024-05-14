import { PrismaService } from '@/services/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Outlet } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateUpdateOutletDto } from './dto/create-update-outlet.dto';

@Injectable()
export class OutletService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async create(dto: CreateUpdateOutletDto): Promise<Outlet> {
    try {
      const user = await this.prisma.outlet.create({
        data: dto,
      });
      return user;
    } catch (error) {
      // Handle Prisma-specific errors (e.g., unique constraint violations)
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') { // Unique constraint violation
          throw new HttpException('Outlet already exists', HttpStatus.BAD_REQUEST);
        } else {
          throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
      // Handle other unexpected errors
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Outlet[]> {
    try {
      const users = await this.prisma.outlet.findMany();
      return users;
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<Outlet | null> {
    try {
      const user = await this.prisma.outlet.findUnique({
        where: { id },
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

  async update(id: number, updateOutletDto: CreateUpdateOutletDto): Promise<Outlet> {
    try {
      const user = await this.prisma.outlet.update({
        where: { id },
        data: updateOutletDto,
      });
      return user;
    } catch (error) {
      // Handle Prisma-specific errors (similar to create)
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') { // Unique constraint violation
          throw new HttpException('Outlet already exists', HttpStatus.BAD_REQUEST);
        } else {
          throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.outlet.delete({ where: { id } });
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
