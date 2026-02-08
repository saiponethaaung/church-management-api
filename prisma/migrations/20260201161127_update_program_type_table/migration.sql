/*
  Warnings:

  - You are about to drop the column `color` on the `program_type` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `program_type` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "program_plan" ALTER COLUMN "date" DROP NOT NULL;

-- AlterTable
ALTER TABLE "program_type" DROP COLUMN "color",
DROP COLUMN "icon";
