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
import { Homestay } from 'src/homestay/entity/homestay.entity';
import { OtpService } from 'src/otp/otp.service';
import { OTP } from 'src/otp/entity/otp.entity';

dotenv.config()

@Module({
  imports: [TypeOrmModule.forFeature([Users, Homestay, OTP]), ConfigModule],
  controllers: [UsersController],
  providers: [UsersService, AuthGuard, AuthService, HomestayService, OtpService],
  exports: [TypeOrmModule, UsersService]
})
export class UsersModule {}