import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/user.controller';
import { PrismaService } from 'src/services/prisma.service';
import { UserService } from 'src/services/user.service';
import { FireModule } from './firebase.module';

@Module({
  imports: [FireModule],
  controllers: [UserController],
  providers: [PrismaService, UserService],
})
export class UserModule {}
