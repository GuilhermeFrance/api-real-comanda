-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentKey" TEXT;

-- CreateTable
CREATE TABLE "PaymentType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "PaymentType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentType_name_key" ON "PaymentType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentType_key_key" ON "PaymentType"("key");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_paymentKey_fkey" FOREIGN KEY ("paymentKey") REFERENCES "PaymentType"("key") ON DELETE SET NULL ON UPDATE CASCADE;
