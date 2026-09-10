-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'ARS');

-- AlterTable
ALTER TABLE "Package" ADD COLUMN     "available" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "currency" "Currency",
ADD COLUMN     "price" INTEGER;
