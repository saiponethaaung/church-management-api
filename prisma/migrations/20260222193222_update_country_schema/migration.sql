/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `country` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `country` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "country" ADD COLUMN     "code" TEXT NOT NULL DEFAULT 'XX',
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN     "phone_code" TEXT,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "country_code_key" ON "country"("code");
