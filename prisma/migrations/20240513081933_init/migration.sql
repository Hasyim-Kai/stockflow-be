/*
  Warnings:

  - The `isInvoiced` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "YesNoType" AS ENUM ('YES', 'NO');

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "isInvoiced",
ADD COLUMN     "isInvoiced" "YesNoType" NOT NULL DEFAULT 'NO';
