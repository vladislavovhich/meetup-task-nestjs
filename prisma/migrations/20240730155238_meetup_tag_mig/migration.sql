-- CreateTable
CREATE TABLE "MeetupTag" (
    "tagId" INTEGER NOT NULL,
    "meetupId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "MeetupTag_pkey" PRIMARY KEY ("tagId","meetupId")
);

-- AddForeignKey
ALTER TABLE "MeetupTag" ADD CONSTRAINT "MeetupTag_meetupId_fkey" FOREIGN KEY ("meetupId") REFERENCES "Meetup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetupTag" ADD CONSTRAINT "MeetupTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
