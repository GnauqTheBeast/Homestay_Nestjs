import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import SmsController from './sms.controller';
import SmsService from './sms.service';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/users/entity/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Users]), ConfigModule],
    controllers: [SmsController],
    providers: [SmsService, AuthService, UsersService],
    exports: [SmsService]
})
export class SmsModule {}

