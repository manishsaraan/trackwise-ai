/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Applicant" ALTER COLUMN "currentSalary" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Company_userId_key" ON "Company"("userId");
