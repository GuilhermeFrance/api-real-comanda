/*
  Warnings:

  - Made the column `badgesKey` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_badgesKey_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "badgesKey" SET NOT NULL,
ALTER COLUMN "badgesKey" SET DEFAULT 'funcionario';

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_badgesKey_fkey" FOREIGN KEY ("badgesKey") REFERENCES "Badge"("key") ON DELETE RESTRICT ON UPDATE CASCADE;
