import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpService } from './otp.service';
import { Users } from 'src/users/entity/users.entity';
import { OtpController } from './otp.controller';
import { OTP } from './entity/otp.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Module({
    imports: [TypeOrmModule.forFeature([Users, OTP]), ConfigModule],
    controllers: [OtpController],
    providers: [OtpService, AuthGuard, AuthService, UsersService],
    exports: [OtpService]
})
export class OtpModule {}
