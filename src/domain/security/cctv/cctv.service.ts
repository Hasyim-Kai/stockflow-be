import { PrismaService } from '@/services/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Cctv } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtPayloadType } from '@/auth/dto/jwt-payload';
import { CreateUpdateSecurityCctvDto } from './dto/create-update-cctv.dto';

@Injectable()
export class SecurityCctvService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async create(dto: CreateUpdateSecurityCctvDto, user: JwtPayloadType): Promise<Cctv> {
    try {
      const cctv = await this.prisma.cctv.create({
        data: {
          ...dto,
          outletId: user.outletId
        },
      });
      return cctv;
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

  async findAll(user: JwtPayloadType): Promise<Cctv[]> {
    try {
      const cctvs = await this.prisma.cctv.findMany({
        where: {
          outletId: user.outletId
        }
      });
      return cctvs;
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<Cctv | null> {
    try {
      const cctv = await this.prisma.cctv.findUnique({
        where: { id },
      });

      return cctv;
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

  async update(id: number, updateSecurityCctvDto: CreateUpdateSecurityCctvDto, currentUser: JwtPayloadType): Promise<Cctv> {
    try {
      updateSecurityCctvDto.outletId = currentUser.outletId
      const cctv = await this.prisma.cctv.update({
        where: { id },
        data: updateSecurityCctvDto,
      });
      return cctv;
    } catch (error) {
      // Handle Prisma-specific errors (similar to create)
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') { // Unique constraint violation
          throw new HttpException('Code already exists', HttpStatus.BAD_REQUEST);
        } else {
          throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.cctv.delete({ where: { id } });
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
