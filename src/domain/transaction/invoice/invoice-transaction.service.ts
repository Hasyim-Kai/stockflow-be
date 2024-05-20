import { PrismaService } from '@/services/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Outlet, Invoice, Transaction, Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtPayloadType } from '@/auth/dto/jwt-payload';
import { CreateUpdateInvoiceTransactionDto } from './dto/create-update-invoice-transaction.dto';

@Injectable()
export class InvoiceTransactionService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async findAll(user: JwtPayloadType): Promise<Invoice[]> {
    try {
      const invoices = await this.prisma.invoice.findMany({
        where: { outletId: user.outletId },
      })
      return invoices;
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<Invoice | null> {
    try {
      const invoices = await this.prisma.invoice.findUnique({
        where: { id },
        include: {
          outlet: {
            select: {
              address: true, name: true
            }
          },
          transaction: {
            include: {
              user: true,
              transactionProducts: {
                include: {
                  product: {
                    select: {
                      name: true, price: true, productCode: true
                    }
                  }
                }
              },
            }
          }
        },
      });

      return invoices;
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

  async generateInvoiceForAllNotInvoicedTransactions() {
    try {
      await this.prisma.$transaction(async (tx) => {
        // 1. get All outlet With Not Invoiced Transactions
        const outletWithNotInvoicedTransactions = await tx.transaction.groupBy({
          by: [`outletId`],
          where: {
            isInvoiced: 'NO',
          },
        })

        if (outletWithNotInvoicedTransactions.length > 0) {
          // 2. create many invoice based on all outlet id, after created, get it's id
          const newInvoices: { id: number, outletId: number }[] = await tx.$queryRaw`INSERT INTO "Invoice" ("outletId")
            VALUES ${Prisma.join(outletWithNotInvoicedTransactions.map((outlet) => Prisma.sql`(${outlet.outletId})`))}
            RETURNING "id","outletId"`
          console.log(newInvoices)

          // 3. update every transactions only it's invoiceId with recent created invoiceId, where outletId same & isInvoiced = NO
          await Promise.all(newInvoices.map(async (invoice) => {
            await tx.transaction.updateMany({
              where: {
                outletId: invoice.outletId,
                isInvoiced: 'NO',
              },
              data: {
                invoiceId: invoice.id,
                isInvoiced: 'YES'
              }
            })
          }))
        }
      })

      // return newInvoices;
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
