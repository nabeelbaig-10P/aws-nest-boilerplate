/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "name" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Address_userId_key" ON "Address"("userId");
