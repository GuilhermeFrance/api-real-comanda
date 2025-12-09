/*
  Warnings:

  - You are about to drop the `_OrderItemsToProducts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productsId` to the `OrderItems` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_OrderItemsToProducts" DROP CONSTRAINT "_OrderItemsToProducts_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderItemsToProducts" DROP CONSTRAINT "_OrderItemsToProducts_B_fkey";

-- AlterTable
ALTER TABLE "OrderItems" ADD COLUMN     "productsId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_OrderItemsToProducts";

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
