-- DropForeignKey
ALTER TABLE "announcement" DROP CONSTRAINT "announcement_program_id_fkey";

-- DropForeignKey
ALTER TABLE "program_plan" DROP CONSTRAINT "program_plan_program_id_fkey";

-- DropForeignKey
ALTER TABLE "program_plan_attachment" DROP CONSTRAINT "program_plan_attachment_program_plan_id_fkey";

-- AddForeignKey
ALTER TABLE "announcement" ADD CONSTRAINT "announcement_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_plan" ADD CONSTRAINT "program_plan_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_plan_attachment" ADD CONSTRAINT "program_plan_attachment_program_plan_id_fkey" FOREIGN KEY ("program_plan_id") REFERENCES "program_plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
