import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config'
import { TagModule } from './tag/tag.module';
import { MeetupModule } from './meetup/meetup.module';

@Module({
  imports: [
    UserModule, 
    PrismaModule, 
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TagModule,
    MeetupModule
  ],
})

export class AppModule {}
