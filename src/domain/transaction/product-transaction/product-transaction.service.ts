import { PrismaService } from '@/services/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Outlet, Product, Transaction } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateUpdateProductTransactionDto } from './dto/create-update-product-transaction.dto';
import { JwtPayloadType } from '@/auth/dto/jwt-payload';
import { OutletWithNoTransactionsPastThreeDaysDto } from './dto/return-type';
import { formatDate } from '@/utils/helper/date';

@Injectable()
export class ProductTransactionService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async create(dto: CreateUpdateProductTransactionDto, currentUser: JwtPayloadType): Promise<Transaction> {
    try {
      let transaction: Transaction;
      await this.prisma.$transaction(async (tx) => {
        transaction = await tx.transaction.create({
          data: {
            userId: currentUser.userId,
            outletId: currentUser.outletId,
            totalPrice: dto.products.reduce((total, product) => total + product.sumPrice, 0),
            type: dto.type,
            transactionProducts: {
              createMany: {
                data: dto.products.map((product) => ({
                  quantity: product.quantity,
                  productId: product.productId,
                  sumPrice: product.sumPrice
                }))
              }
            },
          },
        });

        await Promise.all(dto.products.map(async (product) => {
          const dataUpdate = dto.type === 'IN' ? {
            sealedQuantity: {
              increment: product.quantity
            }
          }
            : dto.type === 'OUT' ? {
              openedQuantity: {
                increment: product.quantity
              },
              sealedQuantity: {
                decrement: product.quantity
              }
            }
              : null

          await tx.product.update({
            where: { id: product.productId },
            data: dataUpdate
          })
        }))
      })

      return transaction;
    } catch (error) {
      console.log(error)
      // Handle Prisma-specific errors (e.g., unique constraint violations)
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') { // Unique constraint violation
          throw new HttpException('Selected Product Cannot be Same', HttpStatus.BAD_REQUEST);
        } else {
          throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
      // Handle other unexpected errors
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(user: JwtPayloadType): Promise<Transaction[]> {
    try {
      const transactions = await this.prisma.transaction.findMany({
        where: {
          outletId: user.outletId
        },
        include: {
          user: {
            select: {
              name: true
            }
          },
        },
      });
      return transactions;
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<Transaction | null> {
    try {
      const transaction = await this.prisma.transaction.findUnique({
        where: { id },
        include: {
          user: {
            select: { name: true }
          },
          transactionProducts: {
            include: {
              product: {
                select: {
                  name: true, price: true, productCode: true
                }
              }
            }
          }
        },
      });

      return transaction;
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

  async getAllOutletWithNoTransactionsPastThreeDays(): Promise<OutletWithNoTransactionsPastThreeDaysDto[]> {
    try {
      let allOutletWithTransactionsPastThreeDays, outletWithNoTransactionsPastThreeDays;
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)

      await this.prisma.$transaction(async (tx) => {
        allOutletWithTransactionsPastThreeDays = await tx.transaction.groupBy({
          by: [`outletId`],
          where: {
            createdAt: {
              gte: threeDaysAgo
            }
          },
        })

        outletWithNoTransactionsPastThreeDays = await tx.outlet.findMany({
          where: {
            id: {
              notIn: allOutletWithTransactionsPastThreeDays.map((outlet) => outlet.outletId)
            }
          },
          select: {
            name: true, address: true
          }
        })
      })

      return outletWithNoTransactionsPastThreeDays
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

  generateTextAlertForOutletWithNoTransactionsPastThreeDays(dataInput: OutletWithNoTransactionsPastThreeDaysDto[]) {
    try {
      const outlets = `${dataInput.map((outlet) => `- ${outlet.name} (${outlet.address}) \n`)}`
      return `Outlet With No Transactions\nFrom Konsinyasi Distributor App
      \n${outlets} \nThankyou & Have a nice day!`
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
}
