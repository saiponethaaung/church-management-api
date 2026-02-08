-- CreateEnum
CREATE TYPE "ProgramMode" AS ENUM ('IN_PERSON', 'ONLINE', 'HYBRID', 'CLOSED');

-- AlterTable
ALTER TABLE "program" ADD COLUMN     "is_recurring" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mode" "ProgramMode" NOT NULL DEFAULT 'IN_PERSON',
ADD COLUMN     "recurrence" TEXT;
