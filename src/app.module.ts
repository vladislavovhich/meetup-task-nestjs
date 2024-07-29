import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagModule } from './tag/tag.module';
import { MeetupModule } from './meetup/meetup.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TagModule, MeetupModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
