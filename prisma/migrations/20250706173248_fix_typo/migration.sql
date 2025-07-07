/*
  Warnings:

  - You are about to drop the column `churchId` on the `church_member` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `church_member` table. All the data in the column will be lost.
  - Added the required column `church_id` to the `church_member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "church_member" DROP COLUMN "churchId",
DROP COLUMN "userId",
ADD COLUMN     "church_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT;

-- AddForeignKey
ALTER TABLE "church_member" ADD CONSTRAINT "church_member_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "church"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "church_member" ADD CONSTRAINT "church_member_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
