/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `Table` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `Table` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Table" ADD COLUMN     "orderId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Table_orderId_key" ON "Table"("orderId");

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
