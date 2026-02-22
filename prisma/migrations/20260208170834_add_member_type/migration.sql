-- AlterTable
ALTER TABLE "church_member" ADD COLUMN     "member_type_id" TEXT;

-- CreateTable
CREATE TABLE "member_type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "is_global" BOOLEAN NOT NULL DEFAULT false,
    "church_id" TEXT,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "member_type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "church_member" ADD CONSTRAINT "church_member_member_type_id_fkey" FOREIGN KEY ("member_type_id") REFERENCES "member_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member_type" ADD CONSTRAINT "member_type_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "church"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member_type" ADD CONSTRAINT "member_type_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member_type" ADD CONSTRAINT "member_type_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
