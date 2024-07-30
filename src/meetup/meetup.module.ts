import { Module } from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { MeetupController } from './meetup.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { TagModule } from 'src/tag/tag.module';

@Module({
  controllers: [MeetupController],
  providers: [MeetupService],
  imports: [PrismaModule, UserModule, TagModule]
})
export class MeetupModule {}
