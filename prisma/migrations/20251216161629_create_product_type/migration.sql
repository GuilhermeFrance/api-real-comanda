/*
  Warnings:

  - You are about to drop the column `productTypeId` on the `Products` table. All the data in the column will be lost.
  - Added the required column `productTypeKey` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_productTypeId_fkey";

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "productTypeId",
ADD COLUMN     "productTypeKey" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_productTypeKey_fkey" FOREIGN KEY ("productTypeKey") REFERENCES "ProductType"("key") ON DELETE RESTRICT ON UPDATE CASCADE;
