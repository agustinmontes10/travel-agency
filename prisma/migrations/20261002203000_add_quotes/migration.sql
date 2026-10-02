-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "destination" TEXT NOT NULL DEFAULT '',
    "passengers" INTEGER NOT NULL DEFAULT 1,
    "validUntil" DATE,
    "notes" TEXT NOT NULL DEFAULT '',
    "flights" JSONB NOT NULL,
    "hotels" JSONB NOT NULL,
    "transfers" JSONB NOT NULL,
    "assistanceType" TEXT NOT NULL DEFAULT '',
    "assistancePrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "selectedFlightId" TEXT NOT NULL,
    "selectedHotelId" TEXT NOT NULL,
    "selectedTransferId" TEXT,
    "commissionPct" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "netTotal" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);
