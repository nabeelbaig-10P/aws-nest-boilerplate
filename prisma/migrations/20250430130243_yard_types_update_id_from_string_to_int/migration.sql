/*
  Warnings:

  - The primary key for the `yard_types` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `yard_types` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `yardTypeId` on the `re_imagine_image_generation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "re_imagine_image_generation" DROP CONSTRAINT "re_imagine_image_generation_yardTypeId_fkey";

-- AlterTable
ALTER TABLE "re_imagine_image_generation" DROP COLUMN "yardTypeId",
ADD COLUMN     "yardTypeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "yard_types" DROP CONSTRAINT "yard_types_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "yard_types_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "re_imagine_image_generation" ADD CONSTRAINT "re_imagine_image_generation_yardTypeId_fkey" FOREIGN KEY ("yardTypeId") REFERENCES "yard_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
