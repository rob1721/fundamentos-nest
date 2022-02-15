import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers/user/user.controller';
import { UserService } from 'src/services/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
