/*
  Warnings:

  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status",
ADD COLUMN     "statusKey" TEXT;

-- DropEnum
DROP TYPE "Status";

-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Status_name_key" ON "Status"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Status_key_key" ON "Status"("key");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_statusKey_fkey" FOREIGN KEY ("statusKey") REFERENCES "Status"("key") ON DELETE SET NULL ON UPDATE CASCADE;
