-- CreateEnum
CREATE TYPE "ProgramPlanSectionType" AS ENUM ('SIMPLE', 'SONG_LIST', 'BIBLE_VERSES', 'CUSTOM');

-- CreateTable
CREATE TABLE "program_plan_section" (
    "id" TEXT NOT NULL,
    "program_plan_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "ProgramPlanSectionType" NOT NULL DEFAULT 'SIMPLE',
    "content" JSONB,
    "duration_minutes" INTEGER,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "program_plan_section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "program_plan_section_proposal" (
    "id" TEXT NOT NULL,
    "section_id" TEXT NOT NULL,
    "proposed_by" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "program_plan_section_proposal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "program_plan_section" ADD CONSTRAINT "program_plan_section_program_plan_id_fkey" FOREIGN KEY ("program_plan_id") REFERENCES "program_plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_plan_section_proposal" ADD CONSTRAINT "program_plan_section_proposal_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "program_plan_section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_plan_section_proposal" ADD CONSTRAINT "program_plan_section_proposal_proposed_by_fkey" FOREIGN KEY ("proposed_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
