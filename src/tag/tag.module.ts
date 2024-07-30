import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [TagController],
  providers: [TagService],
  imports: [PrismaModule, AuthModule, UserModule],
  exports: [TagService]
})
export class TagModule {}
