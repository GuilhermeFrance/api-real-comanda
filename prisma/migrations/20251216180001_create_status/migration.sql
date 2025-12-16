-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ABERTO', 'FECHADO');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ABERTO';
