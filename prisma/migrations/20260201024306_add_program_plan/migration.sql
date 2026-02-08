-- AlterTable
ALTER TABLE "program" ADD COLUMN     "leader_id" TEXT;

-- AlterTable
ALTER TABLE "program_type" ADD COLUMN     "color" TEXT,
ADD COLUMN     "icon" TEXT;

-- CreateTable
CREATE TABLE "program_plan" (
    "id" TEXT NOT NULL,
    "program_id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "content" JSONB,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "program_plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "program_plan_attachment" (
    "id" TEXT NOT NULL,
    "program_plan_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT,
    "type" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "program_plan_attachment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "program" ADD CONSTRAINT "program_leader_id_fkey" FOREIGN KEY ("leader_id") REFERENCES "church_member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_plan" ADD CONSTRAINT "program_plan_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_plan" ADD CONSTRAINT "program_plan_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_plan" ADD CONSTRAINT "program_plan_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_plan_attachment" ADD CONSTRAINT "program_plan_attachment_program_plan_id_fkey" FOREIGN KEY ("program_plan_id") REFERENCES "program_plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
