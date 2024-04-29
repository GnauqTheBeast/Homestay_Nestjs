import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { HomestayService } from 'src/homestay/homestay.service';
import { HomestayModule } from 'src/homestay/homestay.module';
import { Homestay } from 'src/homestay/entity/homestay.entity';

dotenv.config()

@Module({
  imports: [TypeOrmModule.forFeature([Users, Homestay]), ConfigModule],
  controllers: [UsersController],
  providers: [UsersService, AuthGuard, AuthService, HomestayService],
  exports: [TypeOrmModule, UsersService]
})
export class UsersModule {}