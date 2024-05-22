-- CreateTable
CREATE TABLE "Cctv" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(100) NOT NULL,
    "link" TEXT NOT NULL,
    "outletId" INTEGER NOT NULL,

    CONSTRAINT "Cctv_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cctv" ADD CONSTRAINT "Cctv_outletId_fkey" FOREIGN KEY ("outletId") REFERENCES "Outlet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
