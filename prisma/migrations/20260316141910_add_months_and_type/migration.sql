-- CreateEnum
CREATE TYPE "PackageType" AS ENUM ('NACIONAL', 'INTERNACIONAL');

-- CreateTable
CREATE TABLE "Package" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "months" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "type" "PackageType" NOT NULL DEFAULT 'NACIONAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);
