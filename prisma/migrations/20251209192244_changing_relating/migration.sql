-- DropForeignKey
ALTER TABLE "Table" DROP CONSTRAINT "Table_userId_fkey";

-- AlterTable
ALTER TABLE "Table" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
