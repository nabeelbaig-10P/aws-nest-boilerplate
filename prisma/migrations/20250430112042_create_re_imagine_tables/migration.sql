-- CreateEnum
CREATE TYPE "ImageGenerationJobStatus" AS ENUM ('CREATED', 'PROCESSING', 'POST_PROCESSING', 'DONE', 'ERROR');

-- CreateTable
CREATE TABLE "re_imagine_image_generation" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "maskUrls" TEXT[],
    "prompt" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "gardenStyleId" INTEGER NOT NULL,
    "yardTypeId" TEXT NOT NULL,
    "status" "ImageGenerationJobStatus" NOT NULL DEFAULT 'CREATED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "re_imagine_image_generation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "yard_types" (
    "id" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "yard_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_generated_images" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "reImagineImageGenerationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_generated_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "re_imagine_image_generation_uuid_key" ON "re_imagine_image_generation"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "re_imagine_image_generation_jobId_key" ON "re_imagine_image_generation"("jobId");

-- CreateIndex
CREATE UNIQUE INDEX "yard_types_uuid_key" ON "yard_types"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "yard_types_code_key" ON "yard_types"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ai_generated_images_uuid_key" ON "ai_generated_images"("uuid");

-- AddForeignKey
ALTER TABLE "re_imagine_image_generation" ADD CONSTRAINT "re_imagine_image_generation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "re_imagine_image_generation" ADD CONSTRAINT "re_imagine_image_generation_gardenStyleId_fkey" FOREIGN KEY ("gardenStyleId") REFERENCES "garden_styles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "re_imagine_image_generation" ADD CONSTRAINT "re_imagine_image_generation_yardTypeId_fkey" FOREIGN KEY ("yardTypeId") REFERENCES "yard_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_generated_images" ADD CONSTRAINT "ai_generated_images_reImagineImageGenerationId_fkey" FOREIGN KEY ("reImagineImageGenerationId") REFERENCES "re_imagine_image_generation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
