import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AuthService } from 'src/auth/auth.service';

dotenv.config()

@Module({
  imports: [TypeOrmModule.forFeature([Users]), ConfigModule],
  controllers: [UsersController],
  providers: [UsersService, AuthGuard, AuthService],
  exports: [TypeOrmModule, UsersService]
})
export class UsersModule {}