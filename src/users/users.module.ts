import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './userDto/userEntity';
import { UserSessionService } from './userSession.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([Users])
  ],
  controllers: [
    UsersController,
  ],
  providers: [UsersService,  UserSessionService]
})
export class UsersModule {}
