/*
  Warnings:

  - You are about to drop the column `productsKey` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_orderId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "productsKey";

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "orderId";

-- CreateTable
CREATE TABLE "OrderItems" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productsId" INTEGER[],
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "OrderItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OrderItemsToProducts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_OrderItemsToProducts_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_OrderItemsToProducts_B_index" ON "_OrderItemsToProducts"("B");

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderItemsToProducts" ADD CONSTRAINT "_OrderItemsToProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "OrderItems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderItemsToProducts" ADD CONSTRAINT "_OrderItemsToProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
