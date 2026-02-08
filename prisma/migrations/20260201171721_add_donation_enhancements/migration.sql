-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'CHECK', 'CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'MOBILE_PAYMENT', 'ONLINE', 'OTHER');

-- DropForeignKey
ALTER TABLE "donation" DROP CONSTRAINT "donation_church_member_id_fkey";

-- AlterTable
ALTER TABLE "donation" ADD COLUMN     "check_number" TEXT,
ADD COLUMN     "donation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "household_id" TEXT,
ADD COLUMN     "is_anonymous" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "payment_method" "PaymentMethod" NOT NULL DEFAULT 'CASH',
ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "church_member_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "donation_type" ADD COLUMN     "is_tax_deductible" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "description" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "donation" ADD CONSTRAINT "donation_church_member_id_fkey" FOREIGN KEY ("church_member_id") REFERENCES "church_member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donation" ADD CONSTRAINT "donation_household_id_fkey" FOREIGN KEY ("household_id") REFERENCES "household"("id") ON DELETE SET NULL ON UPDATE CASCADE;
