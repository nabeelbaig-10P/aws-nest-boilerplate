-- CreateTable
CREATE TABLE "AutoMask" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AutoMask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AutoMask_uuid_key" ON "AutoMask"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "AutoMask_jobId_key" ON "AutoMask"("jobId");

-- AddForeignKey
ALTER TABLE "AutoMask" ADD CONSTRAINT "AutoMask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
