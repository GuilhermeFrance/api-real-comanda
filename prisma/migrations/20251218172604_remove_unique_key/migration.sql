-- DropIndex
DROP INDEX "Order_key_key";

-- DropIndex
DROP INDEX "Order_name_key";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "key" DROP NOT NULL;
