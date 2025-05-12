-- CreateTable
CREATE TABLE "SeedHistory" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "executedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SeedHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SeedHistory_uuid_key" ON "SeedHistory"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "SeedHistory_name_key" ON "SeedHistory"("name");
